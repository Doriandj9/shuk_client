import imgPost from '@/assets/img/undraw_wall_post_re_y78d.svg';
import { Box, Modal } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import Grid from '@mui/material/Grid2';
import AppItem from './AppItem';




const AppNewPost = () => {
    const [t] = useTranslation('core');
    const [isOpen, setIsOpen] = useState(false);


    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Modal
                sx={{ position: 'fixed', top: 0, left: 0 }}
                open={isOpen}
            >
                <Box sx={{ flexGrow: 1 }}>
                <span onClick={handleClose} className='absolute top-0 right-0'>x</span>
                    <Grid container spacing={2}>
                        <Grid size={8}>
                            <AppItem>size=8</AppItem>
                        </Grid>
                        <Grid size={4}>
                            <AppItem>size=4</AppItem>
                        </Grid>
                        <Grid size={4}>
                            <AppItem>size=4</AppItem>
                        </Grid>
                        <Grid size={8}>
                            <AppItem>size=8</AppItem>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <div className="app-insert-post">
                <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 1.1 }}
                    drag="x"
                    onClick={() => handleOpen()}
                    dragConstraints={{ left: -100, right: 100 }} className="flex flex-col justify-center">
                    <img
                        src={imgPost}
                        className="w-12 h-12 ml-1" />
                    <span className="text-mode-secondary text-[0.50rem] md:text-[0.75rem] font-black">
                        {t('post.new')}
                    </span>
                </motion.button>
            </div>
        </>
    );
};


export default AppNewPost;