import { routesApi } from "@/config/apiRoutes";
import { api } from "@/config/app";
import { useAuthStore } from "@/store/auth";
import axios from "axios";
import { CompleteRegisterFn, InitialRegisterFn } from "./request";

const {path: login} = routesApi.public.auth;
const {path: loginProvider} = routesApi.public.auth_provider;


export const authFn = async (data: object) => {
    
    const response =  await api.post(login,data,{
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response.data?.data;
};


export const authProviderFn = async (data: object) => {
    Reflect.set(data, 'is_authenticate_provider_shuk',true);
    const response = await api.post(loginProvider,data, {
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });
    
    return response.data?.data;
};

export const authLogOut = async () => {
    const response  = await api.post(routesApi.user.logout.path,undefined, {
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response.data?.data;
};

export const infoUserGoogle = async (accessToken: string) => {
    if(accessToken !== ''){
        const response = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo",{
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-lang': localStorage.getItem('languageApp') ?? 'es'
            }
        });

        return response.data;
    }

    return null;
};


export const initialRegister: InitialRegisterFn  = async (data) => {
    const response = await api.post(routesApi.public.initial_register.path,data,{
        headers: {
            'Accept': `application/json`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response.data?.data;
}; 


export const completeRegister: CompleteRegisterFn = async (data) => {
    const response = await api.post(routesApi.public.complete_register.path,data,{
        headers: {
            'Accept': `application/json`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response.data?.data;
};

export const testFn = async (data: object) => {
    
    const response =  await api.post('test',data);

    return response.data;
};

