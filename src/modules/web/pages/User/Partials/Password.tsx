import AppInput from "@/modules/core/components/AppInput";
import { PasswordFormType, usePassword } from "@/modules/web/validations/passwordSchema";
import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Password = () => {
    const [t] = useTranslation('web');
    const user = useAuthStore((state) => state.user);
    const schema = usePassword(user?.has_password);
    const {control, handleSubmit} = useForm<PasswordFormType>({
        resolver: zodResolver(schema)
    });

    const saveChanges: SubmitHandler<PasswordFormType>=(data) => {
        console.log(data);
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
                            name: 'old_password'
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
                            name: 'password'
                        }}
                        control={control}
                        />

                    <AppInput 
                        className="my-6"
                        label={t('register.inputs.repeat-password.label')}
                        fullWidth
                        labelStrong
                        inputProps={{
                            name: 'repeat_password'
                        }}
                        control={control}
                        />

                    <Button type="submit" variant="contained" color="secondary">
                            {t('descriptions.save-changes')}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default Password;