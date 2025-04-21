import { LanguageApp } from "@/config/@types/app";
import { useTranslation } from "react-i18next";

export type TypeMessage = 'NEW_POST' | 'LIKE_POST' | 'COMMENT_POST';
export type TranslateNotify = {
    current_language: LanguageApp;
    languages: {
        [key: string]: {
            message: string
        }
    }
};
type BuildMessagePostFn = {
    (type: TypeMessage, language: LanguageApp, title?: string): {
        message?: string;
        trans: TranslateNotify;
    }
};

export const useBuildMessagePost: () => BuildMessagePostFn  = () => {
    const { i18n } = useTranslation('web');
    const [t] = useTranslation('web');

    return (type, language, title) => {
        const t_es = i18n.getFixedT('es', 'web');
        const t_en = i18n.getFixedT('en', 'web');
    
        if (type === 'NEW_POST') {
            const trans: TranslateNotify = {
                current_language: language,
                languages: {
                    "es": {
                        message: t_es('notifications.new-notification') + ' ' + title 
                    },
                    "en": {
                        message: t_en('notifications.new-notification') + ' ' + title 
                    }
                }
            };
    
            return {
                message: t('notifications.new-notification') + ' ' + title ,
                trans: trans
            };
        }

        if(type === 'LIKE_POST'){
            const trans: TranslateNotify = {
                current_language: language,
                languages: {
                    "es": {
                        message: t_es('notifications.like-post') + ' ' + title 
                    },
                    "en": {
                        message: t_en('notifications.like-post') + ' ' + title 
                    }
                }
            };
    
            return {
                message: t('notifications.like-post') + ' ' + title ,
                trans: trans
            };
        }

        if(type === 'COMMENT_POST'){
            const trans: TranslateNotify = {
                current_language: language,
                languages: {
                    "es": {
                        message: t_es('notifications.comment-post') + ' ' + title 
                    },
                    "en": {
                        message: t_en('notifications.comment-post') + ' ' + title 
                    }
                }
            };
    
            return {
                message: t('notifications.comment-post') + ' ' + title ,
                trans: trans
            };
        }
    
        return {
            trans: {
                current_language: language,
                languages: {}
            }
        };
    };
};