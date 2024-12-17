import { Card, CardHeader, CardMedia, IconButton } from "@mui/material";
import AppAvatar from "./AppAvatar";
import MoreVertIcon from '@mui/icons-material/MoreHoriz';
import { PostData } from "@/modules/web/hooks/post/PostI";
import React from "react";
import { mergeUserProvider } from "../utilities/mergeUserProvider";
import { TimePostFormat } from "./AppTimePostFomats";
import { app } from "@/config/app";

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
                      <img className="card-post-img" src={`${app.base_server}${post?.path_resource}`} data-src={''} alt="" />
                    </CardMedia>
                </Card>
            </div>
        </>
    );
};

export default AppDisplayPost;