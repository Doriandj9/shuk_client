import InfinityScrollElement from "./InfinityScrollElement";
import React, { useRef } from "react";
import { useGetSearchInfinityPosts } from "@/modules/web/hooks/post/hooks";
import { AppLoadingNotificationUser } from "./AppLoadinNotificationUser";
import AppErrorFetchingPosts from "./AppErrorFetchingPosts";
import { AppNotNotifies } from "./AppNotNotifies";
import ShowListsPost from "./ShowListPost";
import { app } from "@/config/app";
import { useTranslation } from "react-i18next";
import { serializeText } from "../utilities/lettersAndComponents";


type DisplaySearchPostsProps = {
    searchText?: string | null;
    onClose?: CallableFunction
};

export const DisplaySearchPosts: React.FC<DisplaySearchPostsProps> = ({searchText,onClose}) => {
    const refElement = useRef<HTMLDivElement>(null);
    const [t] = useTranslation('core');

    const { data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useGetSearchInfinityPosts({
        search: searchText,
        per_page: '15'
    });
    
    
    return (
        <>
            <div className="h-full" ref={refElement}>
                <InfinityScrollElement
                    refElement={refElement}
                    render={(scroll) => {
                        if (scroll.action && !isFetching && status !== 'pending' && !isFetchingNextPage) {
                            scroll.changeStatus({ action: false });
                            fetchNextPage();
                        }

                        return (
                            <div className="flex flex-col gap-2">
                                {status && data?.pages.map(({ data: posts }) => {

                                    return posts.map((post) => (
                                        <ShowListsPost 
                                            key={post.id}
                                            picture={post.type_post === 'PI' ? `${app.base_server}${post.path_resource?.path}` : undefined }
                                            postId={post.id}
                                            title={post.description ? serializeText(post.description) : post.user.full_name ?? ''}
                                            user={post.user}
                                            onClose={onClose ? onClose : () => {}}

                                        />
                                    ));
                                })}
                                {status == 'error' && (<AppErrorFetchingPosts error={error} />)}
                                {(status != 'error' && status == 'pending' && searchText) && (<AppLoadingNotificationUser />)}
                                {(status != 'error' && isFetchingNextPage && searchText) && (<AppLoadingNotificationUser />)}
                                {(status !== 'error' && !hasNextPage && searchText)&& (
                                    <div className="mt-4">
                                        <AppNotNotifies text={t('messages.labels.post.end-posts')} />
                                    </div>
                                )}
                            </div>
                        );
                    }}
                />
            </div>
        </>

    );
};