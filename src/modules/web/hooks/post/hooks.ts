import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { createPost, DataPostSend, getInfinityPosts } from "./queries";


export const useCreatePost = (userId: number | string) => {

    const create = useMutation({
        mutationKey: [`${userId}-temp`],
        mutationFn: (data: DataPostSend) => createPost(data)
    });

    return {create};
};

export const useGetInfinityPosts = () => {
    let currentPage= 1;
    const hook = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: getInfinityPosts,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if(lastPage.next_page_url){
                currentPage = lastPage.current_page + 1;
                return lastPage.current_page + 1;
            }

            return null;
        },
    });

    return {...hook, page: currentPage};
};