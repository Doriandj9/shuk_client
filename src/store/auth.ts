import { app } from '@/config/app';
import { facebookUser, googleUser } from '@/modules/core/@types/gUser';
import { User } from '@/modules/web/@types/web';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

type AuthProps = {
    token: string | null;
    user: User | null;
    updateToken: CallableFunction;
    updateUser: CallableFunction;
    isLogin: boolean;
    isProvider: boolean;
};

let jwt: string = '';

if(!localStorage.jwt){
    localStorage.setItem('jwt', '');
} else  {
   jwt  = localStorage.getItem('jwt') || '';
}

export const useAuthStore = create<AuthProps>()((set) => {
    const user: User | null = jwt !== '' ? jwtDecode(jwt || '') : null;
    let googleUser: googleUser | null = null;
    let facebookUser: facebookUser | null = null;
    let isUserProviderDefault = false;
    if(user && user.is_user_provider){
        switch(user.id_provider){
            case app.socialProviders.google:
                googleUser = JSON.parse(typeof user.data_login_social_media  !== 'string' ? '' : user.data_login_social_media);
                user.full_name = googleUser?.name;
                user.photo = googleUser?.picture;
            break;
            case app.socialProviders.facebook:
                facebookUser = JSON.parse(typeof user.data_login_social_media  !== 'string' ? '' : user.data_login_social_media);
                user.full_name = facebookUser?.name;
                user.photo = facebookUser?.picture?.data.url;
            break;
        }
        isUserProviderDefault = true;
    }

    if(user && user.photo && !user.is_user_provider){
        user.photo = app.server +  user.photo;
    }

    return {
        token: null,
        user: user,
        isLogin: false,
        updateToken: (payload: string) => set((state) => ({
            ...state,
            token: payload,
            isLogin: true
        })),
        updateUser: (payload: string) => set((state) => {
            localStorage.setItem('jwt', payload);
            const user: User | null = payload !== '' ? jwtDecode(payload) : null;
            googleUser = null;
            facebookUser = null;
            isUserProviderDefault = false;

            if(user && user.is_user_provider){
                switch(user.id_provider){
                    case app.socialProviders.google:
                        googleUser = JSON.parse(typeof user.data_login_social_media  !== 'string' ? '' : user.data_login_social_media);
                        user.full_name = googleUser?.name;
                        user.photo = googleUser?.picture;
                    break;
                    case app.socialProviders.facebook:
                        facebookUser = JSON.parse(typeof user.data_login_social_media  !== 'string' ? '' : user.data_login_social_media);
                        user.full_name = facebookUser?.name;
                        user.photo = facebookUser?.picture?.data.url;
                    break;
                }

                isUserProviderDefault = true;
            };

            if(user && user.photo && !user.is_user_provider){
                user.photo = app.server +  user.photo;
            }

            return {
                ...state,
                user: user,
                isProvider: true
            };
        }),
        isProvider: isUserProviderDefault
    };
});
