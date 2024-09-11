import { app } from '@/config/app';
import ErrorBoundary from '@core/classes/ErrorBoundary';
import { useThemeMode } from '@/store/themeMode';
import {Children} from '@core/@types/core';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Routes } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
    barColors: {
        "0": app.colors.primary,
    },
    shadowBlur: 5,
    barThickness: 4
});

export const CustomRoutes: React.FC<Children> = ({children}) => {
    const [progress, setProgress] = useState(false);
    const [prevLoc, setPrevLoc] = useState("");
    const location = useLocation();
    const {theme} = useThemeMode((state) => state);

    useEffect(() => {
        setPrevLoc(location.pathname);
        if(location.pathname !== prevLoc){
            setProgress(true);
        }
     }, [location]);
  
     useEffect(() => {
        setProgress(false);
     }, [prevLoc]);

     const changeTheme = useCallback(() => {
        TopBarProgress.config({
            barColors: {
                "0": theme === 'dark' ? app.colors.secondary : app.colors.primary,
            },
            shadowBlur: 5,
            barThickness: 4
        });
     },[theme]);
     
     useEffect(() => {
        changeTheme();
     },[changeTheme]);
    return (
        <>
        {progress && <TopBarProgress />}
        <ErrorBoundary>
            <Routes>
                { children }
            </Routes>
        </ErrorBoundary>
        </>
    );
};