import { routesApi } from "@/config/apiRoutes";
import { api } from "@/config/app";
import { User } from "../../@types/web";
import { useAuthStore } from "@/store/auth";
import { GetSettingsPlatform, LikeAppFn } from "./UserI";

type GetUserInfoForUsernameFn = {
    (username: string):  Promise<User | null>;
};

export const getUserInfoForUsername: GetUserInfoForUsernameFn = async (username: string) => {
    const response = await api.get(routesApi.user.user_info.path.replace('{username}', username));

    return response?.data?.data || null;
};

export const updateConfig = async (data: unknown) => {
    
    const response = await api.post(routesApi.user.config.path, data, {
        headers: {
            'Authorization': `Bearer ${useAuthStore.getState().token}`,
            'Content-Type': 'multipart/form-data',
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response?.data?.data || null;
};

export const updateUserSettings = async (data: unknown) => {
    const response = await api.post(routesApi.user.update_settings.path, data, {
        headers: {
            'Authorization': `Bearer ${useAuthStore.getState().token}`,
            'Content-Type': 'multipart/form-data',
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response?.data?.data || null;
};

export const likeActionApp: LikeAppFn = async (type) => {
    const response = await api.post(routesApi.user.action_app.path.replace('{type}', type),undefined,{
        headers: {
            'Authorization': `Bearer ${useAuthStore.getState().token}`,
            'Content-Type': 'multipart/form-data',
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });
    return response.data?.data;
};


export const getSettingsPlatform: GetSettingsPlatform = async () => {
    const response = await api.get(routesApi.public.app_platform.path);
    return response.data?.data;
};