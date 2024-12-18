import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, DataPostSend, getInfinityPosts } from "./queries";
import moment from "moment";
import { PathResourcesType, PostData } from "./PostI";
import { User } from "../../@types/web";

type OnMutateProp = {
    pageParams?: number[];
    pages: object[];
};

const userTemp: User = {
    id: 0,
    full_name: 'User Temporal',
    email:'',
};

export const useCreatePost = (user: User | null) => {
    const client = useQueryClient();

    const create = useMutation({
        mutationKey: [`${user?.id}-temp`],
        mutationFn: (data: DataPostSend) => createPost(data),
        onMutate: (data) => {
            const previosData = client.getQueryData(['posts']);
            let prevData: object | unknown = {};
            if (typeof structuredClone === 'function') {
                prevData = structuredClone(previosData);
            } else {
                prevData = JSON.parse(JSON.stringify(previosData));
            }

            const tempPost: PostData = {
                id: `${user?.id}-temp`,
                description: data.payload.value.html,
                date: moment().format('YYYY-MM-DD'),
                doc_status: 'TM',
                is_active: true,
                type_post: data.type,
                path_resource: null,
                likes: 0,
                comments: 0,
                shared: 0,
                payload_post: data.payload,
                is_multiple: false,
                user_id: user?.id,
                is_temp: true,
                user: user || userTemp,
                files: null,
                img: null,
                file_temp: data.payload.value.file || undefined
            };

            if (data.type == 'PI') {
                const pathResource: PathResourcesType = {
                    path: '',
                    meta: {
                        aspectRadio: null,
                        typeAspectRadio: null,
                        width: 0,
                        height: 0,
                        needContainer: false,
                        metaColors: {
                            max: null,
                            middle: null,
                            min: null,
                        },
                        isResize: false
                    }
                };

                Reflect.set(tempPost, 'path_resource', pathResource);
            }


            

            client.setQueryData(['posts'], (old: OnMutateProp) => {
                const oldValues = { ...old };

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

            return () => client.setQueryData(['posts'], prevData);
        },
        onError: (error, values, rollback) => {
            if (rollback) {
                rollback();
            }
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['posts'] });
        }
    });

    return { create };
};

export const useGetInfinityPosts = () => {
    let currentPage = 1;
    const hook = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: getInfinityPosts,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.next_page_url) {
                currentPage = lastPage.current_page + 1;
                return lastPage.current_page + 1;
            }

            return null;
        },
    });

    return { ...hook, page: currentPage };
};