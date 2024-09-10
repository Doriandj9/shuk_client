import { Route } from "react-router-dom";
import { CustomRoutes } from "./CustomRoutes";
import { webRoutes } from "@/config/webRoutes";
import Home from "@web/pages/Home/Home";
import Login from "@web/pages/Login/Login";



const RootRoutes = () => {

    return (
           <CustomRoutes>
            <Route path={webRoutes.home.path}  element={<Home />} />
            <Route path={webRoutes.login.path} element={<Login />} />
           </CustomRoutes>
    );
};

export default RootRoutes;