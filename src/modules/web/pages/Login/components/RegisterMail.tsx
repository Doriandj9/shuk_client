import AppFormInput from "@/modules/core/components/AppFormInput";
import { useRegisterSchema } from "@/modules/web/validations/registerSchema";
import { Button } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type PropsLoginMail = {
    handleChangeMode: CallableFunction
};

type Inputs = {
    full_name: string;
    email: string;
    birthday: string;
    phone: string;
};

const RegisterMail: React.FC<PropsLoginMail> = ({ handleChangeMode }) => {
    const [t] = useTranslation('web');
    const registerSchema = useRegisterSchema();
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(registerSchema)
    });

    const handleRegister = (data: Inputs) => {
        console.log(data);
    };


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

                    <Button type="submit" colorScheme="yellow" className="w-full mt-4">
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
