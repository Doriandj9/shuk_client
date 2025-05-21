import React from "react";
import AppModal from "./AppModal";
import { useTranslation } from "react-i18next";
import { IconButton } from "@mui/material";
import { Facebook, LinkIconSvg, WhatsAppSvg } from "./SVGComponents";
import { PostData } from "@/modules/web/hooks/post/PostI";
import { sendShareFacebook, sendShareWhatsApp } from "../utilities/consumerApis";
import { serializeText } from "../utilities/lettersAndComponents";
import { app } from "@/config/app";
import { useAppToast } from "../hooks/useAppToast";
import { DataUpdatePost } from "./AppEventClickPost";
import { useUpdateSharedPost } from "@/modules/web/hooks/post/hooks";

// const testUri = 'https://developers.facebook.com/docs/plugins';

type AppEventClickSharedProps = {
    render: (props: { open: CallableFunction }) => React.ReactNode;
    post: PostData;
};

const AppEventClickShared: React.FC<AppEventClickSharedProps> = ({ render, post }) => {
    const [open, setOpen] = React.useState(false);
    const { show } = useAppToast();
    const [t] = useTranslation('core');
    const { put } = useUpdateSharedPost(post.id);

    const openModa = () => {
        setOpen(true);
    };
    const urlPost = `${app.host}/view/posts/${post.id}?op=view`;

    const sharedWhatsApp = () => {
        const senText = serializeText(post.description || '') + '\n' + encodeURI(urlPost);

        if (sendShareWhatsApp(senText)) {
           updateData({ shared: post.shared + 1, type: post.type_post, total_shared: post.shared + 1, social_provider_id: app.socialProviders.whatsapp });
        }

    };

    const sharedFacebook = () => {
        if (sendShareFacebook(String(post.id))) {
            updateData({ shared: post.shared + 1, type: post.type_post, total_shared: post.shared + 1, social_provider_id: app.socialProviders.facebook });

        }
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(urlPost);
            show({ message: t('messages.success.shared.link-copied'), status: 'success' });
            setOpen(false);
        } catch (error) {
            console.error(error);
            show({ message: t('messages.errors.shared.copy-link'), status: 'error' });
        }
    };

    const updateData = (data: DataUpdatePost) => {
        put.mutate(data, {
            onError: () => {

            }
        });
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
                    <div className="w-full h-full flex items-center justify-center gap-4">
                        <div className="flex flex-col items-center lg:w-3/12 w-1/3">
                            <div className="bg-mode-comment rounded-full">
                                <IconButton onClick={sharedWhatsApp} sx={{ padding: 1.5 }}>
                                    <WhatsAppSvg className="w-8 h-8" />
                                </IconButton>
                            </div>
                            <span className="text-xs">WhatsApp</span>
                        </div>
                        <div className="flex flex-col items-center lg:w-3/12 w-1/3">
                            <div className="bg-mode-comment rounded-full">
                                <div className="fb-share-button"
                                    data-href="http://localhost:5173/" data-layout="" data-size="">
                                    <IconButton onClick={sharedFacebook} sx={{ padding: 1.5 }}>
                                        <Facebook className="w-8 h-8 text-blue-500" />
                                    </IconButton>
                                </div>
                            </div>
                            <span className="text-xs">Facebook</span>

                        </div>
                        <div className="flex flex-col items-center lg:w-3/12 w-1/3">
                            <div className="bg-mode-comment rounded-full">
                                <IconButton onClick={copyLink} sx={{ padding: 1.5 }}>
                                    <LinkIconSvg className="w-7 h-7" />
                                </IconButton>
                            </div>
                            <span className="text-xs">{t('messages.success.shared.copy-link')}</span>
                        </div>

                    </div>
                </div>
            </AppModal>

            {render({ open: openModa })}
        </>
    );
};

export default AppEventClickShared;