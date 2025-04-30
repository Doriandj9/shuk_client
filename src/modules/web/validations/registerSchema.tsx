import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as z from 'zod';


export const useRegisterSchema = () => {
    const [t] = useTranslation('web');

    const handleSchema = useCallback(() => {

        return z.object({
            full_name: z.string().min(3,t('validations.messages.full-name-min')),
            email: z.string().email(t('validations.messages.email-type'))
        });
    },[t]);

    return handleSchema();
};

export const useForwardPasswordSchema = () => {
    const [t] = useTranslation('web');

    const handleSchema = useCallback(() => {

        return z.object({
            email: z.string().email(t('validations.messages.email-type'))
        });
    },[t]);

    return handleSchema();
};

export const useRegisterSchemaComplete = () => {
    const [t] = useTranslation('web');

    const handleSchema = useCallback(() => {
        return z.object({
            full_name: z.string().min(3,t('validations.messages.full-name-min')),
            email: z.string(),
            username: z.string().min(3,t('validations.messages.min-length').replace('{count}', '3')).max(100, t('validations.messages.max-length').replace('{count}','100')),
            phone: z.string().min(6,t('validations.messages.min-length').replace('{count}', '6')),
            birthday: z.string().min(1,t('validations.messages.birthday-required')),
            password: z.string().min(8,t('validations.messages.min-length').replace('{count}', '8'))
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,t('validations.messages.password-type')),
            password_confirmation: z.string().min(8,t('validations.messages.min-length').replace('{count}', '8'))
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,t('validations.messages.password-type'))
        }).refine((data) => data.password === data.password_confirmation, {
            message: t('validations.messages.password-confirm'),
            path: ['password_confirmation']
    });
    },[t]);

    return handleSchema();
};


export const useResetPasswordPublicSchema = () => {
    const [t] = useTranslation('web');

    const handleSchema = useCallback(() => {
        return z.object({
            email: z.string(),
            password: z.string().min(8,t('validations.messages.min-length').replace('{count}', '8'))
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$!%.*?&]{8,}$/,t('validations.messages.password-type')),
            password_confirmation: z.string().min(8,t('validations.messages.min-length').replace('{count}', '8'))
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.$!%*?&])[A-Za-z\d@$!%*?.&]{8,}$/,t('validations.messages.password-type'))
        }).refine((data) => data.password === data.password_confirmation, {
            message: t('validations.messages.password-confirm'),
            path: ['password_confirmation']
    });
    },[t]);

    return handleSchema();
};