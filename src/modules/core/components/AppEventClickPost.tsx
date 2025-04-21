import { useUpdatePost } from "@/modules/web/hooks/post/hooks";
import { PostData } from "@/modules/web/hooks/post/PostI";
import React, { useEffect } from "react";
import { PostTypesBack } from "../@types/post";
import { useMiddlewareAuth } from "../hooks/useMiddlewareAuth";
import { webRoutes } from "@/config/webRoutes";
import { useStoreNotifyUser } from "@/modules/web/hooks/notifications/hook";
import { StoreNotificationUser } from "@/modules/web/hooks/notifications/notifications";
import { useBuildMessagePost } from "../hooks/useMessageAndTransPost";
import { useLanguageApp } from "@/store/language";
import { useAuthStore } from "@/store/auth";
export type ActionType = 'likes' | 'comments' | 'shares';

export type DataUpdatePost = {
    likes?: number;
    comments?: number;
    shared?: number;
    type: PostTypesBack;
    total_likes?: number;
    total_shared?: number;
    social_provider_id?: number | string;
};

type AppEventClickPostProps = {
    render: (args: { count: number; click: (data: DataUpdatePost, value: number) => void, isClick: boolean }) => React.ReactElement;
    post: PostData;
    defaultIsClick?: boolean;
    defaultCount?: number;
}

const AppEventClickPost: React.FC<AppEventClickPostProps> = ({ render, post, defaultIsClick, defaultCount }) => {
    const [count, setCount] = React.useState( defaultCount || post.likes);
    const user = useAuthStore((state) => state.user);
    const [isClick, setIsClick] = React.useState(defaultIsClick || false);
    const language = useLanguageApp((state) => state.language);
    const {verifiedAuth} = useMiddlewareAuth();
    const {store} = useStoreNotifyUser();
    const buildMessage = useBuildMessagePost();

    const { put } = useUpdatePost(post.id);

    const updateData = (data: DataUpdatePost, value: number) => {
        
        verifiedAuth({redirect: webRoutes.login.path});

        setIsClick((prev) => !prev);
        setCount(value);
        put.mutate(data, {
            onSuccess(){
                if(post.user.id === user?.id) return;
                const {message,trans} = buildMessage('LIKE_POST',language,post.description?.replaceAll(/style="(.+);"/g, '').slice(0,7) + '...');
                const data: StoreNotificationUser = {
                    type: 'TLP',
                    action: 'Like for post',
                    message,
                    trans,
                    sender: user?.id,
                    receiver: post.user.id,
                    payload: {
                        relative_path: webRoutes.view_posts.path.replace(':id', String(post.id))
                    }
                };
                store.mutate(data);
            },
            onError: () => {
            setIsClick((prev) => !prev);
        }
    });
};

useEffect(() => { 
    setCount(post.total_likes || post.likes);
    setIsClick(defaultIsClick ?? false);

}, [post, defaultIsClick]);

    return (
        <>
            {render({ count: count, click: updateData, isClick: isClick })}
        </>
    );
};


export default AppEventClickPost;