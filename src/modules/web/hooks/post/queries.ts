import { routesApi } from "@/config/apiRoutes";
import { api } from "@/config/app";
import { ContentFormPost, PostTypesBack } from "@/modules/core/@types/post";
import { useAuthStore } from "@/store/auth";
import { PostDataInfinity } from "./PostI";

export type DataPostSend = {type: PostTypesBack; payload: ContentFormPost;};


export const createPost = async (data: DataPostSend) => {

    const response = await api.post(routesApi.user.resource_post.path, data, {headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${(useAuthStore.getState()).token}`
    }});

    return response.data?.data || null;

};


type getPostsFn = {
    (params:{pageParam: number}): Promise<PostDataInfinity>
};
export const getInfinityPosts: getPostsFn = async ({ pageParam }) => {
    api.interceptors.response.clear();
    const response  = await api.get(`${routesApi.public.infinity_post.path}?per_page=2&page=${pageParam}`, {
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`
        },
    });

    return response.data?.data || [];
};