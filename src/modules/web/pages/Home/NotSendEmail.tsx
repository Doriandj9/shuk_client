import { webRoutes } from "@/config/webRoutes";
import AppLoading from "@/modules/core/components/AppLoading";
import ComponentChakra from "@/modules/core/components/ComponentChakra";
import { useAppToast } from "@/modules/core/hooks/useAppToast";
import AppLayout from "@/modules/core/layouts/AppLayout";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import HeaderImg from "../Login/components/HeaderImg";
import HeaderContent from "../Login/components/HeaderContent";
import AppFormInput from "@/modules/core/components/AppFormInput";
import { Button } from "@chakra-ui/react";
import { useNotEmailsSchema } from "../../validations/securitySchema";
import { usePutNotEmails } from "../../hooks/user/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotEmailsForm } from "../../hooks/user/UserI";
import { Controller, SubmitHandler, useForm } from "react-hook-form";




export const NotSendEmails = () => {
    const { show } = useAppToast();
    const navigate = useNavigate();
    const [t] = useTranslation('web');
    const [t_core] = useTranslation('core');
    const schema = useNotEmailsSchema();
    const { put } = usePutNotEmails();

    const { register, handleSubmit, formState: { errors }, control } = useForm<NotEmailsForm>({
        resolver: zodResolver(schema)
    });

    const onSave: SubmitHandler<NotEmailsForm> = (data) => {
        put.mutate({ ...data }, {
            onSuccess() {
                show({ message: t_core('messages.labels.app.update-success') });
                navigate(webRoutes.login.path);
            }
        });
    };


    return (
        <>
            <AppLayout>
                <AppLoading isOpen={put.isPending} />
                <ComponentChakra>

                    <div className="app-container-fade w-full justify-center h-full">
                        <div className="app-login-content">
                            <HeaderImg />
                            <HeaderContent isRegister={true} />
                            <form onSubmit={handleSubmit(onSave)}>

                                <AppFormInput
                                    label={t('register.inputs.email.label')}
                                    propsInputs={{
                                        placeholder: t('register.inputs.email.placeholder'),
                                        ...register('email')
                                    }}
                                    propsControl={{
                                        isInvalid: Boolean(errors.email?.message)
                                    }}
                                    validation={errors.email?.message}
                                    withProvider={false}
                                />

                                <Controller
                                    name="not_email"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <div className="flex gap-2 mt-3 items-center">
                                                <input id="check_not_email" type="checkbox" onChange={field.onChange} value={String(field.value)}
                                                    className="w-5 h-5 rounded-xl"
                                                    onBlur={field.onBlur}
                                                />
                                                <label htmlFor="check_not_email" className="text-mode-primary">{'No deseo recibir mas correos promocionales.'}</label>

                                            </div>
                                            <span className="text-red-500 dark:text-red-400 text-xs">{fieldState?.error?.message}</span>
                                        </>
                                    )}

                                />



                                <Button
                                    disabled={put.isPending}
                                    isLoading={put.isPending}
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