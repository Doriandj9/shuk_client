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
    oAuthIdFacebook: '1179066826681637',
    apiV: 'v1',
    socialProviders: {
        google: 1,
        facebook: 2
    }
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
    baseURL: app.server + app.apiV,
    transformResponse: [function(data){
       try {
            const response = JSON.parse(data);
            if(app.environment !== 'prod' && !response.status) {
                return {...response, _error: response.message, message: response._error };
            }

            return response;
       } catch (e) {
            if(app.environment !== 'prod'){
                console.error(e);
            }
        return data;
       }
    }]
});