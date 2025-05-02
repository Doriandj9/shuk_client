import { webRoutes } from "@/config/webRoutes";
import React, { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { appLoadImage } from "../utilities/img/convert";
import { useGetInfinityCategories } from "@/modules/admin/hooks/categories/hook";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import SubjectIcon from '@mui/icons-material/Subject';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfinityScrollElement from "./InfinityScrollElement";
import AppErrorFetchingPosts from "./AppErrorFetchingPosts";
import { AppLoadingNavbarCategory } from "./AppLoadingNavbarCategory";
import PersonIcon from '@mui/icons-material/Person';

export type AppNavbarProps = {
    isAdmin?: boolean;
    onClose?: CallableFunction;
    isMobile?: boolean;
};

const AppNavbar: React.FC<AppNavbarProps> = ({ isAdmin,isMobile,onClose }) => {
    const {
        data: categories,
        error,
        fetchNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useGetInfinityCategories();
    const [t] = useTranslation('web');
    const [t_core] = useTranslation('core');
    const refElement = useRef<HTMLDivElement>(null);


    const handleClose = () => {

        if (onClose) {
            onClose();
        }
    };


    if (isAdmin) {
        return (
            <>
                <div className="flex flex-col justify-between w-full h-full pt-16 overflow-x-auto bg-white dark:bg-slate-800">
                    <div className="h-[85vh] overflow-x-auto">
                        <div className="w-full border-t border-secondary dark:border-slate-400">
                            <h2 className="text-mode-white text-md">
                                <span className="border-b border-secondary dark:border-slate-400 inline-flex items-center gap-1">
                                    {t_core('menu.menu')}
                                </span>
                            </h2>
                            <ul className="p-2 flex flex-col">
                                <li>
                                    <NavLink to={`${webRoutes.dashboard_admin.path}`}
                                        className={"item-category-navbar"}
                                        onClick={() => { if (onClose) { onClose(); }; }}
                                    >
                                        <HomeIcon />
                                        {t_core('menu.home')}
                                    </NavLink>

                                </li>
                                <li>
                                    <NavLink to={`${webRoutes.dashboard_admin.children.statistics.path}`}
                                        className={({ isActive }) => isActive ? "item-category-navbar-active" : "item-category-navbar"}
                                        onClick={() => { if (onClose) { onClose(); }; }}
                                    >
                                        <BarChartIcon />
                                        {t('titles.reports')}
                                    </NavLink>

                                </li>
                                <li className="">
                                    <NavLink
                                        to={webRoutes.dashboard_admin.children.categories.uri()}
                                        onClick={() => handleClose()}
                                        className={({ isActive }) => isActive ? "item-category-navbar-active" : "item-category-navbar"}>
                                        <DynamicFeedIcon className="w-5 h-5 img-shadow" />
                                        {t('titles.categories')}
                                    </NavLink>
                                </li>

                                <li className="">
                                    <NavLink
                                        to={webRoutes.dashboard_admin.children.users.uri()}
                                        onClick={() => handleClose()}
                                        className={({ isActive }) => isActive ? "item-category-navbar-active" : "item-category-navbar"}>
                                        <PersonIcon className="w-5 h-5 img-shadow" />
                                        {t('titles.users')}
                                    </NavLink>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="h-[15vh] overflow-hidden border-t border-secondary dark:border-slate-400">
                        <div>

                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <React.Fragment>
            <div className={`flex flex-col justify-between w-full h-full ${isMobile ? "pt-2": "pt-16"} overflow-x-auto bg-white dark:bg-slate-800`}>
                <div className="h-[85vh]">
                    <div className="overflow-x-auto h-full  max-h-full overflow-y-auto" ref={refElement}>
                        <div className="w-full dark:border-slate-400">
                            <h2 className="text-mode-white text-md mt-2">
                                <span className="border-b border-secondary dark:border-slate-400 inline-flex items-center gap-1">
                                    <SubjectIcon className=" img-shadow" />
                                    {t('titles.categories')}
                                </span>
                            </h2>
                            <div className="" >
                                <ul className="flex flex-col px-2">

                                    {
                                        < InfinityScrollElement
                                            refElement={refElement}
                                            render={(scroll) => {
                                                if (scroll.action && !isFetching && status !== 'pending' && !isFetchingNextPage) {
                                                    scroll.changeStatus({ action: false });
                                                    fetchNextPage();
                                                }

                                                return (
                                                    <>
                                                        {status && categories?.pages.map(({ data }) => {

                                                            return data.map((category) => (
                                                                <li key={category.id}>
                                                                    <NavLink to={`/interest/${category.name.toLowerCase().replaceAll(' ', '_')}?i=${category.id}`}
                                                                        className={({ isActive }) => isActive ? "item-category-navbar-active" : "item-category-navbar"}
                                                                        onClick={() => { if (onClose) { onClose(); }; }}
                                                                    >
                                                                        <img className="w-5 h-5 img-shadow" alt="img" src={appLoadImage(category.icon)} />
                                                                        <span>
                                                                            {category.name}
                                                                        </span>
                                                                    </NavLink>
                                                                </li>
                                                            ));
                                                        })}
                                                        {status == 'error' && (<AppErrorFetchingPosts error={error} />)}
                                                        {status != 'error' && status == 'pending' && (<AppLoadingNavbarCategory />)}
                                                        {status != 'error' && isFetchingNextPage && (<AppLoadingNavbarCategory />)}

                                                    </>
                                                );
                                            }}
                                        />
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[15vh] overflow-y-auto border-t border-secondary dark:border-slate-400">
                    <div className="p-2 text-xs text-mode-slate xl:text-base">
                        <ul className="flex items-center list-disc gap-1">
                            <li className="list-none">
                                <Link to={webRoutes.privacy.path} className="">
                                    {t_core('messages.labels.app.privacy')}
                                </Link>
                            </li>
                            <li className="ml-4">
                                <Link to={webRoutes.privacy.path} className="">
                                    {t_core('messages.labels.app.conditions')}
                                </Link>
                            </li>
                        </ul>
                        <div className="mt-1">
                            version: 1.0.0
                        </div>

                        <div className="text-center">
                             Shuk &copy; 2025
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};




export default AppNavbar;