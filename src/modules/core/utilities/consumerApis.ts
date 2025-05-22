import { routesApi } from "@/config/apiRoutes";
import { app } from "@/config/app";

type SharedWhatsAppFn = {
    (text: string, postId: string): boolean;
};

type ShareFacebookFn = {
    (idPost: string): boolean;
};

export const sendShareWhatsApp: SharedWhatsAppFn = (text,idPost) => {
    try {
        const url = new URL(app.apiWhatsAppHost);
        url.searchParams.append('text', text + encodeURI(app.base_server + routesApi.public.view_post.path.replace('{id}', String(idPost)) + '?op=view'));
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
        url.searchParams.append('u', encodeURI(app.base_server + routesApi.public.view_post.path.replace('{id}', String(idPost))));
        url.searchParams.append('src', 'sdkpreparse');
        window.open(url,'_blank');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};