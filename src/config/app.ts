import {AppConfig} from '@/config/@types/app';
import { ThemeOptions } from "@mui/material";
import axios from 'axios';


export const app: AppConfig = {
    server: 'http://127.0.0.1:8000/api/',
    colors: {
        primary: '#232C56',
        secondary: '#F6A605',
        ternary: '#E42823'
    },
    environment: 'local',
    oAuthIdGoogle: '913311559669-4lp0mh31a80mdd9favrsvoch3ks0skqr.apps.googleusercontent.com',
    oAuthIdFacebook: '1179066826681637'
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

export const api = axios.create({
    baseURL: app.server,
    transformRequest: [function(data) {

        if(app.environment !== 'prod'){
            if(data._error){
                return {...data, message: data._error, _error: data.message};
            }

            return data;
        }
    }]
});