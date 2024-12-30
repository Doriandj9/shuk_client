import { app } from "@/config/app";

type SharedWhatsAppFn = {
    (text: string): boolean;
};

type ShareFacebookFn = {
    (referentUri: string): boolean;
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

export const sendShareFacebook: ShareFacebookFn = (referentUri) => {
    try {
        const url = new URL(app.shareFacebookHost);
        url.searchParams.append('u', referentUri);
        url.searchParams.append('src', 'sdkpreparse');
        window.open(url,'_blank');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};