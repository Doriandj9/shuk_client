import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as z from 'zod';

export type PasswordType = {
    old_password?: z.ZodTypeAny;
    password:  z.ZodTypeAny;
    repeat_password: z.ZodTypeAny;
};

export type PasswordFormType ={
    old_password?: string;
    password:  string;
    repeat_password: string;
};

export const usePassword = (hasPassword: undefined | null | boolean) => {
     const [t] =  useTranslation('web');
    
     const handleSchema = useCallback(() => {
        return z.object<PasswordType>({
            old_password: hasPassword ?  z.string()
            .min(4, t('validations.messages.min-length').replace('{count}', '4'))
            : z.string().optional(),

            password: z.string().min(8, t('validations.messages.min-length').replace('{count}', '8'))
            .regex(/[.*+?^=!:${}()|[\]/\\]/, t('validations.messages.special-characters').replace('{count}','1'))
            .regex(/\d+/, t('validations.messages.number-count').replace('{count}','1')),

            repeat_password: z.string().min(8, t('validations.messages.min-length').replace('{count}', '8'))
            .regex(/[.*+?^=!:${}()|[\]/\\]/, t('validations.messages.special-characters').replace('{count}','1'))
            .regex(/\d+/, t('validations.messages.number-count').replace('{count}','1'))

        }).refine((data) => data.password === data.repeat_password, {
            message: "Las contraseñas no coinciden",
            path: ['repeat_password']
          });
    },[t]);
    
        return handleSchema();
};