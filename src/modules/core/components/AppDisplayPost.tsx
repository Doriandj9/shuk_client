import { Card, CardActions, CardHeader, CardMedia, Divider, IconButton } from "@mui/material";
import AppAvatar from "./AppAvatar";
import MoreVertIcon from '@mui/icons-material/MoreHoriz';
import { PostData } from "@/modules/web/hooks/post/PostI";
import React from "react";
import { mergeUserProvider } from "../utilities/mergeUserProvider";
import { TimePostFormat } from "./AppTimePostFomats";
import AppCardMediaDisplay from "./AppCardMediaDisplay";
import AppActionLikePost from "./AppActionLikePost";
import AppActionCommentsPost from "./AppActionCommentsPost";
import AppActionSharePost from "./AppActionSharePost";

type AppDisplayPostProps = {
    post: PostData
};

const AppDisplayPost: React.FC<AppDisplayPostProps> = ({post}) => {
    const user = mergeUserProvider(post.user);
   
    return (
        <>
            <div className="w-full overflow-hidden">
                <Card sx={{ maxWidth: '100%' }}>
                    <CardHeader
                        avatar={
                            <AppAvatar user={user} />
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={user.full_name}
                        subheader={<TimePostFormat date={post.created_at || null} />}

                    />
                    <CardMedia> 
                        <AppCardMediaDisplay post={post} />
                        <Divider sx={{marginTop: 1}}/>
                    </CardMedia>
                    <CardActions>
                        <AppActionLikePost post={post} />
                        <AppActionCommentsPost />
                        <AppActionSharePost />
                    </CardActions>

                </Card>
            </div>
        </>
    );
};

export default AppDisplayPost;