import AppModal from "@/modules/core/components/AppModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AppInput from "@/modules/core/components/AppInput";
import AppLoading from "@/modules/core/components/AppLoading";
import { useAppToast } from "@/modules/core/hooks/useAppToast";
import { ResetPasswordForm } from "@/modules/web/hooks/auth/request";
import { useResetPasswordPublicSchema } from "@/modules/web/validations/registerSchema";
import { useEffect } from "react";
import { useResetPassword } from "../hooks/auth/hooksAuth";

type ModalCategoriesProps = {
    isOpen: boolean;
    onClose: CallableFunction;
    id: string;
    full_name: string;
    email: string;

};

export const ModalChangePass: React.FC<ModalCategoriesProps> = ({ isOpen, onClose,full_name,email }) => {
    const [t] = useTranslation('web');
    const [tCore] = useTranslation('core');
    const schema = useResetPasswordPublicSchema();
    const {forward} = useResetPassword();

    const { show } = useAppToast();

    const { control, handleSubmit, reset } = useForm<ResetPasswordForm>({
        resolver: zodResolver(schema)
    });



    const save: SubmitHandler<ResetPasswordForm> = (data) => {
        delete data.password_confirmation;
        forward.mutate({ ...data }, {
            onSuccess() {
                show({message: tCore('messages.labels.app.update-success')});
                onClose();
            }
        });
    };


    useEffect(() => {
      reset({
        email: email
      });
    },[full_name,email]);

    return (
        <>
            <AppLoading isOpen={forward.isPending} />
            <AppModal
                open={isOpen}
                onClose={() => onClose()}
                title={''}
                sizeModal="3xl"
            >
                <div className="w-full">
                    <form onSubmit={handleSubmit(save)}>
                        <div className="flex">
                            <div className="w-full">
                                <AppInput
                                    labelStrong
                                    control={control}
                                    inputProps={{
                                        disabled: true,
                                        value: full_name
                                    }}
                                    label={t('register.inputs.full-name.label')}
                                    fullWidth
                                />

                                <AppInput
                                    labelStrong
                                    control={control}
                                    inputProps={{
                                        name: 'email',
                                        value: email,
                                        disabled: true
                                    }}
                                    label={t('register.inputs.email.label')}
                                    fullWidth
                                />

                                <AppInput
                                    labelStrong
                                    control={control}
                                    inputProps={{
                                        name: 'password',
                                        placeholder: t('register.inputs.new-password.placeholder'),
                                        type: 'password',
                                    }}
                                    label={t('register.inputs.new-password.label')}
                                    fullWidth
                                />
                                <AppInput
                                    labelStrong
                                    control={control}
                                    inputProps={{
                                        name: 'password_confirmation',
                                        placeholder: t('register.inputs.new-password.placeholder'),
                                        type: 'password',
                                    }}
                                    label={t('register.inputs.repeat-password.label')}
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4 gap-2">
                            <Button variant="contained" color="primary" onClick={() => onClose()}>
                                {tCore('messages.labels.app.return')}
                            </Button>
                            <Button type="submit" variant="contained" color="secondary" >

                                {t('descriptions.save-changes')}

                            </Button>
                        </div>
                    </form>
                </div>

            </AppModal>
        </>
    );
};