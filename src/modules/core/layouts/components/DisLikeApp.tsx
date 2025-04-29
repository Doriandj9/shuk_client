import { webRoutes } from "@/config/webRoutes";
import { useAppActionApp } from "@/modules/web/hooks/user/hook";
import { useAuthStore } from "@/store/auth";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AiOutlineDislike } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useAppToast } from "../../hooks/useAppToast";

export const DisLikeApp = ({ dislikes }: { dislikes: number }) => {
    const isLogin = useAuthStore((state) => state.isLogin);
    const navigate = useNavigate();
    const { action } = useAppActionApp('dislike');
    const { show } = useAppToast();
    const [t] = useTranslation('core');

    const clickLike = () => {
        if (!isLogin) {
            navigate(webRoutes.login.path);
        }
        action.mutate(undefined, {
            onSuccess() {
                show({ message: t('header.not like'), status: 'success' });

            }
        });
    };

    return (
        <>
            <IconButton sx={{ padding: 0 }} onClick={clickLike}>
                <AiOutlineDislike className="text-mode-primary w-4 h-4" />
            </IconButton>
            {
                dislikes !== 0 &&
                <Tooltip title={dislikes}>
                    <span className="text-[0.5rem]">{dislikes > 9999 ? '9999+' : dislikes}</span>
                </Tooltip>
            }
        </>
    );
};