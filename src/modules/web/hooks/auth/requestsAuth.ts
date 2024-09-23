import { routesApi } from "@/config/apiRoutes";
import { api } from "@/config/app";
import axios from "axios";

const {path: login} = routesApi.public.auth;
const {path: loginProvider} = routesApi.public.auth_provider;


export const authFn = async (data: object) => {
    
    const response =  await api.post(login,data);

    return response.data?.data;
};

export const authProviderFn = async (data: object) => {
    Reflect.set(data, 'is_authenticate_provider_shuk',true);
    const response = await api.post(loginProvider,data);

    return response.data?.data;
};

export const infoUserGoogle = async (accessToken: string) => {
    if(accessToken !== ''){
        const response = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo",{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return response.data;
    }

    return null;
};


export const testFn = async (data: object) => {
    
    const response =  await api.post('test',data);

    return response.data;
};