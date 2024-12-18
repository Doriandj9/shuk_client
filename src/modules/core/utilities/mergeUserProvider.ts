import { User } from "@/modules/web/@types/web";
import { facebookUser, googleUser } from "../@types/gUser";
import { app } from "@/config/app";


export const mergeUserProvider = (user: User): User => {
    let googleUser: googleUser | null = null;
    let facebookUser: facebookUser | null = null;

    if (!user?.is_user_provider) {
        return user;
    }

    switch (user.id_provider) {
        case app.socialProviders.google:
            googleUser = JSON.parse(typeof user.data_login_social_media !== 'string' ? '' : user.data_login_social_media);
            user.full_name = googleUser?.name;
            user.photo = googleUser?.picture;
            break;
        case app.socialProviders.facebook:
            facebookUser = JSON.parse(typeof user.data_login_social_media !== 'string' ? '' : user.data_login_social_media);
            user.full_name = facebookUser?.name;
            user.photo = facebookUser?.picture?.data.url;
            break;
    }

    return user;
};