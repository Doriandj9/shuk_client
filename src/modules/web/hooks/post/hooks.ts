import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, DataPostSend, getInfinityPosts, getInfinityPostUser, getPost, putPost, putPostShared } from "./queries";
import moment from "moment";
import { ParamsPostInfinityFn, PathResourcesType, PostData, PostDataInfinity } from "./PostI";
import { User } from "../../@types/web";
import { DataUpdatePost } from "@/modules/core/components/AppEventClickPost";
import { cloneObject } from "@/modules/core/utilities/objects";
import { showError } from "@/modules/core/utilities/errors";
import { app } from "@/config/app";
import { useContext } from "react";
import { KeysPostContext } from "../../providers/KeysPosts";


type OnMutateProp = {
    pageParams?: number[];
    pages: PostDataInfinity[];
};

const userTemp: User = {
    id: 0,
    full_name: 'User Temporal',
    email: '',
};

export const useCreatePost = (user: User | null) => {
    const client = useQueryClient();
    const {keys} = useContext(KeysPostContext);
    
    const create = useMutation({
        mutationKey: [`${user?.id}-temp`],
        mutationFn: (data: DataPostSend) => createPost(data),
        onMutate: (data) => {
                const previosData = client.getQueryData(['posts']);
                const prevData: object | unknown = cloneObject(previosData);

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
            showError(error);
            if (rollback) {
                rollback();
            }
        },
        onSuccess: () => {
            let previosData = client.getQueryData(['posts']);
            if (previosData && typeof previosData == 'object') {
                let pageParams: OnMutateProp['pageParams'] = Reflect.get(previosData, 'pageParams');
                let pages: OnMutateProp['pages'] = Reflect.get(previosData, 'pages');

                pageParams = pageParams?.filter((value) => value == 1 || value === 0);
                pages = pages?.filter((value) => value.current_page == 1 || value.current_page == 0);

                previosData = { pageParams, pages };
            }
            client.setQueryData(['posts'], previosData);
            client.invalidateQueries({ queryKey: ['posts'] });
            client.invalidateQueries({queryKey: keys});

        }
    });

    return { create };
};

export const useGetInfinityPosts = () => {
    let currentPage = 1;
    const hook = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: (op) => getInfinityPosts({ per_page: '2', page: op.pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.next_page_url) {
                currentPage = lastPage.current_page + 1;
                return lastPage.current_page + 1;
            }

            return null;
        },
        refetchInterval: app.timeRefetchInterval
    });

    return { ...hook, page: currentPage };
};

export const useGetInfinityPostsForCategory = (params: ParamsPostInfinityFn) => {
    let currentPage = 1;
    const hook = useInfiniteQuery({
        queryKey: [params],
        queryFn: (op) => getInfinityPosts({ ...params, page: op.pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.next_page_url) {
                currentPage = lastPage.current_page + 1;
                return lastPage.current_page + 1;
            }

            return null;
        },
        refetchInterval: app.timeRefetchInterval
    });

    return { ...hook, page: currentPage };
};

export const useUpdatePost = (id: number | string) => {
    const client = useQueryClient();

    const put = useMutation({
        mutationKey: ['posts'],
        mutationFn: (data: unknown) => putPost(id, data),
        onMutate: (data: DataUpdatePost) => {
            const previosData = client.getQueryData(['posts']);
            const prevData: object | unknown = cloneObject(previosData);

            client.setQueryData(['posts'], (old: OnMutateProp) => {

                const tempValues = { ...old };

                tempValues.pages = tempValues.pages.map((page) => {
                    page.data = page.data.map((post) => {
                        if (post.id == id) {
                            const postUpdate = { ...post, ...data };
                            return postUpdate;
                        }

                        return post;
                    });

                    return page;
                });


                return tempValues;

            });

            return () => client.setQueryData(['posts'], prevData);
        },
        onError: (error, values, rollback) => {
            showError(error);
            if (rollback) {
                rollback();
            }
        },
    });

    return { put };
};


export const useUpdateSharedPost = (id: number | string) => {
    const client = useQueryClient();

    const put = useMutation({
        mutationKey: ['posts-shared'],
        mutationFn: (data: unknown) => putPostShared(id, data),
        onMutate: (data: DataUpdatePost) => {
            const previosData = client.getQueryData(['posts']);
            const prevData: object | unknown = cloneObject(previosData);

            client.setQueryData(['posts'], (old: OnMutateProp) => {

                const tempValues = { ...old };

                tempValues.pages = tempValues.pages.map((page) => {
                    page.data = page.data.map((post) => {
                        if (post.id == id) {
                            const postUpdate = { ...post, ...data };
                            return postUpdate;
                        }

                        return post;
                    });

                    return page;
                });


                return tempValues;

            });

            return () => client.setQueryData(['posts'], prevData);
        },
        onError: (error, values, rollback) => {
            showError(error);
            if (rollback) {
                rollback();
            }
        },
    });

    return { put };
};

export const useGetPost = (id: number | string | null) => {
    const hook = useQuery({
        queryKey: ['posts', id],
        queryFn: () => getPost(id ?? ''),
        enabled: !!id,
        refetchInterval: app.timeRefetchInterval

    });

    return { ...hook };
};


export const useGetInfinityPostsUser = (username: string | undefined | null) => {

    const hook = useInfiniteQuery({
        queryKey: [username, 'posts'],
        queryFn: (arg) => getInfinityPostUser(arg, username ?? ''),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.next_page_url) {
                return lastPage.current_page + 1;
            }
            return null;
        },
        enabled: !!username,
        refetchInterval: app.timeRefetchInterval

    });

    return { ...hook };
};