import { app } from "@/config/app";

type SharedWhatsAppFn = {
    (text: string): boolean;
};


export const sendShareWhatsApp: SharedWhatsAppFn = (text) => {
    try {
        const url = new URL(app.apiWhatsAppHost);
        url.searchParams.append('text', text);
        window.open(url,'_blank');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};