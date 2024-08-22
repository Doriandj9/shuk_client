import React, { useState } from "react";
import { Children } from "../@types/core";
import { useEffect, useMemo } from "react";
import {useThemeMode} from '@/store/themeMode';
import { Avatar, createTheme, CssBaseline, IconButton, ThemeProvider, useMediaQuery } from "@mui/material";
import { appTheme } from '@/config/app';
import logo from '@/assets/img/shuk_logo.png';
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import AppSearchHome from "../components/AppSearchHome";
import { useTranslation } from "react-i18next";
import LoginIcon from '@mui/icons-material/Login';
import { Link } from "react-router-dom";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { MenuOutlined } from '@mui/icons-material';
import { ThemeOptions } from '@/config/@types/app';
import AppMenuContent from '@core/components/AppMenuContent';
import { motion, AnimatePresence } from "framer-motion";
import HomeIcon from '@mui/icons-material/Home';
import profileImg from '@/assets/img/profile.png';

const AppLayout: React.FC<Children> = ({ children }) => {

    const [t,i18n] = useTranslation('core');
    const [showMovil, setShowMovil] = useState<boolean>(true);

    const {theme:themeMode, update: updateThemeMode} = useThemeMode((state) => state);
    const prefersDarkMode: boolean = useMediaQuery('(prefers-color-scheme: dark)');

    const themeApp = useMemo(() => createTheme({
            ...appTheme,
            palette: {
                ...appTheme.palette,
                mode: themeMode === 'system' || themeMode === 'light' ? 'light' : 'dark'
            }
    }),[themeMode]);


    const handleModeDark = (mode: ThemeOptions ): void  => {
        updateThemeMode(mode);
    };

    const handleShowMovil = () => {
        setShowMovil(!showMovil);
    };

    useEffect(() => {
        if(!localStorage.appTheme) {
            if(prefersDarkMode){
                updateThemeMode('dark');
            } else {
                updateThemeMode('light');
            }
        }
    }, [prefersDarkMode, updateThemeMode]);


    return (
        <React.Fragment>
            <ThemeProvider theme={themeApp}>
                <CssBaseline />
                <div id="body-main" className={`app-body ${themeMode}`}>
                    <header role="banner" className="h-16">
                        <div className="app-banner">
                            {/* 
                                -
                                -
                                - 
                                - section for logo and menu
                                -
                                -
                                -
                            */}
                            <div className="flex py-2 flex-row max-w-32 w-32  md:max-w-60 md:w-60 justify-center gap-4 items-center">
                                <div className="hidden md:block">
                                    <img src={logo} alt="LOGO SHUK" className="w-32 h-10 mt-2" />
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex flex-col justify-center items-center w-6 mt-2">
                                        <AiOutlineLike  className="w-4 h-4" />
                                        <span className="text-[0.5rem]">999+</span>
                                    </div>
                                    <div className="flex flex-col justify-center items-center w-6 mt-2">
                                        <AiOutlineDislike  className="w-4 h-4" />
                                        <span className="text-[0.5rem]">999+</span>
                                    </div>
                                </div>
                            </div>
                                {/* 
                                    -
                                    -
                                    -
                                    - section for search
                                    -
                                    -
                                    -                            
                                */}
                            <div className="flex-grow flex justify-center">
                                <AppSearchHome />
                            </div>
                            {/* 
                                -
                                -
                                -
                                -
                                - section for profile
                                -
                                -
                                -
                                -
                            */}

                            <div className="min-w-30 md:min-w-60 flex">
                               <div className="">
                                    <ul className="flex gap-0 md:gap-2 items-center">
                                        <li>
                                            
                                                {
                                                  themeMode === 'dark' 
                                                  ?
                                                  <button onClick={() => handleModeDark('light')}>
                                                    <DarkModeIcon className="text-mode-slate pointer-events-none"  />
                                                  </button>
                                                  :
                                                  <button onClick={() => handleModeDark('dark')}>
                                                      <Brightness7Icon className="text-mode-slate pointer-events-none" />
                                                  </button>
                                                }
                                        </li>
                                        <li className="">
                                            <AppMenuContent i18n={i18n.changeLanguage} />
                                        </li>
                                        <li className="hidden md:block">
                                            <Link to={'/'} className="text-sm text-mode-slate flex items-center gap-1">
                                            <LoginIcon className="text-mode-slate pointer-events-none" />
                                                {t('header.login')}
                                            </Link>
                                        </li>
                                        <li className="hidden md:block">
                                            <IconButton>
                                                <Avatar
                                                        alt="Remy Sharp"
                                                        src={profileImg}
                                                        sx={{width: 24, height: 24}}
                                                    />
                                            </IconButton>
                                        </li>
                                    </ul>
                               </div>
                               <div className="block md:hidden">
                                 <IconButton onClick={() => handleShowMovil()}>
                                    <MenuOutlined />
                                 </IconButton>
                               </div>
                            </div>
                                {/* Movil menu */}

                        </div>
                        {/* Movil menu drag */}
                        <AnimatePresence>
                        {
                            !showMovil &&
                            <div className="menu-mobile">
                                <motion.div
                                className="option-menu"
                                initial={{ x: '100vw', y: '100vh' }} 
                                animate={{ x: 0, y: 0 }} 
                                exit={{ x: '100vw', y: '100vh' }} 
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }} 
                                >
                                    <div className="w-100 h-100 flex flex-col">
                                        {/* Header */}
                                        <div className="flex py-2">
                                            <div className="w-20 flex items-center justify-center">
                                                <h2 className="text text-mode-primary text-2xl font-black">{t('menu.menu')}</h2>
                                            </div>
                                            <div className="flex-grow">
                                                <div className="w-full h-full flex justify-center">
                                                    <AppSearchHome />
                                                </div>
                                            </div>

                                            <div className="w-32 flex items-center">
                                                <div className="">
                                                    <ul className="flex justify-around items-center">
                                                        <li>
                                                            
                                                                {
                                                                themeMode === 'dark'
                                                                ?
                                                                <button onClick={() => handleModeDark('light')}>
                                                                    <DarkModeIcon className="text-mode-slate pointer-events-none"  />
                                                                </button>
                                                                :
                                                                <button onClick={() => handleModeDark('dark')}>
                                                                    <Brightness7Icon className="text-mode-slate pointer-events-none" />
                                                                </button>
                                                                }
                                                        </li>
                                                        <li className="">
                                                            <AppMenuContent i18n={i18n.changeLanguage} />
                                                        </li>
                                                        <li>
                                                        <IconButton onClick={() => handleShowMovil()}>
                                                            <HomeIcon />
                                                        </IconButton>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Options */}

                                        <div>
                                            <div className="px-2">
                                                <div className="app-container-fade w-full h-16">
                                                    <h3 className="text-mode-slate text-center text-sm pt-1">{t('menu.profile')}</h3>
                                                    <div className="flex justify-center gap-2 items-center">
                                                        <IconButton sx={{ padding: 0, margin: 0 }}>
                                                            <Avatar
                                                                alt="Remy Sharp"
                                                                src={profileImg}
                                                                sx={{width: 32, height: 32}}

                                                                />
                                                        </IconButton>

                                                        <p className="text-mode-white">Dorian Armijos Josue Gadvay</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        }
                        </AnimatePresence>                    
                    </header>

                    <main role="content" className="app-main">
                        <div className="w-1/4 hidden xl:block" />
                        <div className="app-navbar hidden xl:block">

                        </div>
                        <div className="flex-grow p-2 xl:p-4">
                            {children}
                        </div>
                        <div className="w-1/4 hidden md:block" />
                        <div className="app-navbar-right hidden md:block">
                        </div>
                    </main>


                </div>


            </ThemeProvider>
        </React.Fragment>
    );
};


export default AppLayout;