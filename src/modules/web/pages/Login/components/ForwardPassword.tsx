import AppFormInput from "@/modules/core/components/AppFormInput";
import { useCompleteRegister, useForwardPassword } from "@/modules/web/hooks/auth/hooksAuth";
import { ForwardPasswordInputs } from "@/modules/web/hooks/auth/request";
import { useForwardPasswordSchema } from "@/modules/web/validations/registerSchema";
import { Button } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AppLayout from "@/modules/core/layouts/AppLayout";
import ComponentChakra from "@/modules/core/components/ComponentChakra";
import HeaderImg from "./HeaderImg";
import HeaderContent from "./HeaderContent";
import AppLoading from "@/modules/core/components/AppLoading";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";


export const ForwardPassword = () => {
    const { forward } = useForwardPassword();
    const [t] = useTranslation('web');
    const registerSchema = useForwardPasswordSchema();
    const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors } } = useForm<ForwardPasswordInputs>({
        resolver: zodResolver(registerSchema)
    });


    const { register: completeRegister } = useCompleteRegister();

    const handleRegister = (data: ForwardPasswordInputs) => {
        forward.mutate(data);
    };




    return (
        <>
            <AppLayout>
                <AppLoading isOpen={forward.isPending} />
                <ComponentChakra>

                    <div className="app-container-fade w-full justify-center h-full">
                        <div className="app-login-content">
                            <HeaderImg />
                            <HeaderContent isRegister={true} title={t('login.labels.recovery-password-title')} />
                            {
                                forward.isSuccess ?
                                    <>
                                        <div dangerouslySetInnerHTML={{ __html: t('login.labels.notify-forward-password') }}
                                            className="app-container-fade p-2 mt-2 text-mode-white" />
                                        <div>
                                            <Button
                                                onClick={() => navigate(webRoutes.login.path)}
                                                colorScheme="yellow" className="w-full mt-4">
                                                <span className="text-sm">{t('login.header.title')}</span>
                                            </Button>
                                        </div>
                                    </>
                                    :

                                    <form onSubmit={handleSubmit(handleRegister)}>
                                        <AppFormInput
                                            label={t('register.inputs.email.label')}
                                            propsInputs={{
                                                placeholder: t('register.inputs.email.placeholder'),
                                                type: 'email',
                                                ...register('email')
                                            }}
                                            propsControl={{
                                                isInvalid: errors.email?.message ? true : false
                                            }}
                                            withProvider={false}
                                            validation={errors.email?.message}
                                        />
                                        <Button
                                            disabled={completeRegister.isPending}
                                            isLoading={completeRegister.isPending}
                                            type="submit" colorScheme="yellow" className="w-full mt-4">
                                            <span className="text-sm">{t('register.buttons.save')}</span>
                                        </Button>
                                    </form>

                            }

                        </div>
                    </div>
                </ComponentChakra>
            </AppLayout>

        </>
    );
};


