import { IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { PostData } from "@/modules/web/hooks/post/PostI";
import React from "react";
import AppRenderNumberLikes from "./AppRenderNumberLikes";
import AppEventClickPost from "./AppEventClickPost";
import { useAuthStore } from "@/store/auth";

type AppActionLikePostProps = {
    post: PostData
};

const AppActionLikePost: React.FC<AppActionLikePostProps> = ({ post }) => {
    const isLogin = useAuthStore((state) => state.isLogin);
    return (
        <>
            <AppEventClickPost post={post} defaultIsClick={post.your_liked} defaultCount={post.likes} render={({ count, click, isClick }) => (
                <IconButton disabled={post.is_temp} onClick={() => {
                    const value = isClick ? count - 1 : count + 1;
                    click({ likes: isClick ? -1 : 1, type: post.type_post, total_likes: isClick ? count - 1 : count + 1 }, value);
                }}>
                    <AppRenderNumberLikes likes={count} />
                    <FavoriteIcon color={  !isClick || !isLogin ? 'action' : 'error'} />
                </IconButton>
            )} />
        </>
    );
};


export default AppActionLikePost;   