import AppFormInput from "@/modules/core/components/AppFormInput";
import { useCompleteRegister, useResetPassword, useVerifyTokenResetPassword } from "@/modules/web/hooks/auth/hooksAuth";
import {  ResetPasswordForm } from "@/modules/web/hooks/auth/request";
import { useResetPasswordPublicSchema } from "@/modules/web/validations/registerSchema";
import { Button } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AppLayout from "@/modules/core/layouts/AppLayout";
import ComponentChakra from "@/modules/core/components/ComponentChakra";
import { useNavigate, useParams } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";
import HeaderImg from "./HeaderImg";
import HeaderContent from "./HeaderContent";
import AppLoading from "@/modules/core/components/AppLoading";
import { useEffect } from "react";
import { showError } from "@/modules/core/utilities/errors";
import { useAppToast } from "@/modules/core/hooks/useAppToast";


export const RecoveryPassword = () => {
    const params = useParams();
    const token = params.token;
    const {data, isLoading, error} = useVerifyTokenResetPassword(token);
    const {forward} = useResetPassword();
    const {show} = useAppToast();
    const navigate = useNavigate();
    const [t] = useTranslation('web');
    const [t_core] = useTranslation('core');
    const registerSchema = useResetPasswordPublicSchema();


    const { register, handleSubmit, formState: { errors }, reset } = useForm<ResetPasswordForm>({
        resolver: zodResolver(registerSchema)
    });


    const { register: completeRegister } = useCompleteRegister();

    const handleRegister = (data: ResetPasswordForm) => {
        delete data.password_confirmation;
        forward.mutate({ ...data }, {
            onSuccess() {
                show({message: t_core('messages.labels.app.update-success')});
                navigate(webRoutes.login.path);
            }
        });
    };


    useEffect(() => {
        if(error){
            showError(error);
            navigate(webRoutes.home.path);
        }
    },[error]);

    useEffect(() => {
        if(data){
            reset({
                email: data?.email
            });
        }
    }, [data]);


    return (
        <>
            <AppLayout>
                <AppLoading isOpen={isLoading || forward.isPending} />
                <ComponentChakra>

                    <div className="app-container-fade w-full justify-center h-full">
                        <div className="app-login-content">
                            <HeaderImg />
                            <HeaderContent isRegister={true} />
                            <form onSubmit={handleSubmit(handleRegister)}>
                               
                                <AppFormInput
                                    label={t('register.inputs.email.label')}
                                    propsInputs={{
                                        placeholder: t('register.inputs.email.placeholder'),
                                        ...register('email')
                                    }}
                                    propsControl={{
                                        isInvalid: Boolean(errors.email?.message)
                                    }}
                                    disabledInput
                                    validation={errors.email?.message}
                                    withProvider={false}
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


