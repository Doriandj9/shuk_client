import { routesApi } from "@/config/apiRoutes";
import { api } from "@/config/app";
import { ContentFormPost, PostTypesBack } from "@/modules/core/@types/post";
import { useAuthStore } from "@/store/auth";
import { PostData } from "./PostI";

export type DataPostSend = {type: PostTypesBack; payload: ContentFormPost;};


export const createPost = async (data: DataPostSend) => {

    const response = await api.post(routesApi.user.resource_post.path, data, {headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${(useAuthStore.getState()).token}`
    }});

    return response.data?.data || null;

};


type getPostsFn = {
    (): Promise<PostData[]>
};
export const getPosts: getPostsFn = async () => {

    const response  = await api.get(routesApi.user.resource_post.path, {
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`
        }
    });

    return response.data?.data || [];
};