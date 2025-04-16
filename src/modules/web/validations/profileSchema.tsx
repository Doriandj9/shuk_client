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
    phone?: z.ZodTypeAny;
};

export type ProfileFormTYpe = {
    photo: Blob | null | string | FileList;
    full_name: string;
    nationality?: string;
    gender?: string;
    birthday?: string;
    about_me?: string;
    phone?: string;
};

export const useProfileSchema = () => {
    const [t] = useTranslation('web');

    const handleSchema = useCallback(() => {
        return z.object<ProfileSchemaType>({
            full_name: z.string().min(5, t('validations.messages.min-length').replace('{count}', '5')),
            birthday: z.union([z.string().min(8, t('validations.messages.min-length').replace('{count}', '8')).min(8, t('validations.messages.min-length').replace('{count}', '8')), z.null(), z.undefined()])
                .optional(),
            about_me: z.union([z.string().min(5, t('validations.messages.min-length').replace('{count}', '5'))
                .max(80, t('validations.messages.max-length').replace('{count}', '80')), z.null(), z.undefined()]),
            gender: z.union([z.null(), z.undefined(),z.string()]).optional(),
            nationality: z.union([z.null(), z.undefined(),z.string()]).optional(),
            photo: z.union([z.instanceof(FileList), z.undefined()]).optional(),
            phone: z.union([z.string().min(5, t('validations.messages.min-length').replace('{count}',String(5))), z.null(), z.undefined()]).optional()
        }).partial({
            about_me: true,
            phone: true
        });
    }, [t]);

    return handleSchema();
};