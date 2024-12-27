import React from "react";
import AppModal from "./AppModal";
import { useTranslation } from "react-i18next";

type AppEventClickSharedProps = {
    render: (props: {open: CallableFunction}) => React.ReactNode
};

const AppEventClickShared: React.FC<AppEventClickSharedProps> = ({ render }) => {
    const [open, setOpen] = React.useState(false);
    const [t] = useTranslation('core');
    const openModa  = () => {
        setOpen(true);
    };
    return (
        <>
            <AppModal
                open={open}
                title={t('messages.success.shared.share')}
                onClose={() => setOpen(false)}
            >
                <p>
                compartir
                </p>
            </AppModal>

            {render({open: openModa})}
        </>
    );
};

export default AppEventClickShared;