import { env } from '../env.js';

const STEAM_OPENID_ENDPOINT = 'https://steamcommunity.com/openid/login';
const CLAIMED_ID_RE = /^https?:\/\/steamcommunity\.com\/openid\/id\/(\d{17})$/;

export const buildSteamLoginUrl = (returnTo: string, realm: string) => {
    const params = new URLSearchParams({
        'openid.ns': 'http://specs.openid.net/auth/2.0',
        'openid.mode': 'checkid_setup',
        'openid.return_to': returnTo,
        'openid.realm': realm,
        'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
        'openid.claimed_id':
            'http://specs.openid.net/auth/2.0/identifier_select',
    });
    return `${STEAM_OPENID_ENDPOINT}?${params.toString()}`;
};

/**
 * Проверяет ответ Steam OpenID по спецификации 2.0: переотправляем те же
 * параметры обратно в Steam с openid.mode=check_authentication и смотрим
 * на "is_valid:true" в ответе. Возвращает SteamID64 при успехе.
 */
export const verifySteamCallback = async (
    query: Record<string, string | undefined>,
): Promise<string | null> => {
    const claimedId = query['openid.claimed_id'];
    if (!claimedId) {
        return null;
    }

    const match = CLAIMED_ID_RE.exec(claimedId);
    if (!match) {
        return null;
    }

    const verifyParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
        if (key.startsWith('openid.') && value !== undefined) {
            verifyParams.set(key, value);
        }
    }
    verifyParams.set('openid.mode', 'check_authentication');

    const response = await fetch(STEAM_OPENID_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: verifyParams.toString(),
    });
    const text = await response.text();

    if (!/is_valid\s*:\s*true/.test(text)) {
        return null;
    }

    return match[1];
};

export interface SteamProfile {
    nickname: string;
    avatarUrl: string | null;
    profileUrl: string;
}

const fallbackProfile = (steamId: string): SteamProfile => ({
    nickname: `Player_${steamId.slice(-6)}`,
    avatarUrl: null,
    profileUrl: `https://steamcommunity.com/profiles/${steamId}`,
});

const fetchViaWebApi = async (
    steamId: string,
): Promise<SteamProfile | null> => {
    if (!env.steamApiKey) {
        return null;
    }
    const url = new URL(
        'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/',
    );
    url.searchParams.set('key', env.steamApiKey);
    url.searchParams.set('steamids', steamId);

    const response = await fetch(url);
    if (!response.ok) {
        return null;
    }
    const data = (await response.json()) as {
        response?: { players?: Array<Record<string, string>> };
    };
    const player = data.response?.players?.[0];
    if (!player) {
        return null;
    }
    return {
        nickname: player.personaname ?? fallbackProfile(steamId).nickname,
        avatarUrl: player.avatarfull ?? null,
        profileUrl:
            player.profileurl ??
            `https://steamcommunity.com/profiles/${steamId}`,
    };
};

/** Резервный путь без API-ключа: публичный XML-профиль Steam. */
const fetchViaPublicXml = async (
    steamId: string,
): Promise<SteamProfile | null> => {
    const response = await fetch(
        `https://steamcommunity.com/profiles/${steamId}?xml=1`,
    );
    if (!response.ok) {
        return null;
    }
    const xml = await response.text();
    const nickname = /<steamID><!\[CDATA\[(.*?)\]\]><\/steamID>/.exec(xml)?.[1];
    const avatarUrl = /<avatarFull><!\[CDATA\[(.*?)\]\]><\/avatarFull>/.exec(
        xml,
    )?.[1];

    if (!nickname) {
        return null;
    }
    return {
        nickname,
        avatarUrl: avatarUrl ?? null,
        profileUrl: `https://steamcommunity.com/profiles/${steamId}`,
    };
};

export const fetchSteamProfile = async (
    steamId: string,
): Promise<SteamProfile> => {
    try {
        const viaApi = await fetchViaWebApi(steamId);
        if (viaApi) {
            return viaApi;
        }
    } catch {
        // сеть/API недоступны — пробуем резервный путь
    }

    try {
        const viaXml = await fetchViaPublicXml(steamId);
        if (viaXml) {
            return viaXml;
        }
    } catch {
        // публичный профиль недоступен — используем заглушку
    }

    return fallbackProfile(steamId);
};
