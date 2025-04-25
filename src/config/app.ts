import {AppConfig} from '@/config/@types/app';
import { DocStatus as DocStatusType } from '@/modules/core/@types/core';
import { User } from '@/modules/web/@types/web';
import { ThemeOptions } from "@mui/material";
import axios from 'axios';

const host = import.meta.env.VITE_API_URL;
const versionApp = import.meta.env.VITE_APP_VERSION;
const endPointApi = import.meta.env.VITE_ENDPOINT_API;
const apiWhatsAppHost = import.meta.env.VITE_API_WHATSAPP_URL;
const shareFacebookHost = import.meta.env.VITE_API_FACEBOOK_URL || 'https://www.facebook.com/sharer/sharer.php';
const idFacebook = import.meta.env.VITE_FACEBOOK_ID || '1179066826681637';
const idGoogle = import.meta.env.VITE_GOOGLE_ID || '1179066826681637';
const hostApp = import.meta.env.VITE_APP_HOST || ''; //(new URL(window.location.href)).origin;


export const app: AppConfig = {
    server: `${host}${endPointApi}/`,
    base_server: host,
    colors: {
        primary: '#232C56',
        secondary: '#F6A605',
        ternary: '#E42823'
    },
    environment: 'local',
    oAuthIdGoogle: idGoogle,
    oAuthIdFacebook: idFacebook,
    apiV: versionApp,
    socialProviders: {
        google: 1,
        facebook: 2,
        whatsapp: 3
    },
    apiWhatsAppHost: apiWhatsAppHost,
    host: hostApp,
    shareFacebookHost: shareFacebookHost,
    timeRefetchInterval: (1000 * 30),
};


export const appTheme: ThemeOptions = {
    palette: {
        primary: {
            main: app.colors.primary
        },
        secondary: {
            main: app.colors.secondary
        },
    },
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
        'Accept': 'application/json',
        'X-lang': localStorage.getItem('languageApp') ?? 'es'
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

export const genderValues = {
    'es': [{
        value: 'M',
        label: 'Masculino'
    },{
        value: 'F',
        label: 'Femenino'
    },{
        value: 'PND',
        label: 'Prefiero no decirlo'
    }],
    'en': [{
        value: 'M',
        label: 'Male'
    },{
        value: 'F',
        label: 'Female'
    },{
        value: 'PND',
        label: 'I prefer not to say it'
    }]
};


export const DocStatus: DocStatusType = {
    ACTIVE: 'AC',
    COMPLETE: 'CO',
    DELETE: 'DL',
    DRAFT: 'DR',
    EDIT: 'ED',
    NOT_SHOW_NOTIFY: 'NS',
    PENDING_NOTIFY: 'PN',
    VIEW_NOTIFY: 'VN',
    COLUMN_NAME: 'doc_status'
} as const;


export const userDefault: User = {
    id: 0
};
