import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, putUser } from "./queries";
import { app } from "@/config/app";
import { PutUsersParams } from "./users";
import { showError } from "@/modules/core/utilities/errors";


export const useGetUSers = (currentPage?: number) => {
    const perPage = '10';
    const hook = useQuery({
        queryKey: ['users','list',currentPage],
        queryFn: () => getUsers({per_page: perPage, page: String(currentPage)}),
        refetchInterval: app.timeRefetchInterval,
        enabled: !!currentPage
    });

    return {...hook, perPage: parseInt(perPage)};
};


export const usePutUser = (id: string,currentPage?:number) => {
    const client = useQueryClient();
    const put = useMutation({
        mutationKey: ['put-users'],
        mutationFn: (data: PutUsersParams) => putUser(data,id),
        onError(error) {
            if(error){
                showError(error);
            }
        },
        onSuccess(){
            client.invalidateQueries({queryKey: ['users','list',currentPage]});
        }
    });

    return {put};
};