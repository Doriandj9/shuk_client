import {AppConfig} from '@/config/@types/app';
import { ThemeOptions } from "@mui/material";


export const app: AppConfig = {
    server: 'aaa',
    colors: {
        primary: '#232C56',
        secondary: '#F6A605',
        ternary: '#E42823'
    },
    environment: 'local'
};


export const appTheme: ThemeOptions = {
    palette: {
        primary: {
            main: app.colors.primary
        },
        secondary: {
            main: app.colors.secondary
        }
    }
};