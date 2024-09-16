import { useTranslation } from "react-i18next";


type PropsHederContent = {
    isRegister: boolean;
};
const HeaderContent: React.FC<PropsHederContent> = ({isRegister}) => {
    const [t] = useTranslation('web');
    return (
        <>
            <div className="app-login-header">
                <h3 className="text-mode-white-primary">
                    { isRegister ? t('register.header.title') : t('login.header.title')}
                </h3>
                <aside>{t('login.header.aside')}</aside>
            </div>
        </>
    );
};

export default HeaderContent;