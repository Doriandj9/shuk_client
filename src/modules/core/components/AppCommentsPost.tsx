import { PostData } from "@/modules/web/hooks/post/PostI";
import React from "react";
import AppNewCommentPost from "./AppNewCommentPost";
import { useTranslation } from "react-i18next";
import AppListComments from "./AppListCommets";
import { Divider } from "@mui/material";

type AppCommentsPostProps = {
    post: PostData;
    refElement?: React.RefObject<HTMLDivElement>
};

const AppCommentsPost: React.FC<AppCommentsPostProps> = ({ post,refElement }) => {
    const [t] = useTranslation('core');

    return (
        <>
            <h3 className="text-mode-slate text-sm font-semibold tracking-wide">
                {t('messages.labels.comment.comments')}
            </h3>
            <AppNewCommentPost postId={post.id} ownerId={post.user.id}  />
            <div className="my-2">
                <Divider />
            </div>
            <AppListComments postId={post.id} refElement={refElement} />
        </>
    );
};


export default AppCommentsPost;