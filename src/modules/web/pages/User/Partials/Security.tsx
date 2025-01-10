import { useAuthStore } from "@/store/auth";
import { useTranslation } from "react-i18next";

const Security = () => {
    const user = useAuthStore((state) => state.user);
    const [t] = useTranslation('web');
    console.log(user);
    return (
        <>
            <div className="p-0 md:ps-4">
                <h2 className="text-2xl font-bold ">{t('descriptions.privacy-safety')}</h2>
            </div>
        </>
    );
};

export default Security;