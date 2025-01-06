import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import MoreVertIcon from '@mui/icons-material/MoreHoriz';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";
import { PostData } from "@/modules/web/hooks/post/PostI";
import AppEventClickShared from "./AppEventClickShared";

type AppMenuOpPostsProps = {
    post: PostData;
};

const AppMenuOpPosts: React.FC<AppMenuOpPostsProps> = ({ post }) => {
    const [t] = useTranslation('core');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewPost = () => {
        navigate(webRoutes.view_posts.path.replace(':id', String(post.id)));
    };

    return (
        <>
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

                    <MenuItem sx={{ borderBottom: '0.5px solid #ccc' }} onClick={handleClose} disabled={post.is_temp}>
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
                <MenuItem sx={{ borderBottom: '0.5px solid #ccc' }} onClick={handleClose} disabled={post.is_temp}>
                    <Typography variant="subtitle2">
                        {t('messages.labels.post.hidden')}
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose} disabled={post.is_temp}>
                    <Typography variant="subtitle2" color="error">
                        {t('messages.labels.post.delete')}
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default AppMenuOpPosts;