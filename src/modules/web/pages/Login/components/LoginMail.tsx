import AppFormInput from "@/modules/core/components/AppFormInput";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth, useTest } from "@web/hooks/auth/hooksAuth";


type PropsLoginMail = {
    handleChangeMode: CallableFunction
};

type Inputs = {
    email: string;
    password: string;
};


const LoginMail: React.FC<PropsLoginMail> = ({handleChangeMode}) => {
    const [t] = useTranslation('web');
    const {auth, test} = useAuth(onSuccessSubmit);
    const {data} = useTest();
    const { register, handleSubmit } = useForm<Inputs>();


    const handleLogin: SubmitHandler<Inputs> = (data) => {
        test.mutate(data);
    };

    function onSuccessSubmit (data:unknown) {
        console.log(data);
    };
    
    return (
        <>
        <form onSubmit={handleSubmit(handleLogin)}>
            <div className="app-login-content">
                <AppFormInput
                    label=""
                    propsInputs={{ placeholder: t('login.inputs.email.placeholder'), type: 'email' ,...register('email') }}
                    withProvider={false}
                    />
                <AppFormInput
                    label=""
                    propsInputs={{ placeholder: t('login.inputs.password.placeholder'), type: 'password', ...register('password') }}
                    withProvider={false}
                    />
                <Button type="submit" colorScheme="yellow" className="w-full mt-4">
                    <span className="text-sm">{t('login.buttons.login')}</span>
                </Button>
                <div className="mt-2 text-center">
                    <span className="me-2 text-mode-white-primary">{t('login.labels.not-account')}</span>
                    <button className="text-sm text-blue-500 dark:text-blue-400" onClick={() => handleChangeMode()} >
                        {t('login.labels.register-account')}
                    </button>
                </div>
            </div>
        </form>
        </>
    );
};

export default LoginMail;