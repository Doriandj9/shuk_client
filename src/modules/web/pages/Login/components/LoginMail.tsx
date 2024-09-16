import AppFormInput from "@/modules/core/components/AppFormInput";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React from "react";


type PropsLoginMail = {
    handleChangeMode: CallableFunction
};

const LoginMail: React.FC<PropsLoginMail> = ({handleChangeMode}) => {
    const [t] = useTranslation('web');
    return (
        <>
            <div className="app-login-content">
                <AppFormInput
                    label=""
                    propsInputs={{ placeholder: t('login.inputs.email.placeholder'), type: 'email' }}
                    withProvider={false}
                />
                <AppFormInput
                    label=""
                    propsInputs={{ placeholder: t('login.inputs.password.placeholder'), type: 'password' }}
                    withProvider={false}
                />
                <Button colorScheme="yellow" className="w-full mt-4">
                    <span className="text-sm">{t('login.buttons.login')}</span>
                </Button>
                <div className="mt-2 text-center">
                    <span className="me-2 text-mode-white-primary">{t('login.labels.not-account')}</span>
                    <button className="text-sm text-blue-500 dark:text-blue-400" onClick={() => handleChangeMode()} >
                        {t('login.labels.register-account')}
                    </button>
                </div>
            </div>
        </>
    );
};

export default LoginMail;