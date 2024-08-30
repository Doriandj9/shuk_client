import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

type SearchHome = {
    mobile?: boolean;
};

const AppSearchHome: React.FC<SearchHome> = ({mobile}) => {
    const [t] = useTranslation("core");
    const [showSearch, setShowSearch] = useState(false);

    const handleShowSearch = () => {
        setShowSearch(!showSearch);
    };

    return (
        <React.Fragment>
            <div className="app-search-home hidden md:flex">
                <div>
                    <SearchIcon className="text-mode-secondary"  />
                </div>
                <input className="w-60" type="text" placeholder={t('header.search-placeholder')} />
            </div>

            <div className="flex md:hidden justify-center">
                    <IconButton onClick={() => handleShowSearch()}> <SearchIcon className={`${ mobile ? 'text-mode-secondary' : 'text-mode-primary'}`} sx={{width: 30, height: 30}} /> </IconButton>
            </div>

            <AnimatePresence>
                {
                    showSearch && 
                    <motion.div className="option-menu z-10"
                        initial={{ x: '100vw'}} 
                        animate={{ x: 0, y: 0 }} 
                        exit={{ x: '100vw'}} 
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                            <div className="w-100 h-100 bg-white dark:bg-slate-800">
                                <div className="flex gap-0 items-center pt-4 pr-4 pb-4">
                                <div>
                                    <IconButton sx={{padding: 0, margin: 0}} onClick={() => handleShowSearch()}>
                                        <KeyboardArrowLeftIcon className="text-mode-secondary" fontSize="large"  />
                                    </IconButton>
                                </div>
                                <div className="app-search-home w-full">
                                    <input className="w-full" type="text" placeholder={t('header.search-placeholder')} />
                                </div>
                                </div>
                            </div>
                    </motion.div>
                }
            </AnimatePresence>
        </React.Fragment>
    );
};


export default AppSearchHome;