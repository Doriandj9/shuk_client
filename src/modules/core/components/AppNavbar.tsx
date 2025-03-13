import { webRoutes } from "@/config/webRoutes";
import { useCategories } from "@/store/categories";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Divider } from "@mui/material";
import { appLoadImage } from "../utilities/img/convert";

export type AppNavbarProps = {
    isAdmin?: boolean;
    onClose?: CallableFunction;
};

const AppNavbar: React.FC<AppNavbarProps> = ({ isAdmin, onClose }) => {
    const categories = useCategories((state) => state.categories);
    const [t] = useTranslation('web');

    const handleClose = () => {

        if (onClose) {
            onClose();
        }
    };


    if (isAdmin) {
        return (
            <>
                <div className="flex flex-col justify-between w-full h-full pt-16 overflow-x-auto">
                    <div className="h-[85vh] overflow-x-auto">
                        <div className="w-full border-t border-secondary dark:border-slate-400">
                            <ul className="p-2 flex flex-col gap-2">
                                <li className="">
                                    <Link
                                        to={webRoutes.dashboard_admin.children.categories.uri()}
                                        onClick={() => handleClose()}
                                        className="app-container-fade w-full h-10">
                                        {t('titles.categories')}
                                    </Link>
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
            <div className="flex flex-col justify-between w-full h-full pt-16 overflow-x-auto">
                <div className="h-[85vh] p-2">
                    <div className="overflow-x-auto">
                        <div className="w-full dark:border-slate-400">
                            <h2 className="text-mode-slate text-sm p-2">
                                {t('titles.categories')}
                            </h2>
                            <div className="">
                                <Divider />
                            </div>
                            <ul className="flex flex-col">
                                {
                                    categories.map((category) => (
                                        <li key={category.id}>
                                            <Link to={`/interest/${category.name.toLowerCase().replaceAll(' ', '_')}?i=${category.id}`}
                                                className="flex text-sm items-center gap-3 font-extralight
                                            hover:bg-gray-200 hover:rounded-tl-lg hover:rounded-bl-lg p-2
                                            "
                                            onClick={() => { if(onClose) { onClose(); };  }}
                                            >
                                                <img className="w-5 h-5 img-shadow" alt="img" src={appLoadImage(category.icon)} />
                                                <span>
                                                    {category.name}
                                                </span>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
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