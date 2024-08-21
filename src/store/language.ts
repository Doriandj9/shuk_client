import { create } from 'zustand';
import { LanguageApp, LanguageAppHook } from '@/config/@types/app';
let defaultLanguage: LanguageApp = 'es';


if(!localStorage.languageApp){
    localStorage.setItem('languageApp',defaultLanguage);
} else {
    const op = localStorage.getItem('languageApp');

    switch(op){

        case 'es': 
            defaultLanguage = 'es';
        break;

        case 'en': 
            defaultLanguage = 'en';
        break;

        default: 
            defaultLanguage= 'es';
    }
}

export const useLanguageApp = create<LanguageAppHook>()((set) => ({
    language: defaultLanguage,
    update: (payload) => set(() => {
        localStorage.languageApp = payload;
        return { language : payload };
    })
}
));
