import { Children } from "@/modules/core/@types/core";
import { NotFound } from "@/modules/core/components/NotFound";
import { useAuthStore } from "@/store/auth";
import { Outlet } from "react-router-dom";

const AuthPages: React.FC<Children> = () => {
    const {isLogin} = useAuthStore((state) => state);

    if(!isLogin){

        return (
            <>
                <NotFound />
            </>
        );
    }

    return (
        <>
            <Outlet />
        </>
    );
};


export default AuthPages;