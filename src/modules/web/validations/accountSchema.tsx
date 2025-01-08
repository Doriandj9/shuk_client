import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as z from 'zod';

export type AccountSchemaType = {
    username: z.ZodTypeAny;
    email?:  z.ZodTypeAny;
};

export const useAccountSchema = () => {
     const [t] =  useTranslation('web');
    
        const handleSchema = useCallback(() => {
            return z.object<AccountSchemaType>({
                username: z.string().min(3, t('validations.messages.min-length').replace('{count}', String(3))),
                email: z.string().optional()
            });
        },[t]);
    
        return handleSchema();
};