import { webRoutes } from "@/config/webRoutes";
import { useAppActionApp } from "@/modules/web/hooks/user/hook";
import { useAuthStore } from "@/store/auth";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAppToast } from "../../hooks/useAppToast";
import { useTranslation } from "react-i18next";


export const LikeApp = ({ likes }: { likes: number }) => {
    const isLogin = useAuthStore((state) => state.isLogin);
    const navigate = useNavigate();
    const {action} = useAppActionApp('like');
    const {show} = useAppToast();
    const [t] = useTranslation('core');

    const clickLike = () => {
        if (!isLogin) {
            navigate(webRoutes.login.path);
        }
        action.mutate(undefined, {
            onSuccess(){
                show({message: t('header.thanks-like'),status: 'success'});
            }
        });
    };

    return (
        <>
            <IconButton sx={{ padding: 0 }} onClick={clickLike}>
                <AiOutlineLike className="text-mode-primary w-4 h-4" />
            </IconButton>
            {
                likes !== 0 &&
                <Tooltip title={likes}>
                    <span className="text-[0.5rem]">{likes > 9999 ? '9999+' : likes}</span>
                </Tooltip>
            }
        </>
    );
};