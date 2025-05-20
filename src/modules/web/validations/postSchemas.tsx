import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';
import { DocStatusData } from '../hooks/post/PostI';

export type UpdateDescriptionPostType = {
    description: string;  
};

export const useUpdateDescriptionPostSchema = () => {
    const [t] = useTranslation('web');

    const handleSchema = useCallback(() => {
            return z.object({
                description: z.string().min(1, t('validations.messages.min-length').replace('{count}', '1'))
                    .max(500, t('validations.messages.max-length').replace('{count}', '500')),
            });
        }, [t]);
    
    
    return handleSchema();
};

export type ChangesModePosts = {
    limit: string;
    doc_status: DocStatusData;
};


export const useChangesModeSchema = () => {
    const [t] = useTranslation('web');

    const handleSchema = useCallback(() => {
            return z.object({
                limit: z.string({ message: t('validations.messages.fiel-required') }).regex(/^\d+$/, t('validations.messages.number-invalid')).min(0, t('validations.messages.not_number_negative'))
                .transform((val) => parseInt(val))
                .refine((val) => val > 500, {
                    message: t('validations.messages.max-length').replace('{count}','500')
                }),
                doc_status: z.string()
            });
        }, [t]);
    
    
    return handleSchema();
};