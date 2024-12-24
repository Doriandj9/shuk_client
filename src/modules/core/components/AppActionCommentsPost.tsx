import { IconButton } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { PostData } from "@/modules/web/hooks/post/PostI";
import React from "react";
import { formatNumberInteraction } from "../utilities/formatNumbers";

type AppActionCommentsPostProps = {
    post: PostData;
    onClick: (e?:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
const AppActionCommentsPost: React.FC<AppActionCommentsPostProps> = ({post, onClick}) => {

    return (
        <>
            <IconButton onClick={onClick}>
                <span className="text-xs">{formatNumberInteraction(post.comments)}</span>
                <CommentIcon color="primary" />
            </IconButton>
        </>
    );
};


export default AppActionCommentsPost;