import AppFormInput from "@/modules/core/components/AppFormInput";
import { useInitialRegister } from "@/modules/web/hooks/auth/hooksAuth";
import { DataRegisterInitial } from "@/modules/web/hooks/auth/request";
import { useRegisterSchema } from "@/modules/web/validations/registerSchema";
import { Button } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RegisterContext } from "../contexts/registerContext";
import { LoadingAuthContext } from "../Login";
import { useLanguageApp } from "@/store/language";

type PropsLoginMail = {
    handleChangeMode: CallableFunction
};


const RegisterMail: React.FC<PropsLoginMail> = ({ handleChangeMode }) => {
    const [t] = useTranslation('web');
    const lang = useLanguageApp((state) => state.language);
    const registerSchema = useRegisterSchema();
    const { register, handleSubmit, formState: { errors } } = useForm<DataRegisterInitial>({
        resolver: zodResolver(registerSchema)
    });

    const { updateState } = React.useContext(RegisterContext);
    const {setAuthLogin} = React.useContext(LoadingAuthContext);

    const { register: initialRegister } = useInitialRegister();

    const handleRegister = (data: DataRegisterInitial) => {
        initialRegister.mutate({...data,language: lang},{
            onSuccess(){
                updateState(true);
            }
        });
    };

    useEffect(() => {
        setAuthLogin(initialRegister.isPending);
    },[initialRegister.isPending]);


    return (
        <>
            <div className="app-login-content">
                <form onSubmit={handleSubmit(handleRegister)}>
                    <AppFormInput
                        label={t('register.inputs.full-name.label')}
                        propsInputs={{
                            placeholder: t('register.inputs.full-name.placeholder'),
                            type: 'text',
                            ...register('full_name')
                        }}
                        propsControl={{
                            isInvalid: errors.full_name?.message ? true : false
                        }}
                        withProvider={false}
                        validation={errors.full_name?.message}
                    />
                    <AppFormInput
                        label={t('register.inputs.email.label')}
                        propsInputs={{
                            placeholder: t('register.inputs.email.placeholder'),
                            type: 'email',
                            ...register('email')
                        }}
                        propsControl={{
                            isInvalid: Boolean(errors.email?.message)
                        }}
                        validation={errors.email?.message}
                        withProvider={false}
                    />

                    <Button
                    disabled={initialRegister.isPending}
                    isLoading={initialRegister.isPending}
                     type="submit" colorScheme="yellow" className="w-full mt-4">
                        <span className="text-sm">{t('register.buttons.save')}</span>
                    </Button>
                </form>
                <div className="mt-2 text-center">
                    <span className="me-2 text-mode-white-primary">{t('register.labels.whit-account')}</span>
                    <button className="text-sm text-blue-500" onClick={() => handleChangeMode()} >
                        {t('register.labels.login')}
                    </button>
                </div>
            </div>
        </>
    );
};


export default RegisterMail;
