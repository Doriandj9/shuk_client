import { Children } from "@/modules/core/@types/core";
import { useAuthStore } from "@/store/auth";
import { Outlet } from "react-router-dom";

const AuthPages: React.FC<Children> = () => {
    const {isLogin} = useAuthStore((state) => state);

    if(!isLogin){

        return (
            <>
                <p>No logueador</p>
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