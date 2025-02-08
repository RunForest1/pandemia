import { FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

export const ShopBar = () => {
    const [type, setType] = useState('');
    const [server, setServer] = useState('');

    const typeChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    const serverChange = (event: SelectChangeEvent) => {
        setServer(event.target.value as string);
    };

  return (
    <section className="mt-20 grid grid-cols-1 md:flex gap-8 items-center justify-between">
        <div className="order-last grid grid-cols-1 md:flex md:order-first gap-8">
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label" sx={{ color: '#9095A3' }}>Тип</InputLabel>
                <Select
                className="min-w-3xs font-display text-3xl bg-gray2 rounded-2xl"
                sx={{
                    color: '#9095A3',
                    '& .MuiSvgIcon-root': {
                        color: '#9095A3', // Цвет стрелочки
                    },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Автомобили"
                onChange={typeChange}
                >
                <MenuItem sx={{ color: '#9095A3'}} value={10}>Запчасти</MenuItem>
                <MenuItem sx={{ color: '#9095A3'}} value={20}>Машины</MenuItem>
                <MenuItem sx={{ color: '#9095A3'}} value={30}>Строительство</MenuItem>
                </Select>
            </FormControl>
        
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label" sx={{ color: '#9095A3' }}>Сервер</InputLabel>
                <Select
                className="min-w-3xs font-display text-3xl bg-gray2 "
                sx={{
                    color: '#9095A3',
                    '& .MuiSvgIcon-root': {
                        color: '#9095A3', // Цвет стрелочки
                    },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={server}
                label="Автомобили"
                onChange={serverChange}
                >
                <MenuItem sx={{ color: '#9095A3'}} value={10}>Chernarus PLUS 3PP</MenuItem>
                <MenuItem sx={{ color: '#9095A3'}} value={20}>Livonia PLUS 3PP</MenuItem>
                <MenuItem sx={{ color: '#9095A3'}} value={30}>Namalsk PLUS 3PP</MenuItem>
                </Select>
                
            </FormControl>
        </div>

        <TextField
        className="font-display text-gray1 text-3xl bg-gray2 "
        placeholder="Поиск по названию"
        id="outlined-start-adornment"
        sx={{
            m: 1,
            width: '120',
            color: '#9095A3',
            '& .MuiInputBase-input': {
                color: '#9095A3', // Цвет вводимого текста
                '&::placeholder': {
                    color: '#9095A3', // Цвет плейсхолдера
                },
            },
        }}
        slotProps={{
            input: {

                endAdornment: <InputAdornment position="end"><a href="#"><SearchIcon sx={{ color: '#9095A3' }}/></a></InputAdornment>,
            },
        }}
        />
    </section>
  )
}
