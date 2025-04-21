import { api } from "@/config/app";
import { GetNotifiesForUser, PutNotifiesUserAllDraft, StoreNotificationUserFn, UpdateNotifyUser } from "./notifications";
import { routesApi } from "@/config/apiRoutes";
import { useAuthStore } from "@/store/auth";

export const getUserNotifies: GetNotifiesForUser = async (params) => {

    const response = await api.get(`${routesApi.user.resource_notifies.path}`,{
        params,
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`
        }
    });
    const treatment = {...response.data?.data, total_draft: response.data?.total_draft};

    return treatment || null;
};


export const putNotifiesUserAllDraft: PutNotifiesUserAllDraft = async (userId,data) => {
    const response = await api.put(`${routesApi.user.put_all_notifies_draft.path.replace('{user_id}', userId)}`,data,{
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`
        }
    });

    return response.data?.data || null;
};


export const updateNotifyUser: UpdateNotifyUser = async (data) => {
    const response = await api.put(`${routesApi.user.resource_notifies.path}/${data.id}`,data,{
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`
        }
    });

    return response.data?.data || null;
};


export const storeNotificationUser: StoreNotificationUserFn = async (data) => {
    const response = await api.post(routesApi.user.resource_notifies.path,data,{
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`
        }
    });

    return response.data?.data || null;
};