import { Route } from "react-router-dom";
import { CustomRoutes } from "./CustomRoutes";
import { webRoutes } from "@/config/webRoutes";
import Home from "@web/pages/Home/Home";
import Login from "@web/pages/Login/Login";
import AuthPages from "./AuthPages";
import MiddlewareLogin from "./MiddlewareLogin";
import ViewPosts from "@/modules/web/pages/Posts/ViewPosts";
import DashboardUser from "@/modules/web/pages/User/Dasboard";
import Configuration from "@/modules/web/pages/User/Configuration";

const RootRoutes = () => {
  return (
    <>
      <CustomRoutes>
        <Route path={webRoutes.home.path} element={<Home />} />
        <Route element={<MiddlewareLogin />}>
          <Route path={webRoutes.login.path} element={<Login />} />
        </Route>
        <Route path={webRoutes.view_posts.path} element={<ViewPosts />} />
        <Route path={webRoutes.dashboard_user.path} element={<DashboardUser />} />
        <Route element={<AuthPages />}>
        <Route path={webRoutes.config_user.path} element={<Configuration />} />
        </Route>
      </CustomRoutes>
    </>
  );
};

export default RootRoutes;
