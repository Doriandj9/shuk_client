import AppLoadingPosts from "@/modules/core/components/AppLoadinPosts";
import { useParams } from "react-router-dom";
import { useGetPost } from "../../hooks/post/hooks";
import AppLayout from "@/modules/core/layouts/AppLayout";
import AppLoadingComments from "@/modules/core/components/AppLoadinComments";
import AppDisplayPost from "@/modules/core/components/AppDisplayPost";
import { setMetaData } from "@/modules/core/utilities/metaData";
import { useMemo } from "react";
import { setAppTitle } from "@/modules/core/utilities/titles";
import { serializeText } from "@/modules/core/utilities/lettersAndComponents";

const ViewPosts = () => {
    const params = useParams();

    const { isLoading, data: post, isError, error } = useGetPost(params.id ?? null);

    if(post){
        const title = serializeText(post.description ?? '');
        
        setAppTitle(title.length > 50 ? `${title.substring(0,50)}...` : title);
    }

    useMemo(() => {
        if (post) {
            setMetaData(post);
        }
    },[post]);

    return (
        <AppLayout>
            <div className="flex flex-col gap-2 md:items-center">
                {
                    isLoading &&
                    <AppLoadingPosts count={1}>
                        <AppLoadingComments />
                    </AppLoadingPosts>
                }

                {
                    post &&
                    <div
                        className={`app-container-fade text-sm mt-2 
                      ${post?.path_resource?.meta?.typeAspectRadio?.neutral?.value == 'vertical' && post?.path_resource?.meta?.typeAspectRadio?.neutral?.height > 500
                                ? 'app-container-post-vertical' : 'app-container-post'}`}
                        key={post.id}
                    >
                        <AppDisplayPost post={post} />
                    </div>
                }
                {
                    isError &&
                    <div>
                        {error.message}
                    </div>
                }
            </div>
        </AppLayout>
    );
};

export default ViewPosts;