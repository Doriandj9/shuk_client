import { jwtDecode } from 'jwt-decode';
import { useLocalStorage } from 'usehooks-ts';
import { create } from 'zustand';

type AuthProps = {
    token: string | null;
    user: unknown | null;
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

    return {
        token: null,
        user: jwt !== '' ? jwtDecode(jwt || '') : null,
        isLogin: false,
        updateToken: (payload: string) => set((state) => ({
            ...state,
            token: payload,
            isLogin: true
        })),
        updateUser: (payload: string) => set((state) => {
            localStorage.setItem('jwt', payload);
            return {
                ...state,
                user: payload
            };
        }),
        isProvider: false
    };
});