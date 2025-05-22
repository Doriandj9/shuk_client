import React from "react";
import AppAvatar from "./AppAvatar";
import { Button, TextField } from "@mui/material";
import { useAuthStore } from "@/store/auth";
import { useTranslation } from "react-i18next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateComment } from "@/modules/web/hooks/comment/hook";
import { useAppToast } from "../hooks/useAppToast";
import { LoadingButton } from "@mui/lab";
import { useBuildMessagePost } from "../hooks/useMessageAndTransPost";
import { useLanguageApp } from "@/store/language";
import { StoreNotificationUser } from "@/modules/web/hooks/notifications/notifications";
import { webRoutes } from "@/config/webRoutes";
import { useStoreNotifyUser } from "@/modules/web/hooks/notifications/hook";

type AppNewCommentPostProps = {
    postId: number | string;
    ownerId?: number | string;
    onCommentAdded?: () => void;
};

type Inputs = {
    comment: string;
};

const AppNewCommentPost: React.FC<AppNewCommentPostProps> = ({ postId, ownerId }) => {
    const user = useAuthStore((state) => state.user);
    const lang = useLanguageApp((state) => state.language);
    const { show } = useAppToast();
    const buildMessage = useBuildMessagePost();
    const [t] = useTranslation('core');
    const { handleSubmit, control, formState: { errors }, reset } = useForm<Inputs>();
    const { comment } = useCreateComment(postId);
    const {store} = useStoreNotifyUser();
    const handleSaveComment: SubmitHandler<Inputs> = (data) => {
        const dataSend = { post_id: postId, description: data.comment, likes: 0, replies: 0 };
        comment.mutate(dataSend, {
            onSuccess: (response) => {
                reset({ comment: '' });
                show({ message: t('messages.success.comment.created'), status: 'success' });
                if(user?.id ===  ownerId) return;

                const {message, trans} = buildMessage('COMMENT_POST',lang, data.comment.slice(0, 25));
                const dataServer: StoreNotificationUser = {
                    type: 'TCP',
                    action: 'Comment for post',
                    message,
                    payload: {
                        relative_path: `${webRoutes.view_posts.path.replace(':id', postId.toString())}?cm=${btoa(String(response.comment.id))}`,
                    },
                    sender: user?.id,
                    receiver: ownerId,
                    trans,
                };
                store.mutate(dataServer);
            }
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleSaveComment)}>
                <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                        <AppAvatar user={user} />
                        <Controller
                            rules={{
                                required: { message: t('messages.errors.comment.not-payload'), value: true },
                                minLength: { value: 3, message: t('messages.errors.comment.min-length') }
                            }}
                            name="comment"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    multiline
                                    disabled={!user || comment.isPending}
                                    maxRows={4}
                                    minRows={2}
                                    placeholder={t('messages.labels.comment.write')}
                                />
                            )}
                        />

                    </div>
                    {
                        user &&
                        <div className="flex justify-end items-center gap-2">
                            {errors?.comment && <span className="text-red-500 text-xs">{errors?.comment.message}</span>}
                            {
                                comment.isPending ?
                                    <LoadingButton loading={true} type="button" sx={{height: '2rem'}} />
                                    :
                                    <Button disabled={Object.entries(errors).length > 0} variant="contained" type="submit" color="primary">
                                        {t('messages.labels.comment.send')}
                                    </Button>
                            }
                        </div>
                    }
                </div>

            </form>
        </>
    );
};


export default AppNewCommentPost;