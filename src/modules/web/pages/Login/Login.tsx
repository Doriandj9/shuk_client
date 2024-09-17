import AppLayout from "@core/layouts/AppLayout";
import { Children } from "@core/@types/core";
import ComponentChakra from "@/modules/core/components/ComponentChakra";
import HeaderImg from "./components/HeaderImg";
import HeaderContent from "./components/HeaderContent";
import LoginMail from "./components/LoginMail";
import AlternativeLogin from "./components/AlternativeLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { app } from "@/config/app";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState } from "react";
import RegisterMail from "./components/RegisterMail";

const Login: React.FC<Children> = () => {
  const [t] = useTranslation("web");
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleChangeRegister = () => {
    setIsRegister(!isRegister);
  };

  return (
    <>
      <AppLayout>
        <GoogleOAuthProvider
          clientId={app.oAuthIdGoogle || ''}
        >
          <ComponentChakra>
            <div className="app-container-fade w-full justify-center h-full">
              {!isRegister && (
                <motion.div
                  className="h-full app-container-fade rounded-xl"
                  initial={{ x: "200vw", y: "0px" }}
                  animate={{ x: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="w-full h-full flex-grow flex justify-center items-center">
                    <div className="w-full app-login-container">
                      <div className="app-login">
                        <HeaderImg />
                        <HeaderContent isRegister={isRegister} />
                        <LoginMail
                          handleChangeMode={() => handleChangeRegister()}
                        />
                        <div className="my-2">
                          <div className="flex items-center app-login-content gap-2">
                            <span className="flex-grow border-t border-slate-200 h-[1px]" />
                            <span className="text-slate-500 font-regular">
                              {t("login.labels.or").toUpperCase()}
                            </span>
                            <span className="flex-grow border-t border-slate-200 h-[1px]" />
                          </div>
                        </div>
                        <AlternativeLogin />
                        <div className="app-login-content text-center my-4">
                          <div className="flex gap-2 justify-center items-center">
                            <span className="text-mode-white-primary">
                              {t("login.labels.problems-login")}
                            </span>
                            <a className="text-blue-500 text-sm">
                              {t("login.labels.contact")}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {isRegister && (
                <motion.div
                  className="h-full app-container-fade  rounded-xl"
                  initial={{ x: "200vw", y: "0px" }}
                  animate={{ x: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="w-full h-full flex-grow flex justify-center items-center">
                    <div className="w-full app-login-container">
                      <div className="app-login">
                        <HeaderImg />
                        <HeaderContent isRegister={isRegister} />
                        <RegisterMail handleChangeMode={handleChangeRegister} />
                        <div className="my-2">
                          <div className="flex items-center app-login-content gap-2">
                            <span className="flex-grow border-t border-slate-200 h-[1px]" />
                            <span className="text-slate-500 font-regular">
                              {t("login.labels.or").toUpperCase()}
                            </span>
                            <span className="flex-grow border-t border-slate-200 h-[1px]" />
                          </div>
                        </div>
                        <AlternativeLogin />
                        <div className="app-login-content text-center my-4">
                          <div className="flex gap-2 justify-center items-center">
                            <span className="text-mode-white-primary">
                              {t("login.labels.problems-login")}
                            </span>
                            <a className="text-blue-500 text-sm">
                              {t("login.labels.contact")}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </div>
          </ComponentChakra>
        </GoogleOAuthProvider>
      </AppLayout>
    </>
  );
};

export default Login;
