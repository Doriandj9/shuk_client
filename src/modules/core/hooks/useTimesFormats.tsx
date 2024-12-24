import { useLanguageApp } from "@/store/language";
import { formatTimePostFn } from "./@types/times";
import moment from "moment";
import { moment_locale_es } from "@/config/app";


export const useTimeFormatPost = () => {
    const locale = useLanguageApp((state) => state.language);
    if(locale == 'es'){
        moment.updateLocale('es',moment_locale_es);
    } else {
        moment.updateLocale(locale,null);
    }

    const format: formatTimePostFn  = (date) => {
         let time = moment();

        if(date){
            time = moment(date);
        }

        return time.format('LLL');
    };


    return {format};
};