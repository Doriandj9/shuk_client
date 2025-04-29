import { Tooltip } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchIcon from '@mui/icons-material/Search';
import useAutocomplete from '@mui/material/useAutocomplete';
import { styled } from '@mui/system';
import { DisplaySearchPosts } from "./DisplaySearchPosts";




const Label = styled('label')({
    display: 'block',
});

const Listbox = styled('ul')(({ theme }) => ({
    width: '25rem',
    margin: 0,
    padding: '8px',
    minHeight: '15rem',
    borderRadius: '8px',
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: '#fff',
    overflow: 'auto',
    maxHeight: 500,
    '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
    },
    ...theme.applyStyles('dark', {
        backgroundColor: '#000',
    }),
}));


export const AppWebSearchPost = () => {
    const [t] = useTranslation('core');
    const [isShow, setIsShow] = useState(false);
   const [search, setSearch] = useState<string | null>(null);


    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
    } = useAutocomplete({
        id: 'post-search-combo-box',
        options: [],
        getOptionLabel: (option) => option && typeof option === 'object' ? Reflect.get(option, 'title') : 'N/A'
    });

    const inputsProps = getInputProps();
    const originalFocus = inputsProps.onFocus;
    const originalBlur = inputsProps.onBlur;
    const originalChange = inputsProps.onChange;
    delete inputsProps.onFocus;
    delete inputsProps.onBlur;

    return (
        <div>
            <Tooltip title={t('header.search-placeholder')}>

                <div {...getRootProps()} className="app-search-home hidden md:flex">
                    <Label {...getInputLabelProps()}>
                        <SearchIcon className="text-mode-secondary" />
                    </Label>
                    <input {...inputsProps}
                        onChange={(e) =>{
                            setSearch(e.target.value);
                            originalChange?.(e);
                        }}
                        className="w-60 text-mode-slate" type="text" placeholder={t('header.search-placeholder')}
                        onFocus={(e) => {
                            setIsShow(true);
                            originalFocus?.(e);
                        }}
                        onBlur={(e) => {
                            setIsShow(false);
                            originalBlur?.(e);
                        }}
                    />
                </div>
            </Tooltip>
            {
                isShow && (
                    <Listbox {...getListboxProps()}>
                        <h2 className="text-mode-slate front-semibold">
                            {t('header.search-posts')}
                        </h2>
                        <DisplaySearchPosts searchText={search} onClose={() => setIsShow(false)} />
                    </Listbox>
                )
            }
        </div>
    );
};
