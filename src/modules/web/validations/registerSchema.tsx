import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as z from 'zod';


export const useRegisterSchema = () => {
    const [t] = useTranslation('web');

    const handleSchema = useCallback(() => {

        return z.object({
            full_name: z.string().min(3,t('validations.messages.full-name-min')),
            email: z.string().email(t('validations.messages.email-type')),
            birthday: z.string().min(1,t('validations.messages.birthday-required')),
            phone: z.string().min(3,t('validations.messages.phone-required'))
        });
    },[t]);

    return handleSchema();
};

