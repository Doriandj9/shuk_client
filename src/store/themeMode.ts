import { create } from 'zustand';
import { ThemeUI, ThemeOptions } from '@/config/@types/app';

let defThemeMode: ThemeOptions = 'system';

if(!localStorage.appTheme){
    localStorage.setItem('appTheme',defThemeMode);
} else {
   const op = localStorage.getItem('appTheme');
   switch(op){
    case "dark":
        defThemeMode = 'dark';
    break;
    case "light":
        defThemeMode = 'light';
    break;
    case "system":
        defThemeMode = 'system';
    break;
    default:
        defThemeMode = 'system';
   }
}

export const useThemeMode = create<ThemeUI>()((set) => ({
        theme: defThemeMode,
        update: (payload) => set(() => {
            localStorage.appTheme = payload;
            return { theme : payload };
        })
    }
));