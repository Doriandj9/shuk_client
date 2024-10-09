import { webRoutes } from "@/config/webRoutes";
import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet } from "react-router-dom";


const MiddlewareLogin = () => {
    const login = useAuthStore((state) => state.isLogin);

    if(login){
        return (<>
            <Navigate to={webRoutes.home.path} />
        </>);
    }

    return (
        <>
            <Outlet />
        </>
    );  
};


export default MiddlewareLogin;