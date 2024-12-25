import { PostData } from "@/modules/web/hooks/post/PostI";
import React from "react";
import AppNewCommentPost from "./AppNewCommentPost";
import { useTranslation } from "react-i18next";
import { useInfinityCommentPost } from "@/modules/web/hooks/comment/hook";

type AppCommentsPostProps = {
    post: PostData;
};

const AppCommentsPost: React.FC<AppCommentsPostProps> = ({ post }) => {
        const [t] = useTranslation('core');
        const {data} = useInfinityCommentPost(post.id);
        console.log('comments',data);
    return (
        <>
            <h3 className="text-mode-slate text-sm font-semibold tracking-wide">
                {t('messages.labels.comment.comments')}
            </h3>
            <AppNewCommentPost postId={post.id} />
        </>
    );
};


export default AppCommentsPost;