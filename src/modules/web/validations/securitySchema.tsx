import { ThemeOptions } from "@/config/@types/app";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as z from 'zod';

export type SecurityType = {
    language?: z.ZodTypeAny;
    notifications_by_mail?:  z.ZodTypeAny;
    notifications_by_app?: z.ZodTypeAny;
    hidden_mail?: z.ZodTypeAny;
    hidden_phone_number?: z.ZodTypeAny;
    theme?: z.ZodTypeAny;
};

export type SecurityFormType ={
    language?:string;
    notifications_by_mail?: boolean | undefined | null;
    notifications_by_app?:boolean | undefined | null;
    hidden_mail?: boolean | undefined | null;
    hidden_phone_number?:boolean | undefined | null;
    theme?: ThemeOptions;
};

export const useSecuritySchema = () => {
     const [t] =  useTranslation('web');
    
     const handleSchema = useCallback(() => {
        return z.object<SecurityType>({
            hidden_mail: z.boolean().optional(),
            hidden_phone_number: z.boolean().optional(),
            language: z.string().optional(),
            notifications_by_app: z.boolean().optional(),
            notifications_by_mail: z.boolean().optional(),
            theme: z.string().optional()
          });
    },[t]);
    
        return handleSchema();
};


export const useNotEmailsSchema = () => {
const [t] =  useTranslation('web');
    
     const handleSchema = useCallback(() => {
        return z.object({
            email: z.string({message: t('validations.messages.email-type')}).email(t('validations.messages.email-type')),
            not_email: z.literal(true, {message: t('validations.messages.fiel-required')})
          });
    },[t]);
    
        return handleSchema();

};