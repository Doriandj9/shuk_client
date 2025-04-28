import { useTranslation } from "react-i18next";


type PropsHederContent = {
    isRegister: boolean;
    title?: string;
};
const HeaderContent: React.FC<PropsHederContent> = ({isRegister, title}) => {
    const [t] = useTranslation('web');
    const titleHeader = !title ? isRegister ? t('register.header.title') : t('login.header.title') : title;
    return (
        <>
            <div className="app-login-header">
                <h3 className="text-mode-white-primary">
                    { titleHeader }
                </h3>
                <aside>{t('login.header.aside')}</aside>
            </div>
        </>
    );
};

export default HeaderContent;