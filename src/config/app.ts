import {AppConfig} from '@/config/@types/app';
import { ThemeOptions } from "@mui/material";
import axios from 'axios';


export const app: AppConfig = {
    server: 'http://127.0.0.1:8000/api/',
    base_server: 'http://127.0.0.1:8000',
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
    }],
    headers: {
        'Accept': 'application/json'
    }
});

export const moment_locale_es = {
    months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort: 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
    monthsParseExact: true,
    weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Hoy a] LT',
        nextDay: '[Mañana a] LT',
        nextWeek: 'dddd [a] LT',
        lastDay: '[Ayer a] LT',
        lastWeek: 'dddd [pasado a] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'en %s',
        past: 'hace %s',
        s: 'algunos segundos',
        m: 'un minuto',
        mm: '%d minutos',
        h: 'una hora',
        hh: '%d horas',
        d: 'un día',
        dd: '%d días',
        M: 'un mes',
        MM: '%d meses',
        y: 'un año',
        yy: '%d años'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|o)/,
    ordinal: function (number: number) {
        return number + (number === 1 ? 'er' : 'o');
    },
    meridiemParse: /AM|PM/,
    isPM: function (input: string) {
        return input.charAt(0) === 'P';
    },
    meridiem: function (hours: number, minutes?: number, isLower?: boolean) {

        if(isLower){
            return hours < 12 ? 'am' : 'pm';
        }

        return hours < 12 ? 'AM' : 'PM';
    },
    week: {
        dow: 1, // Lunes es el primer día de la semana.
        doy: 4  // Se usa para determinar la primera semana del año.
    }
};
