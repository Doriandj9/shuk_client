import { PostData } from "@/modules/web/hooks/post/PostI";
import React from "react";
import AppMediaPostImg from "./AppMediaPostImg";
import AppDisplayTitlePost from "./AppDisplayTitlePost";

type AppCardMediaDisplayProps = {
    post: PostData;
};

const AppCardMediaDisplay: React.FC<AppCardMediaDisplayProps> = ({ post }) => {
    if (post.type_post == 'PI') {
        return (<>
            <AppDisplayTitlePost content={post.description?.replaceAll(/style="(.+);"/g, '') || ''} />
            <AppMediaPostImg pathResource={post.path_resource || null} file={post.img} isTemp={post.is_temp} fileTem={post.file_temp} />
        </>);
    }
    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: post.description || '' }}>

            </div>
        </>
    );
};


export default AppCardMediaDisplay;