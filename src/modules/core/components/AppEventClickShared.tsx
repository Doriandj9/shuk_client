import React from "react";
import AppModal from "./AppModal";
import { useTranslation } from "react-i18next";
import { IconButton } from "@mui/material";
import { Facebook, WhatsAppSvg } from "./SVGComponents";
import { PostData } from "@/modules/web/hooks/post/PostI";
import { sendShareWhatsApp } from "../utilities/consumerApis";
import { serializeText } from "../utilities/lettersAndComponents";
import { app } from "@/config/app";


type AppEventClickSharedProps = {
    render: (props: {open: CallableFunction}) => React.ReactNode;
    post: PostData;
};

const AppEventClickShared: React.FC<AppEventClickSharedProps> = ({ render, post }) => {
    const [open, setOpen] = React.useState(false);
    const [t] = useTranslation('core');
    const openModa  = () => {
        setOpen(true);
    };

    const sharedWhatsApp = () => {
        const urlPost = `${app.host}/view/posts/${post.id}?op='view'`;
        const senText = serializeText(post.description || '') + '\n' + encodeURI(urlPost);

        if(sendShareWhatsApp(senText)){
            console.log('compartido en ws');
        }

    };

    const sharedFacebook = () => {

    };

    return (
        <>
            <AppModal
                open={open}
                title={t('messages.success.shared.share')}
                onClose={() => setOpen(false)}
                sizeModal="lg"
            >
               <div className="w-full h-full flex items-center justify-center">
                    <div>
                        <IconButton onClick={sharedWhatsApp}>
                            <WhatsAppSvg className="w-8 h-8" />
                        </IconButton>
                        <IconButton onClick={sharedFacebook}>
                            <Facebook  className="w-8 h-8 text-blue-500" />
                        </IconButton>
                    </div>
               </div>
            </AppModal>

            {render({open: openModa})}
        </>
    );
};

export default AppEventClickShared;