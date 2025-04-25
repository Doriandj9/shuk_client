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
import Account from "@/modules/web/pages/User/Partials/Account";
import Profile from "@/modules/web/pages/User/Partials/Profile";
import Security from "@/modules/web/pages/User/Partials/Security";
import Password from "@/modules/web/pages/User/Partials/Password";
import AuthAdmin from "./AuthAdmin";
import { StatisticsAdmin } from "@/modules/admin/pages/StatisticsAdmin";
import { DashboardAdmin } from "@/modules/admin/pages/DashboardAdmin";
import { Categories } from "@/modules/admin/pages/Categories/Categories";
import { Interest } from "@/modules/web/pages/Home/Interest";
import { CompleteRegisterMail } from "@/modules/web/pages/Login/components/CompleteRegister";

const RootRoutes = () => {
  return (
    <>
      <CustomRoutes>
        <Route path={webRoutes.home.path} element={<Home />} />
        <Route path={webRoutes.interest.path} element={<Interest />} />


        <Route element={<MiddlewareLogin />}>
          <Route path={webRoutes.login.path} element={<Login />} />
          <Route path={webRoutes.complete_register.path} element={<CompleteRegisterMail />} />
        </Route>

        <Route path={webRoutes.view_posts.path} element={<ViewPosts />} />
        <Route path={webRoutes.dashboard_user.path} element={<DashboardUser />} />

        <Route element={<AuthPages />}>
          <Route path={webRoutes.config_user.path} element={<Configuration />} >
            <Route index element={<Account />} />
            <Route path={webRoutes.config_user.children.account.path} index element={<Account />} />
            <Route path={webRoutes.config_user.children.password.path} index element={<Password />} />
            <Route path={webRoutes.config_user.children.profile.path} element={<Profile />} />
            <Route path={webRoutes.config_user.children.privacy_security.path} element={<Security />} />
          </Route>
        </Route>

        {/* routes for admin */}

        <Route element={<AuthAdmin />}>
          <Route path={webRoutes.dashboard_admin.path} element={<DashboardAdmin />}>
            <Route element={<StatisticsAdmin />} index/>
            <Route element={<StatisticsAdmin />} path={webRoutes.dashboard_admin.children.statistics.path} />
            <Route element={<Categories />} path={webRoutes.dashboard_admin.children.categories.path} />
          </Route>
        </Route>

        <Route path="*" element={<>404</>} />

      </CustomRoutes>
    </>
  );
};

export default RootRoutes;
