import { IconButton } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import AppEventClickShared from "./AppEventClickShared";
import { PostData } from "@/modules/web/hooks/post/PostI";
import React from "react";
import { formatNumberInteraction } from "../utilities/formatNumbers";

type AppActionSharePostProps = {
    post: PostData
};

const AppActionSharePost: React.FC<AppActionSharePostProps> = ({post}) => {

    return (
        <>
            <AppEventClickShared
                render={({open}) => (
                    <IconButton onClick={() => open()}>
                        <span className="text-xs">{formatNumberInteraction(post.shared)}</span>
                        <ShareIcon color="success" />
                    </IconButton>
                )}

            />
        </>
    );
};


export default AppActionSharePost;