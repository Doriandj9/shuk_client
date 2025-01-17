import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserInfoForUsername, updateConfig, updateUserSettings } from "./quieries";

export const useGetInfoForUsername = (username: string) => {
    const hook = useQuery({
        queryKey: ['user', username],
        queryFn: () => getUserInfoForUsername(username),
        enabled: username !== ''
    });

    return {...hook};
};

export const useUpdateConfig = () => {
    const config = useMutation({
        mutationKey: ['user-config', 'update'],
        mutationFn: (data: object) => updateConfig(data)
    });

    return {config};
};

export const useUpdateUserConfig = () => {
    const config = useMutation({
        mutationKey: ['user-settings', 'update'],
        mutationFn: (data: object) => updateUserSettings(data)
    });

    return {config};
};