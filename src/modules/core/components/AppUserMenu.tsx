import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import profileImg from "@/assets/img/profile.png";
import { useAuthStore } from "@/store/auth";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from '@mui/icons-material/Settings';
import AppAvatar from "./AppAvatar";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";
import { useAuthLogout } from "@/modules/web/hooks/auth/hooksAuth";
import AppLoading from "./AppLoading";
import AppsIcon from '@mui/icons-material/Apps';

const AppUserMenu = () => {
    const { user, isLogin, isAdmin } = useAuthStore((state) => state);
    const [t] = useTranslation('core');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { logout } = useAuthLogout(logOutFn);
    const navigate = useNavigate();
    const logoutStore = useAuthStore((state) => state.logout);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (isLogin) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        navigate(webRoutes.dashboard_user.path.replace(':username', user?.username ?? '___'));
    };

    const handleLogOut = () => {
        logout.mutate();
        logoutStore();
        navigate(webRoutes.home.path);
    };

    const handleConfig = () => {
        handleClose();
        navigate(webRoutes.config_user.path.replace(':username', user?.username ?? ''));
    };

    const handleAdministration = () => {
        handleClose();
        navigate(webRoutes.dashboard_admin.children.statistics.uri());
    };

    function logOutFn() {
        logoutStore();
        navigate(webRoutes.home.path);
    };


    return (
        <>
            <AppLoading isOpen={logout.isPending} />
            <Tooltip title={t('mobile.menu.account-settings')}

            >
                <IconButton sx={{ margin: 0, padding: 0.5 }}
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <AppAvatar size="small" />

                    {
                        isLogin &&
                        <ExpandMoreIcon />
                    }
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                disableScrollLock
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                <MenuItem onClick={handleProfile}>
                    <Avatar
                        src={user?.photo || profileImg}
                    /> {t('menu.profile')}
                </MenuItem>
                <MenuItem onClick={handleConfig} className="flex gap-3 items-center">
                    <SettingsIcon />
                    {t('mobile.menu.configuration')}
                </MenuItem>
                {
                    isAdmin &&
                    <MenuItem onClick={handleAdministration} className="flex gap-3 items-center">
                        <AppsIcon />
                        {t('mobile.menu.administration')}
                    </MenuItem>
                }
                <Divider />
                <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    {t('mobile.menu.logout')}
                </MenuItem>
            </Menu>
        </>
    );
};


export default AppUserMenu;