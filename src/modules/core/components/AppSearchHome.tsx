import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { IconButton } from "@mui/material";

const AppSearchHome = () => {
    const [t] = useTranslation("core");

    return (
        <React.Fragment>
            <div className="app-search-home hidden md:flex">
                <div>
                    <SearchIcon className=""  />
                </div>
                <input className="w-60" type="text" placeholder={t('header.search-placeholder')} />
            </div>

            <div className="flex md:hidden justify-center">
                    <IconButton > <SearchIcon sx={{width: 30, height: 30}} /> </IconButton>
            </div>
        </React.Fragment>
    );
};


export default AppSearchHome;