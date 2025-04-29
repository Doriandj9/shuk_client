import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettingsPlatform, getUserInfoForUsername, likeActionApp, updateConfig, updateUserSettings } from "./quieries";
import { showError } from "@/modules/core/utilities/errors";
import { cloneObject } from "@/modules/core/utilities/objects";
import { useKeysForLocation } from "@/modules/core/utilities/keysForLocation";
import { useParams } from "react-router-dom";
import { OnMutateProp } from "../post/hooks";
import { useAuthStore } from "@/store/auth";
import { app } from "@/config/app";

export const useGetInfoForUsername = (username: string) => {
    const hook = useQuery({
        queryKey: ['user', username],
        queryFn: () => getUserInfoForUsername(username),
        enabled: username !== ''
    });

    return { ...hook };
};

export const useUpdateConfig = () => {
    const config = useMutation({
        mutationKey: ['user-config', 'update'],
        mutationFn: (data: object) => updateConfig(data),
        onError(error) {
            showError(error);
        },
    });

    return { config };
};

export const useUpdateUserConfig = (options?:{id_post_hidden: number}) => {
    const client = useQueryClient();
    const params = useParams();
    const getKeys = useKeysForLocation();
    const reloadUser = useAuthStore((state) => state.updateUser);

    const config = useMutation({
        mutationKey: ['user-settings', 'update'],
        mutationFn: (data: object) => updateUserSettings(data),
        onMutate() {
            const previosData = client.getQueryData(getKeys(window.location.href, params));

            const prevData: object | unknown = cloneObject(previosData);

            client.setQueryData(getKeys(window.location.href,params), (old: OnMutateProp) => {

                const tempValues = { ...old };

                if(options?.id_post_hidden) {
                    tempValues.pages = tempValues.pages?.map((page) => {
                        page.data = page.data?.filter((post) => post.id != options.id_post_hidden);
                        return page;
                    });
                }

                return tempValues;

            });

            return () => client.setQueryData(getKeys(window.location.href,params), prevData);
        },
        onError(error,values, rollback) {
            showError(error);
            if (rollback) {
                rollback();
            }
        },
        onSuccess(response) {
            if (response && 'jwt' in response && typeof response.jwt === 'string') {
                reloadUser(response.jwt);
            }
        },
        
    });

    return { config };
};

export const useGetAppSettings = () => {
    const hook = useQuery({
        queryKey: ['settings-app'],
        queryFn: getSettingsPlatform,
        refetchInterval: app.timeRefetchInterval
    });

    return {...hook};
};

export const useAppActionApp = (type: 'like' | 'dislike') => {
    const client = useQueryClient();
    const action = useMutation({
        mutationKey: ['action-app'],
        mutationFn: () => likeActionApp(type),
        onError(error) {
            if(error){
                showError(error);
            }
        },
        onSuccess(){
            client.invalidateQueries({queryKey: ['settings-app']});
        }
    });

    return {action};
};