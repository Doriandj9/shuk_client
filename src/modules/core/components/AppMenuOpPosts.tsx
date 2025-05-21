import { Button, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import MoreVertIcon from '@mui/icons-material/MoreHoriz';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";
import { PostData } from "@/modules/web/hooks/post/PostI";
import AppEventClickShared from "./AppEventClickShared";
import { useAuthStore } from "@/store/auth";
import { api } from "@/config/app";
import moment from "moment";
import { ModalEditPost } from "@/modules/web/components/ModalEditPost";
import { useUpdateUserConfig } from "@/modules/web/hooks/user/hook";
import { useAppToast } from "../hooks/useAppToast";
import AppModal from "./AppModal";
import { useUpdatePost } from "@/modules/web/hooks/post/hooks";
import { showError } from "../utilities/errors";

type AppMenuOpPostsProps = {
    post: PostData;
};

const AppMenuOpPosts: React.FC<AppMenuOpPostsProps> = ({ post }) => {
    const [t] = useTranslation('core');
    const [t_web] = useTranslation('web');
    const isAdmin = useAuthStore((state) => state.isAdmin);
    const user = useAuthStore((state) => state.user);
    const isLogin = useAuthStore((state) => state.isLogin);

    const { config } = useUpdateUserConfig({ id_post_hidden: parseInt(post.id as string) });
    const { show } = useAppToast();
    const [openModalHiddenPost, setOpenModalHiddenPost] = React.useState(false);
    const [openModalDeletePost, setOpenModalDeletePost] = React.useState(false);
    const { put } = useUpdatePost(post.id);

    const [openModalEditPost, setOpenModalEditPost] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDownloadImage = async () => {
        try {
            const request = await api.get(`picture?path=${post.img?.path}`);
            const response = await request.data;
            const link = document.createElement('a');
            link.href = 'data:image/png;base64,' + response?.data as string;
            link.download = post.img?.filename || moment().format('YYYYMMDD_HHmmss') + '.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            handleClose();
        } catch (er) {
            if (typeof er === 'object' && er) {
                const error: Error =
                {
                    message: Reflect.get(er, 'message') ?? 'Download Image',
                    name: Reflect.get(er, 'name') ?? 'Not Image',
                    cause: Reflect.get(er, 'cause'),
                    stack: Reflect.get(er, 'stack')
                };
                showError(error);
            }
        }

    };

    const handleCloseModalEditPost = () => {
        setOpenModalEditPost(false);
    };

    const handleViewPost = () => {
        navigate(webRoutes.view_posts.path.replace(':id', String(post.id)));
    };

    const handleHiddenPost = () => {
        const hiddenPost = user?.config?.hide_posts;
        if (!hiddenPost) {
            show({ message: t_web('descriptions.hidden-posts'), type: 'error' });
            handleCloseModalHiddenPost();
            return;
        }
        if (hiddenPost.id_posts.includes(post.id as string)) {
            show({ message: t_web('descriptions.post-already-hidden'), type: 'error' });
            handleCloseModalHiddenPost();
            return;
        }
        hiddenPost.id_posts.push(post.id as string);
        const data = { hide_posts: hiddenPost };
        config.mutate(data);
        handleCloseModalHiddenPost();
        handleClose();
    };

    const handleCloseModalHiddenPost = () => {
        setOpenModalHiddenPost(false);
    };

    const handleCloseDeleteModalPost = () => {
        setOpenModalDeletePost(false);
    };

    const handleDeleteModalPost = () => {
        put.mutate({ type: post.type_post, doc_status: 'DL' },
            {
                onSuccess() {
                    show({ message: t('messages.success.post.deleted'), status: 'success' });
                    handleCloseDeleteModalPost();
                    handleClose();
                },
                onError() {
                    show({ message: t('messages.errors.post.server'), status: 'error' });
                    handleCloseDeleteModalPost();
                }
            }
        );
    };
    return (
        <>
            <ModalEditPost post={post} open={openModalEditPost} onClose={handleCloseModalEditPost} />

            <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                disableScrollLock
            >
                <MenuItem sx={{ borderBottom: '0.5px solid #ccc' }} onClick={handleViewPost} disabled={post.is_temp}>
                    <Typography variant="subtitle2">
                        {t('messages.labels.post.view-post')}
                    </Typography>
                </MenuItem>
                {
                    post.your_post &&

                    <MenuItem sx={{ borderBottom: '0.5px solid #ccc' }} onClick={() => {
                        setOpenModalEditPost(true);
                        handleClose();
                    }} disabled={post.is_temp}>
                        <Typography variant="subtitle2">
                            {t('messages.labels.post.edit')}
                        </Typography>
                    </MenuItem>

                }
                <AppEventClickShared post={post}
                    render={({ open }) => (
                        <MenuItem sx={{ borderBottom: '0.5px solid #ccc' }} onClick={() => {
                            open();
                        }} disabled={post.is_temp}>
                            <Typography variant="subtitle2">
                                {t('messages.labels.post.shared')}
                            </Typography>
                        </MenuItem>
                    )}

                />
                {
                    (!post.is_temp && post.type_post === 'PI') &&
                    <MenuItem sx={{ borderBottom: '0.5px solid #ccc' }} onClick={handleDownloadImage} disabled={post.is_temp}>
                        <Typography variant="subtitle2">
                            {t('messages.labels.post.download-image')}
                        </Typography>
                    </MenuItem>
                }
                {
                    (isLogin && !post.your_post) &&
                    <MenuItem sx={{ borderBottom: '0.5px solid #ccc' }} onClick={() => {
                        setOpenModalHiddenPost(true);
                        handleClose();
                    }} disabled={post.is_temp}>
                        <Typography variant="subtitle2">
                            {t('messages.labels.post.hidden')}
                        </Typography>
                    </MenuItem>
                }
                {
                    (post.your_post || isAdmin && isLogin) &&
                    <MenuItem onClick={() => {
                        setOpenModalDeletePost(true);
                        handleClose();
                    }} disabled={post.is_temp}>
                        <Typography variant="subtitle2" color="error">
                            {t('messages.labels.post.delete')}
                        </Typography>
                    </MenuItem>
                }

            </Menu>



            <AppModal
                open={openModalHiddenPost}
                onClose={() => setOpenModalHiddenPost(false)}

            >
                <div>
                    <div className="app-container-fade rounded-none p-4 shadow-none">
                        {t('messages.labels.app.sure-continue')}
                    </div>
                    <div className="flex justify-end items-center w-full mt-4 gap-2">
                        <Button variant="contained" color="warning" onClick={handleCloseModalHiddenPost}>
                            {t('messages.labels.app.close')}
                        </Button>
                        <Button variant="contained" color="error" className="ml-2" onClick={handleHiddenPost}>
                            {t('messages.labels.post.hidden')}
                        </Button>
                    </div>
                </div>

            </AppModal>

            <AppModal
                open={openModalDeletePost}
                onClose={handleCloseDeleteModalPost}

            >
                <div>
                    <div className="app-container-fade rounded-none p-4 shadow-none">
                        {t('messages.labels.app.sure-continue')}
                    </div>
                    <div className="flex justify-end items-center w-full mt-4 gap-2">
                        <Button variant="contained" color="warning" onClick={handleCloseDeleteModalPost}>
                            {t('messages.labels.app.close')}
                        </Button>
                        <Button variant="contained" color="error" className="ml-2" onClick={handleDeleteModalPost}>
                            {t('messages.labels.post.delete')}
                        </Button>
                    </div>
                </div>

            </AppModal>
        </>
    );
};

export default AppMenuOpPosts;