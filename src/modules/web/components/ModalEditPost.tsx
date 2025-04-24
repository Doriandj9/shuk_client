import { PostData } from "../hooks/post/PostI";
import { Button, Dialog, DialogTitle, Divider, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import AppInput from "@/modules/core/components/AppInput";
import { SubmitHandler, useForm } from "react-hook-form";
import AppMediaPostImg from "@/modules/core/components/AppMediaPostImg";
import { UpdateDescriptionPostType } from "../validations/postSchemas";
import CloseIcon from '@mui/icons-material/Close';
import { useUpdatePost } from "../hooks/post/hooks";
import { useAppToast } from "@/modules/core/hooks/useAppToast";
import AppLoading from "@/modules/core/components/AppLoading";
import { useEffect } from "react";


type ModalEditPostProps = {
    open: boolean;
    onClose: (event: object, reason: "backdropClick" | "escapeKeyDown") => void;
    post: PostData
}

export const ModalEditPost: React.FC<ModalEditPostProps> = ({ open, post, onClose }) => {
    const [t] = useTranslation('core');
    const [t_web] = useTranslation('web');
    const { put } = useUpdatePost(post.id);
    const { show } = useAppToast();
    const { control, handleSubmit, reset } = useForm<UpdateDescriptionPostType>();

    const onSave: SubmitHandler<UpdateDescriptionPostType> = (data) => {
        put.mutate({ ...data, type: post.type_post }, {
            onSuccess() {
                show({ message: t('messages.success.post.updated'), status: 'success' });
                onClose({}, 'backdropClick');
            }
        });
    };

    useEffect(() => {
        if (post) {
            reset({
                description: post.description?.replaceAll(/style="(.+);"/g, '') || ''
            });
        }
    },[post]);
    return (
        <>
            <AppLoading isOpen={put.isPending} />
            <Dialog

                open={open}
                onClose={(e, reason) => onClose(e, reason as 'backdropClick' | 'escapeKeyDown')}
                scroll="body"
                
            >
                <DialogTitle className="app-container-fade rounded-none relative">
                    <span className="text-center font-semibold text-md md:text-xl px-4 block"> {t_web('titles.edit-post')}</span>
                    <div>
                        {

                            <IconButton
                                sx={{ position: 'absolute', top: 5, right: 0 }}
                                style={{ boxShadow: 'none' }}
                                onClick={(e) => onClose ? onClose(e, 'backdropClick') : () => { }}
                                size="small"

                            >
                                <CloseIcon
                                />
                            </IconButton>
                        }
                    </div>
                </DialogTitle>
                <Divider />
                <div className="app-container-fade rounded-none p-4">
                    <AppInput
                        control={control}
                        label={t_web('descriptions.share-idea')}
                        inputProps={{
                            name: 'description',
                            multiline: true,
                            minRows: 2,
                            maxRows: 3,
                            placeholder: t_web('descriptions.share-idea'),
                        }}
                        fullWidth
                        labelStrong

                    />
                    {
                        post.type_post === 'PI' &&
                        <div className="w-full mt-4">
                            <AppMediaPostImg pathResource={post.path_resource || null} file={post.img} isTemp={post.is_temp} fileTem={post.file_temp} />
                        </div>
                    }
                    <div className="flex justify-end items-center w-full mt-4 gap-2">
                        <Button variant="contained" color="error" onClick={(e) => onClose(e, 'backdropClick')}>
                            {t('messages.labels.app.close')}
                        </Button>
                        <Button variant="contained" color="warning" className="ml-2" onClick={handleSubmit(onSave)}>
                            {t_web('descriptions.save-changes')}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    );

};