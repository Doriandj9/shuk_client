import { routesApi } from "@/config/apiRoutes";
import { api } from "@/config/app";
import { GetUsers, PutUsers } from "./users";


export const getUsers: GetUsers = async (params) => {
    const response = await api.get(routesApi.admin.users.path, {
        params
    });

    return response?.data || [];
};

export const putUser: PutUsers = async (data,id) => {
    const response = await api.put(`${routesApi.admin.users.path}/${id}`,data,{
        headers: {
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response.data?.data;
};