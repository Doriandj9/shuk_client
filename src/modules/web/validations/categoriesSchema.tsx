import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as z from 'zod';

export type NewCategoriesForm = {
    name: string;
    icon?: Blob | string;
    doc_status?:  'CO' | 'DR' | 'AC' | 'DL' | 'ED' | 'TM';
};

export const useCategoriesSchema = () => {
    const [t] = useTranslation('web');

    const handleSchema = useCallback(() => {
        return z.object({
            name: z.string().min(3, t('validations.messages.min-length').replace('{count}', String(3))),
            icon: z.union([z.instanceof(File), z.string().min(3)])
        });
    }, [t]);

    return handleSchema();
};


export const useCategoriesDeleteSchema = () => {
    const [t] = useTranslation('web');

    const handleSchema = useCallback(() => {
        return z.object({
            name: z.string().min(3, t('validations.messages.min-length').replace('{count}', String(3))),
            doc_status: z.string()
        });
    }, [t]);

    return handleSchema();
};

