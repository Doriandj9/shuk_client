import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';

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