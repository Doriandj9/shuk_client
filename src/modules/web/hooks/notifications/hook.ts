import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationModel, ParamsForGetNotifiesUser, PNotifyNewPost, StoreNotificationUser } from "./notifications";
import { getUserNotifies, putNotifiesUserAllDraft, storeNotificationUser, updateNotifyUser } from "./queries";
import { app } from "@/config/app";
import { showError } from "@/modules/core/utilities/errors";



export const useGetNotificationsUser = (params: ParamsForGetNotifiesUser) => {
    const hook = useInfiniteQuery({
        queryKey: ['notifications','user', params],
        queryFn: (op) => getUserNotifies({ ...params, page: op.pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
                    if (lastPage.next_page_url) {
                        return lastPage.current_page + 1;
                    }
        
                    return null;
                },
                refetchInterval: app.timeRefetchInterval
    });

    return {...hook};
};


export const usePutNotifiesUserAllDraft = (userId?: number | string) => {
    const client = useQueryClient();
    const put = useMutation({
        mutationKey: ['notifications', userId],
        mutationFn: (data: Partial<NotificationModel<PNotifyNewPost>>) => putNotifiesUserAllDraft(String(userId),data),
        onSuccess(){
            client.invalidateQueries({queryKey: ['notifications','user', {user_id: userId}]});
        },
        onError(error) {
            showError(error);
        },
    });

    return {put};
};

export const useUpdateNotifyUser = (userId?: number | string) => {
    const client = useQueryClient();
    const put = useMutation({
        mutationKey: ['notifications', 'update'],
        mutationFn: (data: Partial<NotificationModel<PNotifyNewPost>>) => updateNotifyUser(data),
        onSuccess(){
            client.invalidateQueries({queryKey: ['notifications','user', {user_id: userId}]});
        },
        onError(error) {
            showError(error);
        },
    });

    return {put};
};

export const useStoreNotifyUser = () => {
    const store  = useMutation({
        mutationKey: ['store', 'notification'],
        mutationFn: (data: StoreNotificationUser) => storeNotificationUser(data),
        onError(error) {
            showError(error);
        },
    });

    return {store};
};