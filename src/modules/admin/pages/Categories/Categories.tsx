import { ModalCategories } from "@/modules/web/components/ModalCategories";
import { useState } from "react";
import { useGetCategories, useUpdateCategory } from "../../hooks/categories/hook";
import { AppTableComponent } from "@/modules/core/components/AppTable";
import { useTableHelperCategories } from "./TableHelper";
import { CategoriesModelType } from "../../hooks/categories/categories";
import { Button, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useTranslation } from "react-i18next";
import AppModal from "@/modules/core/components/AppModal";
import React from "react";
import { NewCategoriesForm, useCategoriesDeleteSchema } from "@/modules/web/validations/categoriesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppToast } from "@/modules/core/hooks/useAppToast";
import { showError } from "@/modules/core/utilities/errors";
import AppLoading from "@/modules/core/components/AppLoading";
import DoneIcon from '@mui/icons-material/Done';

export const Categories = () => {
    const [modal, setModal] = useState<{ open: boolean; isEdit: boolean; id: null | number | string }>
        ({ open: false, isEdit: false, id: null });
    const [currentPage, setCurrentPage] = useState(1);
    const [openModalDeletePost, setOpenModalDeletePost] = useState(false);
    const [idC, setIdC] = useState<number | null>(null);
    const [t_core] = useTranslation('core');
    const { update } = useUpdateCategory(idC,currentPage);
    const schema = useCategoriesDeleteSchema();
    const { show } = useAppToast();

    const { handleSubmit, reset, watch, formState: { errors } } = useForm<NewCategoriesForm>({
        resolver: zodResolver(schema)
    });

    const {
        data,
        error,
        isLoading,
        perPage
    } = useGetCategories(currentPage);
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

                    {
                        item.doc_status !== 'DL'
                            ?
                            <IconButton onClick={() => {
                                setIdC(item.id as number);
                                reset({
                                    doc_status: 'DL',
                                    name: item.name
                                });
                                setOpenModalDeletePost(true);
                            }}
                                color="error"
                            >
                                <DeleteIcon />
                            </IconButton>
                            :
                            <IconButton onClick={() => {
                                setIdC(item.id as number);
                                reset({
                                    doc_status: 'AC',
                                    name: item.name
                                });
                                setOpenModalDeletePost(true);
                            }}
                                color="primary"
                            >
                                <DoneIcon />
                            </IconButton>
                    }

                </span>
            </>
        );
    };

    const rendeTable = useTableHelperCategories(action);


    const handleCloseDeleteModalPost = () => {
        setOpenModalDeletePost(false);
    };

    const onUpdate: SubmitHandler<NewCategoriesForm> = (data) => {
        update.mutate(data, {
            onSuccess(response) {
                show({ message: t_core('messages.success.category.updated'), status: 'success' });
                reset({
                    icon: response.icon,
                    name: response.name
                });
                handleCloseDeleteModalPost();
            },
            onError(error) {
                showError(error);
            },
        });
    };

    console.log(watch(), errors);
    return (
        <>
            <AppLoading isOpen={update.isPending} />
            <AppModal
                open={openModalDeletePost}
                onClose={handleCloseDeleteModalPost}

            >
                <div>
                    <div className="app-container-fade rounded-none p-4 shadow-none">
                        {t_core('messages.labels.app.sure-continue')}
                    </div>
                    <div className="flex justify-end items-center w-full mt-4 gap-2">
                        <Button variant="contained" color="warning" onClick={handleCloseDeleteModalPost}>
                            {t_core('messages.labels.app.close')}
                        </Button>
                        {
                            watch('doc_status') === 'DL' ?
                                <Button variant="contained" color="error" className="ml-2" onClick={handleSubmit(onUpdate)}>
                                    {t_core('messages.labels.post.delete')}

                                </Button>
                                :
                                <Button variant="contained" color="primary" className="ml-2" onClick={handleSubmit(onUpdate)}>
                                    {t('descriptions.save-changes')}
                                </Button>
                        }
                    </div>
                </div>

            </AppModal>
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
                <AppTableComponent isLoading={isLoading} error={error} tableHelper={rendeTable} data={data?.data ?? []}
                    count={data?.last_page} onPage={(page) => setCurrentPage(page)} currentPage={currentPage} perPage={perPage}
                />

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