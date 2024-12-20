import { app } from '@/config/app';
import { deleteCookie, getCookie, setCookie } from '@/modules/core/utilities/cookies';
import { mergeUserProvider } from '@/modules/core/utilities/mergeUserProvider';
import { User } from '@/modules/web/@types/web';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

type AuthProps = {
    token: string | null;
    user: User | null;
    updateToken: (payload: string, timeExpired: string) => unknown;
    updateUser: (payload: string) => unknown;
    isLogin: boolean;
    isProvider: boolean;
};

let jwt: string = '';
let token: null | string = getCookie('token');

if (token) {
    token = atob(token);
};

const tokenExist = Boolean(token);


if (!localStorage.jwt) {
    localStorage.setItem('jwt', '');
} else {
    jwt = localStorage.getItem('jwt') || '';
}




export const useAuthStore = create<AuthProps>()((set) => {
    let user: User | null = jwt !== '' ? jwtDecode(jwt || '') : null;
    let isUserProviderDefault = false;
    if (user && user.is_user_provider) {
        user = mergeUserProvider(user);
        isUserProviderDefault = true;
    }

    if (user && user.photo && !user.is_user_provider) {
        user.photo = app.server + user.photo;
    }

    if (!tokenExist) {
        localStorage.removeItem('jwt');
    }

    return {
        token: token,
        user: tokenExist ? user : null,
        isLogin: tokenExist,
        updateToken: (payload: string, timeExpired: string) => set((state) => {
            setCookie('token', btoa(payload), timeExpired);
            return {
                ...state,
                token: payload,
                isLogin: true
            };
        }),
        updateUser: (payload: string) => set((state) => {
            localStorage.setItem('jwt', payload);
            let user: User | null = payload !== '' ? jwtDecode(payload) : null;
            isUserProviderDefault = false;

            if (user && user.is_user_provider) {
                user = mergeUserProvider(user);

                isUserProviderDefault = true;
            };

            if (user && user.photo && !user.is_user_provider) {
                user.photo = app.server + user.photo;
            }

            return {
                ...state,
                user: user,
                isProvider: true
            };
        }),
        logout: () => set(() => {
            deleteCookie('token');
            localStorage.removeItem('jwt');
            return {
                user: null,
                isLogin: false,
                token: null,
                isProvider: false
            };
        }),
        isProvider: isUserProviderDefault
    };
});
