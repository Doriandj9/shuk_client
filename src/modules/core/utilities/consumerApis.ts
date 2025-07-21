import { app } from "@/config/app";
import { webRoutes } from "@/config/webRoutes";

type SharedWhatsAppFn = {
    (text: string, postId: string): boolean;
};

type ShareFacebookFn = {
    (idPost: string): boolean;
};

export const sendShareWhatsApp: SharedWhatsAppFn = (text,idPost) => {
    try {
        const url = new URL(app.apiWhatsAppHost);
        url.searchParams.append('text', text + encodeURI(app.host + webRoutes.view_posts.path.replace(':id', String(idPost)) + '?op=view').replaceAll(' ','%20'));
        window.open(url,'_blank');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const sendShareFacebook: ShareFacebookFn = (idPost) => {
    try {
        const url = new URL(app.shareFacebookHost);
        url.searchParams.append('u', encodeURI(app.host + webRoutes.view_posts.path.replace(':id', String(idPost)) + '?op=view').replaceAll(' ', '%20'));
        url.searchParams.append('src', 'sdkpreparse');
        window.open(url,'_blank');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};