import AppInput from "@/modules/core/components/AppInput";
import AppToast from "@/modules/core/components/AppToast";
import { useUpdateConfig } from "@/modules/web/hooks/user/hook";
import { PasswordFormType, usePassword } from "@/modules/web/validations/passwordSchema";
import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import moment from "moment";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const Password = () => {
    const [t] = useTranslation('web');
    const [tCore] = useTranslation('core');
    const user = useAuthStore((state) => state.user);
    const schema = usePassword(user?.has_password);
    const { config } = useUpdateConfig();
    const reloadUser = useAuthStore((state) => state.updateUser);


    const { control, handleSubmit, reset } = useForm<PasswordFormType>({
        resolver: zodResolver(schema)
    });

    const saveChanges: SubmitHandler<PasswordFormType> = async (data) => {
        const idToast = moment().unix();
        const prom = new Promise((resolve, reject) => {
                config.mutateAsync(data)
                .then(resolve)
                .catch(reject);
        });
       
        toast.promise(prom, {
            id: idToast,
            loading: <AppToast id={idToast} message={tCore('messages.labels.app.loading')} fullWidth status="loading" />,
            success: (response) => {
                if(typeof response === 'object' && response && 'jwt' in response && typeof response.jwt === 'string'){
                    reloadUser(response.jwt);
                    reset({
                        old_password: '',
                        password: '',
                        repeat_password: ''
                    });
                    return <AppToast id={idToast} message={tCore('messages.labels.app.update-success')} fullWidth status="success" />;
                } 

                throw Error('Error in app');
            },
            error(err) {
                return <AppToast id={idToast} message={err.response.data.message} fullWidth status="error" />;
            },
            style: {
                margin: 0,
                padding: 0,
                border: 'none',
                outline: 0
            },
            position: 'top-center'
        });

    };

    
    return (
        <>
            <div className="p-0 md:ps-4">
                <h2 className="text-2xl font-bold ">{t('descriptions.password')}</h2>

                <form onSubmit={handleSubmit(saveChanges)}>
                    {
                        user?.has_password &&
                        <AppInput
                            className="mt-6"
                            label={t('register.inputs.odl-password.label')}
                            fullWidth
                            labelStrong
                            inputProps={{
                                name: 'old_password',
                                type: 'password'

                            }}
                            control={control}
                        />
                    }
                    <AppInput
                        className="mt-6"
                        label={t('register.inputs.new-password.label')}
                        fullWidth
                        labelStrong
                        inputProps={{
                            name: 'password',
                            type: 'password'

                        }}
                        control={control}
                    />

                    <AppInput
                        className="my-6"
                        label={t('register.inputs.repeat-password.label')}
                        fullWidth
                        labelStrong
                        inputProps={{
                            name: 'repeat_password',
                            type: 'password'
                        }}
                        control={control}
                    />

                    <Button type="submit" variant="contained" color="secondary" disabled={config.isPending}>
                        {t('descriptions.save-changes')}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default Password;