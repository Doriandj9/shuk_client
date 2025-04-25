import { routesApi } from "@/config/apiRoutes";
import { api } from "@/config/app";
import { ContentFormPost, PostTypesBack } from "@/modules/core/@types/post";
import { useAuthStore } from "@/store/auth";
import { CreatePost, getPostsFn, PostData } from "./PostI";
import { InfinityData } from "../../@types/web";

export type DataPostSend = {type: PostTypesBack; payload: ContentFormPost; categories?: string[]};


export const createPost: CreatePost = async (data) => {
    
    const response = await api.post(routesApi.user.resource_post.path, data, {headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
        'X-lang': localStorage.getItem('languageApp') ?? 'es'
    }});

    return response.data?.data || null;

};




export const getInfinityPosts: getPostsFn = async (params) => {
    api.interceptors.response.clear();
    const response  = await api.get(routesApi.public.infinity_post.path, {
        params,
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        },
    });

    return response.data?.data || [];
};

export const putPost =  async (id: number | string,data: unknown) => {
    const response = await api.put(`${routesApi.user.resource_post.path}/${id}`, data, {headers: {
        'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
        'X-lang': localStorage.getItem('languageApp') ?? 'es'
    }});

    return response.data?.data || null;
};

export const putPostShared =  async (id: number | string,data: unknown) => {
    const response = await api.put(`${routesApi.public.shared_post.path.replace(`{id}`, String(id))}`, data, {headers: {
        'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
        'X-lang': localStorage.getItem('languageApp') ?? 'es'
    }});

    return response.data?.data || null;
};


type getPostFn = {
    (id: number | string): Promise<PostData | null>;
};

export const getPost: getPostFn = async (id) => {
    const response = await api.get(`${routesApi.user.resource_post.path}/${id}`,{
        headers: {
        'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
        'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response.data?.data ?? null;
};

type getInfinityPostUserFn = {
    (args: {pageParam: number}, username: string): Promise<InfinityData<PostData>>;
};

export const getInfinityPostUser: getInfinityPostUserFn = async ({pageParam}, username) => {
    const path = routesApi.user.infinity_posts.path.replace('{username}', username);
    const response = await api.get(`${path}?per_page=2&page=${pageParam}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        },
    });

    return response.data?.data || [];
};