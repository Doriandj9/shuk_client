import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import { authFn, authLogOut, authProviderFn, infoUserGoogle } from "./requestsAuth";
import { api } from "@/config/app";
import { showError } from "@/modules/core/utilities/errors";


export const useAuth = (handleSuccessLogin?: CallableFunction | null, handleSuccessLoginProvider?: CallableFunction) => {
    const client = useQueryClient();

    const auth = useMutation({
        mutationFn: (data: object) => authFn(data),
        onSuccess(data) {
            client.invalidateQueries({queryKey: ['posts']});
            return handleSuccessLogin && handleSuccessLogin(data);
        },
        onError(error) {
            showError(error);
        },
    });

    const authProvider = useMutation({
        mutationFn: authProviderFn,
        onSuccess(data) {
            return handleSuccessLoginProvider && handleSuccessLoginProvider(data);
        },
        onError(error) {
            showError(error);
        },
    });

    const useGetInfoGoogle = (accessToken: string) => {

        return useQuery({
            queryKey: ['user_google', accessToken],
            queryFn: async () => await infoUserGoogle(accessToken),
            enabled: accessToken !== '',
        });
    };

    return {
        auth,
        authProvider,
        useGetInfoGoogle
    };
};

export const useAuthLogout = (handleFn: CallableFunction) => {

    const logout = useMutation({
        mutationKey: ['user-logout'],
        mutationFn: authLogOut,
        onSuccess: () => {
            handleFn();
        },
    });

    return { logout };
};


export const useTest = () => {
    return useQuery({
        queryKey: ['test'],
        queryFn: async () => {
            const response = await api.get('test');
            return response.data?.data;
        },

    });
};