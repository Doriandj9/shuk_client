import { Card, CardActions, CardContent, CardHeader, CardMedia, Divider } from "@mui/material";
import AppAvatar from "./AppAvatar";
import { PostData } from "@/modules/web/hooks/post/PostI";
import React, { useEffect } from "react";
import { mergeUserProvider } from "../utilities/mergeUserProvider";
import { TimePostFormat } from "./AppTimePostFomats";
import AppCardMediaDisplay from "./AppCardMediaDisplay";
import AppActionLikePost from "./AppActionLikePost";
import AppActionCommentsPost from "./AppActionCommentsPost";
import AppActionSharePost from "./AppActionSharePost";
import AppCommentsPost from "./AppCommentsPost";
import AppMenuOpPosts from "./AppMenuOpPosts";
import { Link } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";

type AppDisplayPostProps = {
    post: PostData
};

const AppDisplayPost: React.FC<AppDisplayPostProps> = ({ post }) => {
    const user = mergeUserProvider(post.user);
    const uri = new URL(window.location.href);
    const idComment =  uri.searchParams.get('cm');
    const [showComments, setShowComments] = React.useState(Boolean(idComment));
    const refElement = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const id = atob(idComment || '');
        if (id && refElement.current) {
        const element = document.getElementById(`post-${post.id}-comment-${id}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

    },[showComments, idComment]);
    return (
        <>
            {
                post &&
                <div className={`w-full overflow-hidden`}>
                    <Card sx={{ maxWidth: '100%' }}>
                        <CardHeader
                            avatar={
                                <>
                                    <Link to={webRoutes.dashboard_user.path.replace(':username', user?.username ?? '___')}>
                                        <AppAvatar user={user} />
                                    </Link>
                                </>
                            }
                            action={
                                <AppMenuOpPosts post={post} />
                            }
                            title={user.full_name}
                            subheader={<TimePostFormat date={post.created_at || null} />}

                        />
                        <CardMedia>
                            <AppCardMediaDisplay post={post} />
                            <Divider sx={{ marginTop: 1 }} />
                        </CardMedia>
                        <CardActions>
                            <AppActionLikePost post={post} />
                            <AppActionCommentsPost post={post} onClick={() => setShowComments(state => !state)} />
                            <AppActionSharePost post={post} />
                        </CardActions>
                        {
                            showComments && (
                                <>
                                    <Divider />
                                    <div ref={refElement} className="scrollable-container max-h-[35rem] overflow-y-auto">
                                        <CardContent sx={{ paddingY: 1 }}>
                                            <AppCommentsPost post={post} refElement={refElement} />
                                        </CardContent>
                                    </div>
                                </>
                            )
                        }
                    </Card>
                </div>
            }

        </>
    );
};

export default AppDisplayPost;