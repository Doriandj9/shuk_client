import AppLayout from "@/modules/core/layouts/AppLayout";
import { Outlet, useParams } from "react-router-dom";
import { useGetInfoForUsername } from "../../hooks/user/hook";
import AppLoading from "@/modules/core/components/AppLoading";
import NavbarConfig from "../../components/NavbarConfig";


const Configuration = () => {
    const params = useParams();
    const { data, isLoading } = useGetInfoForUsername(params.username || '');
    console.log(data);
    return (
        <>
            <AppLayout>
                <AppLoading isOpen={isLoading} />
                <div className="w-full gap-2 flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-72">
                        <NavbarConfig />
                    </div>
                    <div className="w-full md:flex-grow h-full">
                        <div className="app-container-fade w-full h-full p-2">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
};

export default Configuration;