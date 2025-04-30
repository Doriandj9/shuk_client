import React, { useState } from "react";
import { AppTableComponent } from "@/modules/core/components/AppTable";
import { useTableHelperCategories } from "./TableHelper";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useTranslation } from "react-i18next";
import AppModal from "@/modules/core/components/AppModal";
import AppLoading from "@/modules/core/components/AppLoading";
import DoneIcon from '@mui/icons-material/Done';
import LockResetIcon from '@mui/icons-material/LockReset';
import { ModalChangePass } from "@/modules/web/components/ModalChangePass";
import { User } from "@/modules/web/@types/web";
import { useGetUSers, usePutUser } from "../../hooks/users/hook";
import { ActiveInactiveUserType } from "@/modules/web/validations/passwordSchema";

export const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const {
        data,
        error,
        isLoading,
        perPage
    } = useGetUSers(currentPage);

    const [t] = useTranslation('web');

    const action = (item: User) => {
        return (
            <>
                <span className="flex gap-2">
                    <ModalPass user={item} />
                    <ModalDelete user={item} currentPage={currentPage} />
                </span>
            </>
        );
    };

    const rendeTable = useTableHelperCategories(action);



    return (
        <>
            <div className="app-container-fade p-2 h-full w-full">
                <div className="flex justify-start mb-4">
                    <div className="flex items-center gap-1 text-mode-primary w-auto border-b-2 border-mode-primary ps-2 pe-4">
                        <PostAddIcon />
                        <h2 className="text-xl font-bold ">{t('titles.users')}</h2>

                    </div>
                </div>

                <AppTableComponent isLoading={isLoading} error={error} tableHelper={rendeTable} data={data?.data ?? []}
                    count={data?.last_page} onPage={(page) => setCurrentPage(page)} currentPage={data?.current_page} perPage={perPage}
                />

            </div>


        </>
    );
};


const ModalPass: React.FC<{ user: User }> = ({ user }) => {
    const [open, setOpen] = useState(false);

    return (
        <>

            <IconButton
                onClick={() => setOpen(true)}
                color="primary"
            >
                <LockResetIcon color="warning" />
            </IconButton>
            <ModalChangePass
                isOpen={open}
                onClose={() => setOpen(false)}
                id={String(user.id)}
                email={user?.email ?? ''}
                full_name={user?.full_name ?? ''}

            />
        </>


    );
};

const ModalDelete: React.FC<{ user: User, currentPage: number }> = ({ user, currentPage }) => {
    const [openModalDeletePost, setOpenModalDeletePost] = useState(false);
    const [t_core] = useTranslation('core');
    const [t] = useTranslation('web');
    const { put } = usePutUser(String(user.id), currentPage);
    const handleCloseDeleteModalPost = () => {
        setOpenModalDeletePost(false);
    };

    const onUpdate = (type: 'DL' | 'AC') => {
        const data: ActiveInactiveUserType = { doc_status: type };
        put.mutate(data, {
            onSuccess() {
                setOpenModalDeletePost(false);
            }
        });
    };


    return (
        <>
            <AppLoading isOpen={put.isPending} />

            {
                user?.doc_status !== 'DL'
                    ?
                    <IconButton onClick={() => {
                        setOpenModalDeletePost(true);
                    }}
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                    :
                    <IconButton onClick={() => {
                        setOpenModalDeletePost(true);
                    }}
                        color="primary"
                    >
                        <DoneIcon />
                    </IconButton>
            }
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
                            user.doc_status === 'DL' ?
                                <Button variant="contained" color="primary" className="ml-2" onClick={() => onUpdate('AC')}>
                                    {t('descriptions.save-changes')}
                                </Button>
                                :
                                <Button variant="contained" color="error" className="ml-2" onClick={() => onUpdate('DL')}>
                                    {t_core('messages.labels.post.delete')}
                                </Button>

                        }
                    </div>
                </div>

            </AppModal>
        </>
    );
};