import { ThemeOptions } from "@/config/@types/app";
import AppSelect from "@/modules/core/components/AppSelect";
import AppSwitch from "@/modules/core/components/AppSwitch";
import AppToast from "@/modules/core/components/AppToast";
import { useUpdateUserConfig } from "@/modules/web/hooks/user/hook";
import { SecurityFormType, useSecuritySchema } from "@/modules/web/validations/securitySchema";
import { useAuthStore } from "@/store/auth";
import { useLanguageApp } from "@/store/language";
import { useThemeMode } from "@/store/themeMode";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import moment from "moment";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const languages = [
    {
        value: 'es',
        label: 'Spanish',
    },
    {
        value: 'en',
        label: 'English',
    }
];

type OpThemesType = {
    value: ThemeOptions,
    label: string;
};

const Security = () => {
    const user = useAuthStore((state) => state.user);
    const i18n = useTranslation("core")[1];
    const changeAppLanguage = useLanguageApp((state) => state.update);
    const changeTheme = useThemeMode((state) => state.update);
    const reloadUser = useAuthStore((state) => state.updateUser);

    const {config} = useUpdateUserConfig();

    const [t] = useTranslation('web');
    const [tCore] = useTranslation('core');
    const schema = useSecuritySchema();
    const themesOptions: OpThemesType[] = [
        {
            value: 'dark',
            label: tCore('messages.labels.app.dark')
        },
        {
            value: 'light',
            label: tCore('messages.labels.app.light')
        },
        {
            value: 'system',
            label: tCore('messages.labels.app.system')
        },
    ];
    const { control, handleSubmit, watch } = useForm<SecurityFormType>({
        defaultValues: {
            hidden_mail: user?.config?.hidden_mail,
            hidden_phone_number: user?.config?.hidden_phone_number,
            notifications_by_app: user?.config?.notifications_by_app,
            notifications_by_mail: user?.config?.notifications_by_mail,
            language: user?.config?.language,
            theme: user?.config?.theme
        },
        resolver: zodResolver(schema)
    });


    const saveChanges: SubmitHandler<SecurityFormType> = (data) => {
        const idToast =  moment().unix();
        toast.promise(config.mutateAsync(data,{
            onSuccess(response) {
                reloadUser(response.jwt);
            },
        }),{
            id: idToast,
            loading: tCore('messages.labels.app.loading'),
            success() {
                return <AppToast id={idToast} message={tCore('messages.labels.app.update-success')}  status="success" fullWidth />;
            },
            error: <AppToast id={idToast} message={tCore('messages.errors.requests.unknown')}  status="error" fullWidth />,
            position: "top-center"
        });
    };

    useMemo(() => {
        const watching = watch((value) => {
            const change: 'es' | 'en' = value.language == 'es' ? 'es' : 'en';
            changeAppLanguage(change);
            i18n.changeLanguage(change);
            changeTheme(value.theme ?? 'system');
        });
        return () => watching.unsubscribe();
    }, [watch]);

    return (
        <>
            <div className="p-0 md:ps-4">
                <h2 className="text-2xl font-bold ">{t('descriptions.privacy-safety')}</h2>
                <form onSubmit={handleSubmit(saveChanges)}>
                    <AppSelect
                        name="language"
                        label={t('descriptions.language')}
                        control={control}
                        options={languages}
                        labelStrong
                        placeholder=""
                        className="mt-6"
                    />

                    <AppSelect
                        name="theme"
                        label={t('descriptions.theme-app')}
                        control={control}
                        options={themesOptions}
                        labelStrong
                        placeholder=""
                        className="mt-2"
                    />

                    <AppSwitch
                        label={t('descriptions.has-notify-mail')}
                        name="notifications_by_mail"
                        control={control}
                        labelStrong
                        className="mt-2 -ml-2"
                        isChecked={user?.config?.notifications_by_mail}
                    />

                    <AppSwitch
                        label={t('descriptions.has-notify-app')}
                        name="notifications_by_app"
                        control={control}
                        labelStrong
                        className="mt-2 -ml-2"
                        propsFormControl={{ disabled: true }}
                        isChecked={user?.config?.notifications_by_app}

                    />

                    <AppSwitch
                        label={t('descriptions.hidden-mail')}
                        name="hidden_mail"
                        control={control}
                        labelStrong
                        className="mt-2 -ml-2"
                        isChecked={user?.config?.hidden_mail}

                    />

                    <AppSwitch
                        label={t('descriptions.hidden-phone')}
                        name="hidden_phone_number"
                        control={control}
                        labelStrong
                        className="mt-2 -ml-2"
                        isChecked={user?.config?.hidden_phone_number}

                    />

                    <div className="mt-4">
                        <Button variant="contained" color="secondary" type="submit" disabled={config.isPending}>
                            {t('descriptions.save-changes')}
                        </Button>
                    </div>
                </form>
            </div>

        </>
    );
};

export default Security;