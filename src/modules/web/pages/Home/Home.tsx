import { useTranslation } from "react-i18next";
import AppLayout from "@core/layouts/AppLayout";
import AppNewPost from "@core/components/AppNewPost";
import ListPost from "../../components/ListPost";

const Home = () => {
    const [t] = useTranslation('core');

    return (

        <AppLayout>
            <div className="app-container-fade text-sm p-2">
                <p className="text-mode-primary  text-xs md:text-sm  text-center font-semibold">{t('post.introduction')}</p>
                <AppNewPost />
            </div>

            <ListPost />
        </AppLayout>
    );
};


export default Home;


