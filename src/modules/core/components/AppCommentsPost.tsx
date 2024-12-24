import { PostData } from "@/modules/web/hooks/post/PostI";
import React from "react";
import AppNewCommentPost from "./AppNewCommentPost";
import { useTranslation } from "react-i18next";

type AppCommentsPostProps = {
    post: PostData;
};

const AppCommentsPost: React.FC<AppCommentsPostProps> = ({ post }) => {
        const [t] = useTranslation('core');
    
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