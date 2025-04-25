import { webRoutes } from "@/config/webRoutes";
import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { appLoadImage } from "../utilities/img/convert";
import { useGetInfinityCategories } from "@/modules/admin/hooks/categories/hook";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import SubjectIcon from '@mui/icons-material/Subject';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfinityScrollElement from "./InfinityScrollElement";
import AppErrorFetchingPosts from "./AppErrorFetchingPosts";
import { AppLoadingNotificationUser } from "./AppLoadinNotificationUser";
export type AppNavbarProps = {
    isAdmin?: boolean;
    onClose?: CallableFunction;
};

const AppNavbar: React.FC<AppNavbarProps> = ({ isAdmin, onClose }) => {
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
                                        {t_core('menu.statistics')}
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
            <div className="flex flex-col justify-between w-full h-full pt-16 overflow-x-auto bg-white dark:bg-slate-800">
                <div className="h-[85vh]">
                    <div className="overflow-x-auto">
                        <div className="w-full dark:border-slate-400">
                            <h2 className="text-mode-white text-md mt-2">
                                <span className="border-b border-secondary dark:border-slate-400 inline-flex items-center gap-1">
                                    <SubjectIcon className=" img-shadow" />
                                    {t('titles.categories')}
                                </span>
                            </h2>
                            <div className="min-h-10 max-h-full overflow-y-auto" ref={refElement}>
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
                                                    < >
                                                        {status && categories?.pages.map(({ data }) => {

                                                            return data.map((category) => (
                                                                <li key={category.id}>
                                                                    <NavLink to={`/interest/${category.name.toLowerCase().replaceAll(' ', '_')}?i=${category.id}`}
                                                                        className={({ isActive }) => isActive ? "item-category-navbar-active" : "item-category-navbar flex-grow"}
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
                                                        {status != 'error' && status == 'pending' && (<AppLoadingNotificationUser />)}
                                                        {status != 'error' && isFetchingNextPage && (<AppLoadingNotificationUser />)}

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
                <div className="h-[15vh] overflow-hidden border-t border-secondary dark:border-slate-400">
                    <div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};




export default AppNavbar;