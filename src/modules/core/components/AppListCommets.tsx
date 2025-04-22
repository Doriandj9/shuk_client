import { useInfinityCommentPost } from "@/modules/web/hooks/comment/hook";
import React from "react";
import AppErrorFetchingPosts from "./AppErrorFetchingPosts";
import AppLoadingComments from "./AppLoadinComments";
import AppDisplayComment from "./AppDisplayComment";
import AppNotComments from "./AppNotComments";
import InfinityScrollElement from "./InfinityScrollElement";
type AppListCommentsProps = {
    postId: number | string;
    refElement?: React.RefObject<HTMLDivElement>
};

const AppListComments: React.FC<AppListCommentsProps> = ({ postId, refElement }) => {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfinityCommentPost(postId);

    return (
        <>
            <InfinityScrollElement
                refElement={refElement}
                render={(scroll) => {
                    if (scroll.action && !isFetching && status !== 'pending' && !isFetchingNextPage) {
                        scroll.changeStatus({ action: false });
                        fetchNextPage();
                    }

                    return (
                        <div className="flex flex-col gap-0 md:items-center">
                            {data?.pages.map(({ data: comments }) => {
                                return comments.map((comment) => (
                                    <AppDisplayComment idPost={String(postId)} key={comment.id} comment={comment} />
                                ));
                            })}
                            {status == 'error' && (<AppErrorFetchingPosts error={error} />)}
                            {status != 'error' && status == 'pending' && (<AppLoadingComments />)}
                            {status != 'error' && isFetchingNextPage && (<AppLoadingComments />)}
                            {status !== 'error' && !hasNextPage && (
                                <div className="mt-4">
                                    <AppNotComments />
                                </div>
                            )}
                        </div>
                    );
                }}
            />

        </>
    );
};

export default AppListComments;