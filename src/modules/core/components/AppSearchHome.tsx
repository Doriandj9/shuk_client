import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { AppWebSearchPost } from "./AppWebSearhPost";
import { DisplaySearchPosts } from "./DisplaySearchPosts";

type SearchHome = {
    mobile?: boolean;
    onClose?: CallableFunction;
};

const AppSearchHome: React.FC<SearchHome> = ({ mobile,onClose }) => {
    const [t] = useTranslation("core");
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState<string|null>(null);

    const handleShowSearch = () => {
        setShowSearch(!showSearch);
    };

    return (
        <React.Fragment>
            <AppWebSearchPost />

            <div className="flex md:hidden justify-center">
                <IconButton onClick={() => handleShowSearch()}> <SearchIcon className={`${mobile ? 'text-mode-secondary' : 'text-mode-primary'}`} sx={{ width: 30, height: 30 }} /> </IconButton>
            </div>

            <AnimatePresence>
                {
                    showSearch &&
                    <motion.div className="option-menu z-10"
                        initial={{ x: '100vw' }}
                        animate={{ x: 0, y: 0 }}
                        exit={{ x: '100vw' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <div className="w-100 h-100 bg-white dark:bg-slate-800">
                            <div className="flex gap-0 items-center pt-4 pr-4 pb-4">
                                <div>
                                    <IconButton sx={{ padding: 0, margin: 0 }} onClick={() => handleShowSearch()}>
                                        <KeyboardArrowLeftIcon className="text-mode-secondary" fontSize="large" />
                                    </IconButton>
                                </div>
                                <div className="app-search-home w-full">
                                    <input className="w-full" type="text" placeholder={t('header.search-placeholder')} 
                                    value={search ?? ''}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }} />
                                </div>
                            </div>
                            <div className="h-screen max-h-screen overflow-y-auto p-2">
                                <h2 className="text-mode-slate front-semibold">
                                    {t('header.search-posts')}
                                </h2>
                                <DisplaySearchPosts searchText={search} onClose={() => onClose?.()} />
                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </React.Fragment>
    );
};


export default AppSearchHome;