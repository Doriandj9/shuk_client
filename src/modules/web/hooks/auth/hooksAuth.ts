import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { authFn, authProviderFn, testFn, infoUserGoogle } from "./requestsAuth";
import { api } from "@/config/app";


export const useAuth = (handleSuccessLogin?:CallableFunction | null, handleSuccessLoginProvider?: CallableFunction) => {
    // const client = useQueryClient();

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
            queryFn: async () => await infoUserGoogle(accessToken)
        });
    };
    // const test = useMutation({
    //     mutationKey: ['test'],
    //     mutationFn: (data: object) =>  testFn(data),
    //     onMutate: (data) => {
    //         const previosData = client.getQueryData(['test']);
    //         client.setQueryData(['test'],(old: unknown[]) => {
    //             return [
    //             ...old,
    //             {
    //                 id: 'temp',
    //                 ...data
    //             }
    //         ];});

    //         return () => client.setQueryData(['test'],previosData);
    //     },

    //     onError: (error,values,rollback) => rollback && rollback(),
    //     onSuccess(data, variables, context) {
    //         return handleSuccess(context);
    //     },
    // });

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