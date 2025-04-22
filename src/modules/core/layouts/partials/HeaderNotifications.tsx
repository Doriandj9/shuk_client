import { Badge, IconButton, Menu, Tooltip } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRef, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useTranslation } from "react-i18next";
import Fade from '@mui/material/Fade';
import UserNotification from "../../components/UserNotification";
import { useGetNotificationsUser, usePutNotifiesUserAllDraft } from "@/modules/web/hooks/notifications/hook";
import AppErrorFetchingPosts from "../../components/AppErrorFetchingPosts";
import { AppLoadingNotificationUser } from "../../components/AppLoadinNotificationUser";
import { AppNotNotifies } from "../../components/AppNotNotifies";
import { DocStatus } from "@/config/app";
import { useTimeFormatPost } from "../../hooks/useTimesFormats";
import InfinityScrollElement from "../../components/InfinityScrollElement";


export const HeaderNotifications = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [t] = useTranslation('core');
    const isLogin = useAuthStore((state) => state.isLogin);
    const user = useAuthStore((state) => state.user);
    const { format } = useTimeFormatPost('full');
    const { put } = usePutNotifiesUserAllDraft(user?.id);
    const refElement = useRef<HTMLDivElement>(null);

    const { data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useGetNotificationsUser({
        user_id: user?.id
    });
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (isLogin) {
            put.mutate({ doc_status: DocStatus.PENDING_NOTIFY });
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Tooltip title={t('mobile.menu.notifications')}

            >
                <IconButton sx={{ margin: 0, padding: 0.5 }}
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu-notifications' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Badge color="primary" badgeContent={data?.pages[0]?.total_draft} max={99}>
                        <NotificationsIcon className="text-mode-primary" />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu-notifications"
                open={open}
                onClose={handleClose}
                disableScrollLock
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                TransitionComponent={Fade}
                slotProps={
                    {paper: {
                            ref: refElement,
                        }
                    }
                }
            >
                <li>
                    <div className="w-96 p-2">
                        <div className="font-bold text-sm text-mode-white mb-4">
                            {t('mobile.menu.notifications')}
                        </div>

                        <InfinityScrollElement
                            refElement={refElement}
                            render={(scroll) => {
                                if (scroll.action && !isFetching && status !== 'pending' && !isFetchingNextPage) {
                                    scroll.changeStatus({ action: false });
                                    fetchNextPage();
                                }

                                return (
                                    <div className="flex flex-col gap-2 md:items-center">
                                        {status && data?.pages.map(({ data: notifications }) => {

                                            return notifications.map((notification) => (
                                                <UserNotification
                                                    key={notification.id}
                                                    notification={notification}
                                                    timeAgo={format(notification.created_at ?? null)}
                                                    onClose={handleClose}
                                                />
                                            ));
                                        })}
                                        {status == 'error' && (<AppErrorFetchingPosts error={error} />)}
                                        {status != 'error' && status == 'pending' && (<AppLoadingNotificationUser />)}
                                        {status != 'error' && isFetchingNextPage && (<AppLoadingNotificationUser />)}
                                        {status !== 'error' && !hasNextPage && (
                                            <div className="mt-4">
                                                <AppNotNotifies />
                                            </div>
                                        )}
                                    </div>
                                );
                            }}
                        />
                    </div>
                </li>

            </Menu>
        </>
    );
};
