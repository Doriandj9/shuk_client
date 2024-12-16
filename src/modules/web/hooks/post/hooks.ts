import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, DataPostSend, getInfinityPosts } from "./queries";
import moment from "moment";
import { convertImg } from "@/modules/core/utilities/img/convert";

type OnMutateProp = {
    pageParams?: number[];
    pages: object[];
};

export const useCreatePost = (userId: number | string) => {
    const client = useQueryClient();

    const create = useMutation({
        mutationKey: [`${userId}-temp`],
        mutationFn: (data: DataPostSend) => createPost(data),
        onMutate: (data) => {
            const tempPost = {
                id: `${userId}-temp`,
                description: data.payload.value.html,
                date: moment().format('YYYY-MM-DD'),
                doc_status: 'TM',
                is_active: true,
                type_post: data.type,
                path_resource: '',
                likes: 0,
                comments: 0,
                shared: 0,
                payload_post: data.payload,
                is_multiple: false,
                user_id: userId,
                is_temp: true
            };

            if(data.type == 'PI'){
                convertImg(data.payload.value.file || new Blob(),tempPost,'path_resource');
            }


            const previosData = client.getQueryData(['posts']);

            client.setQueryData(['posts'], (old: OnMutateProp) => {
                const oldValues = {...old};

                oldValues.pages.unshift({
                    current_page: 0,
                    data: [tempPost],
                    first_page_url: '',
                    from: 0,
                    last_page: 0,
                    last_page_url: '',
                    links: [],
                    next_page_url: '',
                    path: '',
                    per_page: 2,
                    prev_page_url: null,
                    to: 0,
                    total: 0,
                }); 
                oldValues.pageParams?.unshift(0);

                return oldValues;
            });
         
            return () => client.setQueryData(['posts'],previosData);
        },
        onError: (error, values,rollback) =>{
           if(rollback){
            rollback();
           } 
        },
        onSuccess: () => {
           client.invalidateQueries({queryKey: ['posts']});
        }
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