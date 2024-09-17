import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { authFn, testFn } from "./requestsAuth";
import { api } from "@/config/app";


export const useAuth = (handleSuccess:CallableFunction) => {
    const client = useQueryClient();
    const auth = useMutation({
        mutationFn: (data: object) => authFn(data),
        onError: () => console.log('hookError')
    });

    const test = useMutation({
        mutationKey: ['test'],
        mutationFn: (data: object) =>  testFn(data),
        onMutate: (data) => {
            const previosData = client.getQueryData(['test']);
            client.setQueryData(['test'],(old: unknown[]) => {
                return [
                ...old,
                {
                    id: 'temp',
                    ...data
                }
            ];});

            return () => client.setQueryData(['test'],previosData);
        },

        onError: (error,values,rollback) => rollback && rollback(),
        onSuccess(data, variables, context) {
            return handleSuccess(context);
        },
    });

    return {
        auth,
        test
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