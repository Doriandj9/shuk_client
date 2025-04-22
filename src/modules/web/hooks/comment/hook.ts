import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentData } from "./CommentI";
import { createComment, getInfinityCommentPost } from "./queries";
import { cloneObject } from "@/modules/core/utilities/objects";
import { useAuthStore } from "@/store/auth";
import moment from "moment";
import { InfinityData } from "../../@types/web";
import { showError } from "@/modules/core/utilities/errors";
import { useContext } from "react";
import { KeysPostContext } from "../../providers/KeysPosts";

type OnMutateProp = {
    pageParams?: number[];
    pages: InfinityData<CommentData>[];
};

export const useCreateComment = (postId: number | string) => {
    const queryClient = useQueryClient();
    const {keys} = useContext(KeysPostContext);
    
    const comment = useMutation({
        mutationKey: ['comment', 'create', postId],
        mutationFn: (data: CommentData) => createComment(data),
        onMutate: (data) => {
            const previousComments = cloneObject(queryClient.getQueryData(['comment', 'list', postId]));
            const currentUser = useAuthStore.getState().user;
            const tempData = { ...data };
            tempData.id = `${currentUser?.id}-comment-temp-${moment().unix()}`;
            tempData.user = currentUser || undefined;

            queryClient.setQueryData(['comment', 'list', postId], (old: OnMutateProp) => {
                const oldValues = { ...old };

                oldValues.pages.unshift({
                    current_page: 0,
                    data: [tempData],
                    first_page_url: '',
                    from: 0,
                    last_page: 0,
                    last_page_url: '',
                    links: [],
                    next_page_url: '',
                    path: '',
                    per_page: 10,
                    prev_page_url: null,
                    to: 0,
                    total: 0,
                });
                oldValues.pageParams?.unshift(0);

                return oldValues;
            });


            return () => queryClient.setQueryData(['comment', 'list', postId], previousComments);
        },
        onError: (error, values, rollback) => {
            showError(error);
            if (rollback) {
                rollback();
            }
        },
        onSuccess: () => {
            let previosData = queryClient.getQueryData(['comment', 'list', postId]);

            if (previosData && typeof previosData == 'object') {
                let pageParams: OnMutateProp['pageParams'] = Reflect.get(previosData, 'pageParams');
                let pages: OnMutateProp['pages'] = Reflect.get(previosData, 'pages');

                pageParams = pageParams?.filter((value) => value == 1 || value === 0);
                pages = pages?.filter((value) => value.current_page == 1 || value.current_page == 0);

                previosData = { pageParams, pages };
            }
            queryClient.setQueryData(['comment', 'list', postId], previosData);
            queryClient.invalidateQueries({ queryKey: ['comment', 'list', postId] });
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({queryKey: keys});

        }
    });

    return { comment };
};

export const useInfinityCommentPost = (postId: number | string) => {

    const hook = useInfiniteQuery({
        queryKey: ['comment', 'list', postId],
        queryFn: (arg) => getInfinityCommentPost(arg, postId),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.next_page_url) {
                return lastPage.current_page + 1;
            }
            return null;
        },
        refetchInterval: (1000 * 5),
    });

    return { ...hook };
};