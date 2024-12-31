import { Route } from "react-router-dom";
import { CustomRoutes } from "./CustomRoutes";
import { webRoutes } from "@/config/webRoutes";
import Home from "@web/pages/Home/Home";
import Login from "@web/pages/Login/Login";
import AuthPages from "./AuthPages";
import MiddlewareLogin from "./MiddlewareLogin";
import ViewPosts from "@/modules/web/pages/Posts/ViewPosts";

const RootRoutes = () => {
  return (
    <>
      <CustomRoutes>
        <Route path={webRoutes.home.path} element={<Home />} />
        <Route element={<MiddlewareLogin />}>
          <Route path={webRoutes.login.path} element={<Login />} />
        </Route>
        <Route path={webRoutes.view_posts.path} element= {<ViewPosts />} />
        <Route element={<AuthPages />}>
          <Route path="/test-login" element={<>paso login</>} />
        </Route>
      </CustomRoutes>
    </>
  );
};

export default RootRoutes;
