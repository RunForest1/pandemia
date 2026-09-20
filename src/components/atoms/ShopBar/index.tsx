import {
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from '../../../i18n/useTranslation';
import { ProductServer, ProductType } from '../../../data/products';

const selectSx = {
    color: 'var(--ink)',
    '& .MuiSvgIcon-root': { color: 'var(--ink-faint)' },
    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
    '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
};

const labelSx = {
    color: 'var(--ink-faint)',
    '&.Mui-focused': { color: 'var(--ink-faint)' },
};

const menuProps = {
    PaperProps: {
        sx: {
            backgroundColor: 'var(--surface-2)',
            color: 'var(--ink)',
            border: '1px solid var(--border)',
        },
    },
};

interface ShopBarProps {
    type: ProductType | '';
    onTypeChange: (value: ProductType | '') => void;
    server: ProductServer | '';
    onServerChange: (value: ProductServer | '') => void;
    search: string;
    onSearchChange: (value: string) => void;
}

export const ShopBar = ({
    type,
    onTypeChange,
    server,
    onServerChange,
    search,
    onSearchChange,
}: ShopBarProps) => {
    const { t } = useTranslation();

    const typeChange = (event: SelectChangeEvent) => {
        onTypeChange(event.target.value as ProductType | '');
    };

    const serverChange = (event: SelectChangeEvent) => {
        onServerChange(event.target.value as ProductServer | '');
    };

    return (
        <section className="rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg border border-border bg-surface-2 p-4 sm:p-5 grid grid-cols-1 md:flex gap-4 md:gap-6 items-stretch md:items-center justify-between">
            <div className="order-last grid grid-cols-1 sm:flex md:order-first gap-4 md:gap-6">
                <FormControl>
                    <InputLabel id="shop-type-label" sx={labelSx}>
                        {t('shop.type')}
                    </InputLabel>
                    <Select
                        labelId="shop-type-label"
                        id="shop-type-select"
                        className="w-full md:w-auto min-w-0 md:min-w-3xs font-body"
                        MenuProps={menuProps}
                        sx={selectSx}
                        value={type}
                        label={t('shop.type')}
                        onChange={typeChange}
                    >
                        <MenuItem value="">{t('shop.typeAll')}</MenuItem>
                        <MenuItem value="parts">{t('shop.typeParts')}</MenuItem>
                        <MenuItem value="cars">{t('shop.typeCars')}</MenuItem>
                        <MenuItem value="build">{t('shop.typeBuild')}</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="shop-server-label" sx={labelSx}>
                        {t('shop.server')}
                    </InputLabel>
                    <Select
                        labelId="shop-server-label"
                        id="shop-server-select"
                        className="w-full md:w-auto min-w-0 md:min-w-3xs font-body"
                        MenuProps={menuProps}
                        sx={selectSx}
                        value={server}
                        label={t('shop.server')}
                        onChange={serverChange}
                    >
                        <MenuItem value="">{t('shop.serverAll')}</MenuItem>
                        <MenuItem value="chernarus">
                            Chernarus PLUS 3PP
                        </MenuItem>
                        <MenuItem value="livonia">Livonia PLUS 3PP</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <TextField
                className="font-body w-full md:w-auto"
                placeholder={t('shop.search')}
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                sx={{
                    width: { xs: '100%', md: 260 },
                    '& .MuiInputBase-input': {
                        color: 'var(--ink)',
                        '&::placeholder': { color: 'var(--ink-faint)' },
                    },
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    backgroundColor: 'var(--surface-3)',
                    borderRadius: '0.75rem',
                }}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon
                                    sx={{ color: 'var(--ink-faint)' }}
                                />
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </section>
    );
};
