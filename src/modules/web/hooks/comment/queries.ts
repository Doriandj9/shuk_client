import { routesApi } from "@/config/apiRoutes";
import { api } from "@/config/app";
import { CommentData } from "./CommentI";
import { useAuthStore } from "@/store/auth";
import { InfinityData } from "../../@types/web";

type GetInfinityCommentPostFn = {
    (args: {pageParam: number}, postId: number | string): Promise<InfinityData<CommentData>>;
};

export const createPost = async (data: CommentData) => {
    const response = await api.post(routesApi.user.resource_comment.path, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`
        }
    });

    return response.data?.data || null;
};


export const getInfinityCommentPost: GetInfinityCommentPostFn = async ({pageParam}, postId) => {
    const path = routesApi.public.infinity_comment_post.path.replace('{post_id}', postId.toString());
    const response = await api.get(`${path}?per_page=10&page=${pageParam}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`
        },
    });

    return response.data?.data || [];
};