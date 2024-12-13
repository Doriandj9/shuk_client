import { useTranslation } from "react-i18next";
import AppLayout from "@core/layouts/AppLayout";
import AppNewPost from "@core/components/AppNewPost";
import { useGetPosts } from "../../hooks/post/hooks";

const Home = () => {
    const [t] = useTranslation('core');
    const { data, isLoading } = useGetPosts();

    console.log(data, isLoading);
    return (

        <AppLayout>
            <div className="app-container-fade text-sm p-2">
                <p className="text-mode-primary  text-xs md:text-sm  text-center font-semibold">{t('post.introduction')}</p>
                <AppNewPost />
            </div>

            <div className="flex flex-col gap-2 md:items-center">

                {data.map((post) => {

                    return (
                        <div className="app-container-fade text-sm app-container-post p-2 h-60 mt-2" key={post.id}>
                            <div dangerouslySetInnerHTML={{ __html: post.description || 'N/A' }}>

                            </div>
                        </div>
                    );

                })}


            </div>
        </AppLayout>
    );
};


export default Home;


