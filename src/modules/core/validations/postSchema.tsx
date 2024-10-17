import { useTranslation } from "react-i18next";
import { PostImage, PostText, PostVideo } from "../@types/post";
import { useCallback } from "react";
import * as z from 'zod';
export type FormPostSchema = PostImage | PostText | PostVideo ;


export const usePostSchema = () => {
    const [t] = useTranslation('core');

    const schema = useCallback(() => {

        return z.object({
            payloadPost: z.string().min(1,t('messages.errors.post.not-payload')),
            typePost: z.string().min(2,t('messages.errors.post.not-type')).max(2),
            description: z.string(),
            file: z.object({}).required()
        });
    }, [t]);

    return schema();
};