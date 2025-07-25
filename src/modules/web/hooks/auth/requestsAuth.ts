import { routesApi } from "@/config/apiRoutes";
import { api } from "@/config/app";
import { useAuthStore } from "@/store/auth";
import { CompleteRegisterFn, ForwardPasswordFn, InitialRegisterFn, ResetPasswordFn, VerifyTokenResetPassword } from "./request";

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
        const response = await api.post(routesApi.public.get_data_google,{client_token: accessToken});

        return response.data.data;
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

export const forwardPassword: ForwardPasswordFn = async (data) => {
    const response = await api.post(routesApi.public.forward_password.path,data,{
        headers: {
            'Accept': `application/json`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response.data?.data;
};


export const verifyTokenResetPassword: VerifyTokenResetPassword = async (token) => {
    const response = await api.get(routesApi.public.recovery_password.path.replace('{token}',token),{
        headers: {
            'Accept': `application/json`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response.data?.data || null;
};

export const resetPassword: ResetPasswordFn = async (data) => {
    const response = await api.post(routesApi.public.reset_password.path,data,{
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

