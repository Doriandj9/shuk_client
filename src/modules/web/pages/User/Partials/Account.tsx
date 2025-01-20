import AppInput from "@/modules/core/components/AppInput";
import { useAppToast } from "@/modules/core/hooks/useAppToast";
import { useUpdateConfig } from "@/modules/web/hooks/user/hook";
import { useAccountSchema } from "@/modules/web/validations/accountSchema";
import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type AccountFormType = {
    username: string;
    email: string;
};



const Account = () => {
    const user = useAuthStore((state) => state.user);
    const [t] = useTranslation('web');
    const { toastPromise } = useAppToast();
    const { config } = useUpdateConfig();
    const schema = useAccountSchema();
    const [tCore] = useTranslation('core');
    const reloadUser = useAuthStore((state) => state.updateUser);




    const { control, handleSubmit } = useForm<AccountFormType>({
        defaultValues: {
            email: user?.email ?? 'error',
            username: user?.username ?? 'error'
        },
        resolver: zodResolver(schema)
    });



    const saveChanges: SubmitHandler<AccountFormType> = (data) => {
        const prom = new Promise((resolve, reject) => {
            config.mutateAsync(data)
                .then(resolve)
                .catch(reject);
        });

        toastPromise(
            prom,
            tCore('messages.labels.app.update-success'),
            undefined,
            (response) => {
                if(response && 'jwt' in response && typeof response.jwt === 'string' ){
                    reloadUser(response.jwt);
                }
            },
        );

    };

    return (
        <>
            <div className="p-0 md:ps-4">
                <h2 className="text-2xl font-bold ">{t('descriptions.account')}</h2>
                <form onSubmit={handleSubmit(saveChanges)} >
                    <AppInput
                        className="mt-8"
                        label={t('register.inputs.username.label')}
                        labelStrong
                        inputProps={{
                            placeholder: t('register.inputs.username.placeholder'),
                            name: 'username',
                            helperText: t('helpers.username-unique')
                        }}
                        control={control}
                    />

                    <AppInput
                        className="mt-4"
                        label={t('register.inputs.email.label')}
                        labelStrong
                        fullWidth
                        inputProps={{
                            placeholder: t('login.inputs.email.placeholder'),
                            name: 'email',
                            disabled: true,
                            helperText: t('helpers.email-not-show')
                        }}
                        control={control}
                    />

                    <div className="mt-6 mb-2">
                        <Button type="submit" variant="contained" color="secondary" disabled={config.isPending}>
                            {t('descriptions.save-changes')}
                        </Button>

                    </div>
                </form>
            </div>

        </>
    );
};

export default Account;