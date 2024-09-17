import { routesApi } from "@/config/apiRoutes";
import { api } from "@/config/app";

const route = routesApi.public.auth;

export const authFn = async (data: object) => {
    
    const response =  await api.post(route.path,data);

    return response.data?.data;
};

export const testFn = async (data: object) => {
    
    const response =  await api.post('test',data);

    return response.data;
};