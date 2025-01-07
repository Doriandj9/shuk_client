import AppLayout from "@/modules/core/layouts/AppLayout";
import HeaderProfile from "../../components/HeaderProfile";
import AppDivider from "@/modules/core/components/AppDivider";
import ContentInfo from "../../components/ContentInfo";
import ListPostsUser from "../../components/ListPostsUser";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetInfoForUsername } from "../../hooks/user/hook";
import AppLoading from "@/modules/core/components/AppLoading";


const DashboardUser = () => {
    const [t] = useTranslation('web');
    const params = useParams();
    const {data, isLoading, isError} = useGetInfoForUsername(params.username ?? '');

    return (
        <>
        <AppLoading isOpen={isLoading} />
            <AppLayout>
                <div className="w-full app-container-fade p-2 min-h-60">
                    <HeaderProfile user={data || null} />
                    <AppDivider />
                    <ContentInfo user={data || null} countPosts={data?.total_posts ?? 0} />
                </div>
                <div className="w-full my-4 py-4">
                    <h4 className="text-2xl font-semibold text-mode-white text-center my">{t('descriptions.your-post')}</h4>
                    <ListPostsUser />
                </div>
            {
                isError &&
                'Recurso no encontrado'
            }
            </AppLayout>
        </>
    );
};

export default DashboardUser;