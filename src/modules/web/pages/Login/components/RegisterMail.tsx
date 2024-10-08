import AppFormInput from "@/modules/core/components/AppFormInput";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

type PropsLoginMail = {
    handleChangeMode: CallableFunction
};

const RegisterMail: React.FC<PropsLoginMail> = ({handleChangeMode}) => {
    const [t] = useTranslation('web');
    return (
        <>
            <div className="app-login-content">
                <form>
                    <AppFormInput
                        label={t('register.inputs.full-name.label')}
                        propsInputs={{ placeholder: t('register.inputs.full-name.placeholder'), type: 'text' }}
                        propsControl={{isRequired: true}}
                        withProvider={false}
                        />
                    <AppFormInput
                        label={t('register.inputs.email.label')}
                        propsInputs={{ placeholder: t('register.inputs.email.placeholder'), type: 'email' }}
                        propsControl={{ isRequired: true }}
                        withProvider={false}
                        />
                    <AppFormInput
                        label={t('register.inputs.birthday.label')}
                        propsInputs={{ placeholder: t('register.inputs.birthday.placeholder'), type: 'date' }}
                        propsControl={{ isRequired: true }}
                        withProvider={false}
                        />
                    <AppFormInput
                        label={t('register.inputs.phone.label')}
                        propsInputs={{ placeholder: t('register.inputs.phone.placeholder'), type: 'number' }}
                        propsControl={{isRequired: true}}
                        withProvider={false}
                        />
                    <Button colorScheme="yellow" className="w-full mt-4">
                        <span className="text-sm">{t('register.buttons.save')}</span>
                    </Button>
                    <div className="mt-2 text-center">
                        <span className="me-2 text-mode-white-primary">{t('register.labels.whit-account')}</span>
                        <button type='submit' className="text-sm text-blue-500" onClick={() => handleChangeMode()} >
                            {t('register.labels.login')}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};


export default RegisterMail;
