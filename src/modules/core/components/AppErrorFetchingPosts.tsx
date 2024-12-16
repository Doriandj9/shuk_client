import { AxiosError } from "axios";
import React from "react";
import imgNotFound from '@/assets/img/undraw/undraw_not_found_re_bh2e.svg';
import { motion } from 'framer-motion';
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

type AppErrorFetchingPostsProps = {
    error: AxiosError | Error
}

const AppErrorFetchingPosts: React.FC<AppErrorFetchingPostsProps> = ({ error }) => {
    const [t] = useTranslation('core');
    let message = null;
    if (error instanceof Error) {
        message = t('messages.errors.post.server');
    }
    if (error instanceof AxiosError) {
        message = t('messages.errors.post.server');
    }

    const handleReload = () => {
        location.reload();
    };
    return (
        <>
            <div className="app-container-fade text-sm app-container-post min-h-40 p-2 mt-2">
                <div className="h-40 flex justify-center items-center flex-col gap-2">
                    <p className="text-mode-primary">
                        {
                            message
                        }
                    </p>
                    <div className="bg-mode-black rounded-xl">
                        <Button
                        onClick={handleReload}
                         sx={{ position: 'relative' }}>
                            <motion.img
                                src={imgNotFound}
                                className="w-24 h-24"
                                initial={{
                                    scale: 1
                                }}
                                whileHover={{ scale: 1, }}
                                animate={{
                                    scale: 1.025,
                                    transition: {
                                        duration: 1.5,
                                        ease: 'backInOut',
                                        repeat: Infinity
                                    },
                                }}
                            >

                            </motion.img>
                            <motion.div
                                className="absolute top-0 normal-case"
                                initial={{ x: 0, y: 0 }}
                                animate={{
                                    x: '4.5rem',
                                    transition: { duration: 1, ease: 'easeInOut' },
                                    rotate: -12
                                }}
                            >
                                <span className="text-mode-primary bg-mode-comment p-2 rounded-xl">
                                    {t('messages.labels.post.click-here')}
                                </span>
                            </motion.div>
                        </Button>

                    </div>
                </div>
            </div>
        </>
    );
};


export default AppErrorFetchingPosts;