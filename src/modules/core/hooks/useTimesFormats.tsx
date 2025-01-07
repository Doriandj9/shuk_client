import { useLanguageApp } from "@/store/language";
import { formatTimePostFn } from "./@types/times";
import moment from "moment";
import { moment_locale_es } from "@/config/app";


export const useTimeFormatPost = (formatTime: 'date' | 'full' | 'post' = 'full') => {
    const locale = useLanguageApp((state) => state.language);
    if (locale == 'es') {
        moment.updateLocale('es', moment_locale_es);
    } else {
        moment.updateLocale(locale, null);
    }

    const format: formatTimePostFn = (date) => {
        let time = moment();

        if (date) {
            time = moment(date);
        }

        if (formatTime === 'full') {
            return time.format('LLL');
        }

        if (formatTime === 'date') {
            return time.format('LL');
        }

        return time.format('LLL');
    };


    return { format };
};