import { ModalCategories } from "@/modules/web/components/ModalCategories";
import { useState } from "react";
import { useGetCategories } from "../../hooks/categories/hook";
import { AppTableComponent } from "@/modules/core/components/AppTable";
import { useTableHelperCategories } from "./TableHelper";
import { CategoriesModelType } from "../../hooks/categories/categories";
import { Button, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useTranslation } from "react-i18next";

export const Categories = () => {
    const [modal, setModal] = useState<{ open: boolean; isEdit: boolean; id: null | number | string }>
        ({ open: false, isEdit: false, id: null });
    const { data, isLoading, error } = useGetCategories();
    const [t] = useTranslation('web');


    const action = (item: CategoriesModelType) => {
        return (
            <>
                <span className="flex gap-2">
                    <IconButton onClick={() => setModal({ isEdit: true, open: true, id: item.id })}
                        color="primary"
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton onClick={() => setModal({ isEdit: true, open: true, id: item.id })}
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>

                </span>
            </>
        );
    };

    const rendeTable = useTableHelperCategories(action);

    return (
        <>
            <div className="app-container-fade p-2 h-full w-full">
                <div className="flex justify-start">
                    <div className="flex items-center gap-1 text-mode-primary w-auto border-b-2 border-mode-primary ps-2 pe-4">
                        <PostAddIcon />
                        <h2 className="text-xl font-bold ">{t('titles.categories')}</h2>

                    </div>
                </div>
                <div className="flex justify-end my-3">
                    <Button
                        onClick={() => setModal((state) => ({ ...state, open: true, id: null, isEdit: false }))}
                        startIcon={<PostAddIcon />}
                        variant="outlined"
                        color="secondary"
                    >
                        {t('titles.new-category')}
                    </Button>
                </div>
                <AppTableComponent isLoading={isLoading} error={error} tableHelper={rendeTable} data={data ?? []} />

            </div>

            <ModalCategories
                isOpen={modal.open}
                onClose={() => setModal((state) => ({ ...state, open: false }))}
                isEdit={modal.isEdit}
                id={modal.id}
            />
        </>
    );
};