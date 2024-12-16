import { useMutation, useQuery, } from "@tanstack/react-query";
import { authFn, authProviderFn, infoUserGoogle } from "./requestsAuth";
import { api } from "@/config/app";


export const useAuth = (handleSuccessLogin?:CallableFunction | null, handleSuccessLoginProvider?: CallableFunction) => {

    const auth = useMutation({
        mutationFn: (data: object) => authFn(data),
        onSuccess(data) {
            return handleSuccessLogin && handleSuccessLogin(data);
        },
    });

    const authProvider = useMutation({
        mutationFn: authProviderFn,
        onSuccess(data) {
            return handleSuccessLoginProvider && handleSuccessLoginProvider(data);
        },
    });

    const useGetInfoGoogle = (accessToken: string) => {

        return useQuery({
            queryKey: ['user_google', accessToken],
            queryFn: async () => await infoUserGoogle(accessToken),
            enabled: accessToken  !== ''
        });
    };

    return {
        auth,
        authProvider,
        useGetInfoGoogle
    };
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