import { routesApi } from "@/config/apiRoutes";
import { api } from "@/config/app";
import { User } from "../../@types/web";
import { useAuthStore } from "@/store/auth";

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
            'Content-Type': 'multipart/form-data'
        }
    });

    return response?.data?.data || null;
};

export const updateUserSettings = async (data: unknown) => {
    const response = await api.post(routesApi.user.update_settings.path, data, {
        headers: {
            'Authorization': `Bearer ${useAuthStore.getState().token}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    return response?.data?.data || null;
};