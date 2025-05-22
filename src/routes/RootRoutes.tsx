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
import { DashboardAdmin } from "@/modules/admin/pages/DashboardAdmin";
import { Categories } from "@/modules/admin/pages/Categories/Categories";
import { Interest } from "@/modules/web/pages/Home/Interest";
import { CompleteRegisterMail } from "@/modules/web/pages/Login/components/CompleteRegister";
import { ForwardPassword } from "@/modules/web/pages/Login/components/ForwardPassword";
import { RecoveryPassword } from "@/modules/web/pages/Login/components/RecoveryPassword";
import { Users } from "@/modules/admin/pages/Users/UsersAdmin";
import { StatisticsAdmin } from "@/modules/admin/pages/StatisticsAdmin/StatisticsAdmin";
import { Privacy } from "@/modules/web/pages/Home/Privacy";
import { DeletedData } from "@/modules/web/pages/Home/DeletedData";
import { NotFound } from "@/modules/core/components/NotFound";
import { NotSendEmails } from "@/modules/web/pages/Home/NotSendEmail";
import { TermsOfService } from "@/modules/web/pages/Home/Terms";

const RootRoutes = () => {
  return (
    <>
      <CustomRoutes>
        <Route path={webRoutes.home.path} element={<Home />} />
        <Route path={webRoutes.interest.path} element={<Interest />} />
        <Route path={webRoutes.not_mails.path} element={<NotSendEmails />} />
        <Route path={webRoutes.privacy.path} element={<Privacy />} />
        <Route path={webRoutes.terms_of_service.path} element={<TermsOfService />} />
        <Route path={webRoutes.delete_data.path} element={<DeletedData />} />


        <Route element={<MiddlewareLogin />}>
          <Route path={webRoutes.login.path} element={<Login />} />
          <Route path={webRoutes.complete_register.path} element={<CompleteRegisterMail />} />
          <Route path={webRoutes.forward_password.path} element={<ForwardPassword />} />
          <Route path={webRoutes.recovery_password.path} element={<RecoveryPassword />} />
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
            <Route element={<Users />} path={webRoutes.dashboard_admin.children.users.path} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />

      </CustomRoutes>
    </>
  );
};

export default RootRoutes;
