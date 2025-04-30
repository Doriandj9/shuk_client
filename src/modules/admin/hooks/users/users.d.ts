import { ResponseCreateApi } from "@/modules/core/@types/core";
import { InfinityData, User } from "@/modules/web/@types/web";

type GetUsersProps = {
    page?: string;
    per_page?: string;
}

export type GetUsers = {
    (params: GetUsersProps): Promise<InfinityData<User>>;
};

export type PutUsersParams = Partial<User>; 

export type PutUsers = {
    (data:PutUsersParams, id: string): Promise<ResponseCreateApi<User>['data']>;
};