import { Route } from "react-router-dom";
import { CustomRoutes } from "./CustomRoutes";
import { webRoutes } from "@/config/webRoutes";
import Home from "@web/pages/Home/Home";
import Login from "@web/pages/Login/Login";
import AuthPages from "./AuthPages";

const RootRoutes = () => {
  return (
    <>
      <CustomRoutes>
        <Route path={webRoutes.home.path} element={<Home />} />
        <Route path={webRoutes.login.path} element={<Login />} />
        <Route element={<AuthPages />}>
          <Route path="/test-login" element={<>paso login</>} />
        </Route>
      </CustomRoutes>
    </>
  );
};

export default RootRoutes;
