import AppFormInput from "@/modules/core/components/AppFormInput";
import { useCompleteRegister } from "@/modules/web/hooks/auth/hooksAuth";
import { DataRegisterInitial, RegisterUser } from "@/modules/web/hooks/auth/request";
import { useRegisterSchemaComplete } from "@/modules/web/validations/registerSchema";
import { Button } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLanguageApp } from "@/store/language";
import AppLayout from "@/modules/core/layouts/AppLayout";
import ComponentChakra from "@/modules/core/components/ComponentChakra";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";
import { showError } from "@/modules/core/utilities/errors";
import HeaderImg from "./HeaderImg";
import HeaderContent from "./HeaderContent";
import { AppPhoneNumberInput } from "@/modules/core/components/AppPhoneNumberInput";
import { useAuthStore } from "@/store/auth";


export const CompleteRegisterMail = () => {
    const params = useParams();
    let data: string | DataRegisterInitial = '';

    const { updateToken, updateUser } = useAuthStore((state) => state);
      const navigate = useNavigate();


    const [t] = useTranslation('web');
    const lang = useLanguageApp((state) => state.language);
    const registerSchema = useRegisterSchemaComplete();


    const { register, handleSubmit, formState: { errors }, control } = useForm<RegisterUser>({
        resolver: zodResolver(registerSchema)
    });


    const { register: completeRegister } = useCompleteRegister();

    const handleRegister = (data: RegisterUser) => {
        delete data.password_confirmation;
        completeRegister.mutate({ ...data, language: lang }, {
            onSuccess(response) {
                updateToken(response.token, response.time_expired_token);
                updateUser(response.jwt);
                navigate(webRoutes.home.path);
            }
        });
    };


    try {
        data = JSON.parse(atob(params.token || '')) as DataRegisterInitial;
    } catch (error) {
        showError(error as Error);
        return <Navigate to={webRoutes.home.path} />;
    }




    return (
        <>
            <AppLayout>
                <ComponentChakra>

                    <div className="app-container-fade w-full justify-center h-full">
                        <div className="app-login-content">
                            <HeaderImg />
                            <HeaderContent isRegister={true} />
                            <form onSubmit={handleSubmit(handleRegister)}>
                                <AppFormInput
                                    label={t('register.inputs.full-name.label')}
                                    propsInputs={{
                                        placeholder: t('register.inputs.full-name.placeholder'),
                                        type: 'text',
                                        defaultValue: data.full_name,
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
                                        ...register('email', { value: data.email })
                                    }}
                                    propsControl={{
                                        isInvalid: Boolean(errors.email?.message)
                                    }}
                                    disabledInput
                                    validation={errors.email?.message}
                                    withProvider={false}
                                />

                                <AppFormInput
                                    label={t('register.inputs.username.label')}
                                    propsInputs={{
                                        placeholder: t('register.inputs.username.placeholder'),
                                        type: 'text',
                                        defaultValue: '',
                                        ...register('username')
                                    }}
                                    propsControl={{
                                        isInvalid: errors.username?.message ? true : false
                                    }}
                                    withProvider={false}
                                    validation={errors.username?.message}
                                />
                                <AppFormInput
                                    label={t('register.inputs.birthday.label')}
                                    propsInputs={{
                                        placeholder: t('register.inputs.birthday.placeholder'),
                                        type: 'date',
                                        ...register('birthday')
                                    }}
                                    propsControl={{
                                        isInvalid: errors.birthday?.message ? true : false
                                    }}
                                    withProvider={false}
                                    validation={errors.birthday?.message}
                                />

                                <AppPhoneNumberInput
                                    name="phone"
                                    control={control}
                                    labelStrong
                                    fullWidth
                                    label={t('register.inputs.phone.label')}
                                    placeholder={t('register.inputs.phone.placeholder')}
                                    className="mt-2"
                                />


                                <AppFormInput
                                    label={t('register.inputs.new-password.label')}
                                    propsInputs={{
                                        placeholder: t('register.inputs.new-password.placeholder'),
                                        defaultValue: '',
                                        type: 'password',
                                        ...register('password')
                                    }}
                                    propsControl={{
                                        isInvalid: errors.password?.message ? true : false
                                    }}
                                    withProvider={false}
                                    validation={errors.password?.message}
                                />

                                <AppFormInput
                                    label={t('register.inputs.repeat-password.label')}
                                    propsInputs={{
                                        placeholder: '********',
                                        type: 'password',
                                        ...register('password_confirmation')
                                    }}
                                    propsControl={{
                                        isInvalid: errors.password_confirmation?.message ? true : false
                                    }}
                                    withProvider={false}
                                    validation={errors.password_confirmation?.message}
                                />
                                <Button
                                    disabled={completeRegister.isPending}
                                    isLoading={completeRegister.isPending}
                                    type="submit" colorScheme="yellow" className="w-full mt-4">
                                    <span className="text-sm">{t('register.buttons.save')}</span>
                                </Button>
                            </form>
                            {/* <div className="mt-2 text-center">
                    <span className="me-2 text-mode-white-primary">{t('register.labels.whit-account')}</span>
                    <button className="text-sm text-blue-500" onClick={() => handleChangeMode()} >
                        {t('register.labels.login')}
                    </button>
                </div> */}
                        </div>
                    </div>
                </ComponentChakra>
            </AppLayout>

        </>
    );
};


