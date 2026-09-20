export interface PlayedServer {
    key: number;
    name: string;
    hours: number;
}

export interface User {
    id: string;
    nickname: string;
    avatarUrl: string | null;
    balance: number;
    steamProfileUrl: string;
    playedServers: PlayedServer[];
}
