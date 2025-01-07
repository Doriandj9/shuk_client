import AppLayout from "@/modules/core/layouts/AppLayout";
import { useParams } from "react-router-dom";
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
                <div className="w-full gap-2 flex flex-col md:flex-row">
                    <div>
                        <NavbarConfig />
                    </div>
                    <div>
                        s
                    </div>
                </div>
            </AppLayout>
        </>
    );
};

export default Configuration;