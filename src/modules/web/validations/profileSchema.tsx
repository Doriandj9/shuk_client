import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as z from 'zod';

type ProfileSchemaType = {
    photo?: z.ZodTypeAny;
    full_name: z.ZodTypeAny;
    nationality?: z.ZodTypeAny;
    gender?: z.ZodTypeAny;
    birthday?: z.ZodTypeAny;
    about_me?: z.ZodTypeAny;
};

export type ProfileFormTYpe = {
    photo: Blob | null | string | FileList;
    full_name: string;
    nationality?: string;
    gender?: string;
    birthday?: string;
    about_me?: string;
};

export const useProfileSchema = () => {
    const [t] = useTranslation('web');

    const handleSchema = useCallback(() => {
        return z.object<ProfileSchemaType>({
            full_name: z.string().min(5, t('validations.messages.min-length').replace('{count}', '5')),
            birthday: z.string().min(8, t('validations.messages.min-length').replace('{count}', '8'))
                .min(8, t('validations.messages.min-length').replace('{count}', '8')).optional(),
            about_me: z.string().min(5, t('validations.messages.min-length').replace('{count}', '5'))
                .max(80, t('validations.messages.max-length').replace('{count}', '80')).optional(),
            gender: z.string().optional(),
            nationality: z.string().optional(),
            photo: z.union([z.instanceof(FileList), z.string(), z.null()]).optional()
        });
    }, [t]);

    return handleSchema();
};