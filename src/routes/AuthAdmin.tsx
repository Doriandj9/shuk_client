import { Children } from "@/modules/core/@types/core";
import { NotFound } from "@/modules/core/components/NotFound";
import { useAuthStore } from "@/store/auth";
import { Outlet } from "react-router-dom";

const AuthAdmin: React.FC<Children> = () => {
    const {isLogin, isAdmin} = useAuthStore((state) => state);

    if(!isLogin || !isAdmin){

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


export default AuthAdmin;