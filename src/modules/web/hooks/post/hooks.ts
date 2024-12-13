import { useMutation, useQuery } from "@tanstack/react-query";
import { createPost, DataPostSend, getPosts } from "./queries";


export const useCreatePost = (userId: number | string) => {

    const create = useMutation({
        mutationKey: [`${userId}-temp`],
        mutationFn: (data: DataPostSend) => createPost(data)
    });

    return {create};
};

export const useGetPosts = () => {
    const hook = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        initialData: []
    });

    return {...hook};
};