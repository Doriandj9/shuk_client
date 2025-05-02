import { motion } from "framer-motion";
import AppSearchHome from "../../components/AppSearchHome";
import { useThemeMode } from "@/store/themeMode";
import { ThemeOptions } from "@/config/@types/app";
import { useTranslation } from "react-i18next";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AppMenuContent from "../../components/AppMenuContent";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AppAvatar from "../../components/AppAvatar";
import { useAuthStore } from "@/store/auth";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import React from "react";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";
import { useAuthLogout } from "@/modules/web/hooks/auth/hooksAuth";
import AppNavbar from "../../components/AppNavbar";
import AppsIcon from '@mui/icons-material/Apps';


type MenuMobileProps = {
    handleShowMovil: CallableFunction;
    mobileLogin: CallableFunction;
};

const MenuMobile: React.FC<MenuMobileProps> = ({ handleShowMovil, mobileLogin }) => {
    const { theme: themeMode, update: updateThemeMode } = useThemeMode((state) => state);
    const [t, i18n] = useTranslation('core');
    const navigate = useNavigate();
    const { isLogin, user, logout: logoutStore, isAdmin } = useAuthStore((state) => state);
    const { logout } = useAuthLogout(logOutFn);



    const handleModeDark = (mode: ThemeOptions): void => {
        updateThemeMode(mode);
    };

    const handleProfile = () => {
        if (!user) return;
        handleShowMovil();
        navigate(webRoutes.dashboard_user.path.replace(':username', user?.username ?? '___'));
    };

    const handleLogOut = () => {
        logout.mutate();
        logoutStore();
        navigate(webRoutes.home.path);
    };

    const handleConfig = () => {
        handleShowMovil();
        navigate(webRoutes.config_user.path.replace(':username', user?.username ?? ''));

    };

    const handleAdministration = () => {
        handleShowMovil();
        navigate(webRoutes.dashboard_admin.children.statistics.uri());
    };

    function logOutFn() {
        logoutStore();
        navigate(webRoutes.home.path);
    };

    return (
        <>
            <div className="menu-mobile">
                <motion.div
                    className="option-menu"
                    initial={{ x: "100vw", y: "100vh" }}
                    animate={{ x: 0, y: 0 }}
                    exit={{ x: "100vw", y: "100vh" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <div className="w-full h-full flex flex-col p-2">
                        {/* Header */}
                        <div className="flex py-2">
                            <div className="w-20 flex items-center justify-center">
                                <h2 className="text text-mode-primary text-2xl font-black">
                                    {t("menu.menu")}
                                </h2>
                            </div>
                            <div className="flex-grow">
                                <div className="w-full h-full flex justify-center">
                                    <AppSearchHome mobile onClose={handleShowMovil} />
                                </div>
                            </div>

                            <div className="w-32 flex items-center">
                                <div className="">
                                    <ul className="flex justify-around items-center">
                                        <li>
                                            {themeMode === "dark" ? (
                                                <button
                                                    onClick={() => handleModeDark("light")}
                                                >
                                                    <DarkModeIcon className="text-mode-secondary pointer-events-none" />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleModeDark("dark")}
                                                >
                                                    <Brightness7Icon className="text-mode-secondary pointer-events-none" />
                                                </button>
                                            )}
                                        </li>
                                        <li className="">
                                            <AppMenuContent
                                                i18n={i18n.changeLanguage}
                                                mobile
                                            />
                                        </li>
                                        <li>
                                            <IconButton onClick={() => handleShowMovil()}>
                                                <HomeIcon className="text-mode-secondary" />
                                            </IconButton>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Options */}

                        <div>
                            <div className="px-2">
                                <div className="app-container-fade w-full min-h-28">
                                    <h3 className="text-mode-slate text-center text-sm pt-1">
                                        {t("menu.profile")}
                                    </h3>
                                    <div className="flex justify-center gap-2 items-center">
                                        <IconButton sx={{ padding: 0, margin: 0 }} onClick={handleProfile}>
                                            <AppAvatar user={null} />
                                        </IconButton>
                                        {isLogin && (
                                            <p className="text-mode-white">
                                                {user?.full_name}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mt-1 flex justify-center items-center flex-wrap">
                                        {isLogin ? (
                                            <>
                                                <div>
                                                    <IconButton color="secondary" onClick={handleConfig}>
                                                        <ManageAccountsIcon />
                                                        <span className="text-mode-primary text-xs">
                                                            {t("mobile.menu.configuration")}
                                                        </span>
                                                    </IconButton>
                                                </div>
                                                {
                                                    isAdmin &&
                                                    <div>
                                                        <IconButton onClick={handleAdministration}
                                                            color="info">
                                                            <AppsIcon />
                                                            <span className="text-mode-primary text-xs">
                                                                {t('mobile.menu.administration')}
                                                            </span>
                                                        </IconButton>
                                                    </div>
                                                }
                                                <div>
                                                    <IconButton color="error" onClick={handleLogOut}>
                                                        <LogoutIcon />
                                                        <span className="text-mode-primary text-xs">
                                                            {t("mobile.menu.logout")}
                                                        </span>
                                                    </IconButton>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <IconButton color="secondary" onClick={() => mobileLogin()}>
                                                        <span className="text-sm text-mode-primary">
                                                            {t("mobile.menu.login")}
                                                        </span>
                                                        <LoginIcon />
                                                    </IconButton>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 app-container-fade flex-grow">
                            <AppNavbar onClose={handleShowMovil} isMobile />
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};


export default MenuMobile;