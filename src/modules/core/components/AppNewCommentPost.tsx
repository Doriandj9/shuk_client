import React from "react";
import AppAvatar from "./AppAvatar";
import { Button, TextField } from "@mui/material";
import { useAuthStore } from "@/store/auth";
import { useTranslation } from "react-i18next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateComment } from "@/modules/web/hooks/comment/hook";

type AppNewCommentPostProps = {
    postId: number | string;
    onCommentAdded?: () => void;
};

type Inputs = {
    comment: string;
};

const AppNewCommentPost: React.FC<AppNewCommentPostProps> = ({ postId }) => {
    const user = useAuthStore((state) => state.user);
    const [t] = useTranslation('core');
    const {handleSubmit, control, formState: {errors}} = useForm<Inputs>();
    const {comment} = useCreateComment(postId);
    const handleSaveComment: SubmitHandler<Inputs> = (data) => {
        const dataSend = {post_id: postId, description: data.comment, likes: 0, replies: 0};
        comment.mutate(dataSend);
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleSaveComment)}>
                <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                        <AppAvatar user={user} />
                        <Controller 
                            rules={{
                                required: {message: t('messages.errors.comment.not-payload'), value: true},
                                minLength: {value: 3, message: t('messages.errors.comment.min-length')}
                        }}
                            name="comment"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    multiline
                                    autoFocus
                                    disabled={!user}
                                    maxRows={4}
                                    placeholder={t('messages.labels.comment.write')}
                                />
                            )}
                        />
                        
                    </div>
                    {
                        user &&
                        <div className="flex justify-end items-center gap-2">
                        {errors?.comment && <span className="text-red-500 text-xs">{errors?.comment.message}</span>}
                        <Button disabled={Object.entries(errors).length > 0} variant="contained" type="submit" color="primary">
                            {t('messages.labels.comment.send')}
                        </Button>
                        </div>
                    }
                </div>

            </form>
        </>
    );
};


export default AppNewCommentPost;