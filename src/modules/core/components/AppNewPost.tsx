import imgPost from "@/assets/img/undraw_wall_post_re_y78d.svg";
import { Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import AppModal from "./AppModal";
import AppFooterModal from "./AppFooterModal";
import SendIcon from "@mui/icons-material/Send";
import TabsPost from "@/modules/web/components/TabsPost";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";
import { ContentFormPost } from "../@types/post";
import { usePostStore } from "@/store/postStore";
import { useAppToast } from "../hooks/useAppToast";
import { useCreatePost } from "@/modules/web/hooks/post/hooks";
import { useStoreNotifyUser } from "@/modules/web/hooks/notifications/hook";
import { StoreNotificationUser } from "@/modules/web/hooks/notifications/notifications";
import { useBuildMessagePost } from "../hooks/useMessageAndTransPost";
import { useLanguageApp } from "@/store/language";

type ContextPostType = {
  hastContent: boolean;
  setHasContent: Dispatch<SetStateAction<boolean>>;
  content: ContentFormPost | null;
  setContent: Dispatch<SetStateAction<ContentFormPost>>;
};

export const CreatePostContext = React.createContext<ContextPostType>({
  hastContent: false,
  setHasContent: () => { },
  content: null,
  setContent: () => { },
});

const AppNewPost = () => {
  const [t] = useTranslation("core");
  const [tWeb] = useTranslation("web");
  const lang = useLanguageApp((state) => state.language);
  const navigate = useNavigate();
  const { show } = useAppToast();
  const { store } = useStoreNotifyUser();
  const buildMessageTrans = useBuildMessagePost();
  const user = useAuthStore((state) => state.user);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  const isLoginUser = useAuthStore((state) => state.isLogin);

  const [hastContent, setHasContent] = useState<boolean>(false);
  const [content, setContent] = useState<ContentFormPost>({
    type: "PT",
    modifier: {
      style: { fontSize: "1.5rem" },
      styleParagraph: {},
      isModifyBackground: false,
    },
    value: { html: "" },
  });

  const [isOpen, setIsOpen] = useState(false);

  const { create } = useCreatePost(user);

  const handleOpen = () => {
    if (!isLoginUser) {
      navigate(webRoutes.login.path);
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCreatePost = (e: FormEvent) => {
    e.preventDefault();
    try {
      const { type, modifier, value, categories } = usePostStore.getState();

      if (type !== "PT" && type !== "PI" && type !== "PV") {
        throw Error(tWeb("validations.messages.nan-type-post"));
      }

      if (type === "PI" && !value.file) {
        throw Error(tWeb("validations.messages.nan-img-post"));
      }

      if (type === "PT" && value.file) {
        value.file = null;
      }

      if (
        (type === "PT" && value.html === "") ||
        (type === "PT" && value.html === "<br>")
      ) {
        throw Error(tWeb("validations.messages.nan-payload-post"));
      }

      setIsOpen(false);

      const data = { type, payload: { type, modifier, value }, categories };

      create.mutate(data, {
        onSuccess: (response) => {
          if (isAdmin) {
            const { message, trans } = buildMessageTrans('NEW_POST', lang,response.description?.slice(0,25) + '...');
            const data: StoreNotificationUser = {
              type: 'TASP',
              action: 'New Post',
              message,
              trans,
              payload: {
                relative_path: `/view/posts/${response.id}`
              },
              receiver: user?.id,
              sender: user?.id
            };
            store.mutate(data, {
              onSuccess(){
                show({message: tWeb('notifications.new-notification'), status: 'success',position: 'bottom-center'});
              }
            });
          }
          show({ message: tWeb('register.labels.save-post'), status: 'success', position: 'top-center' });
          usePostStore.getState().reset();
        },
      });

    } catch (error: unknown) {
      if (error instanceof Error) {
        show({ message: error.message || "", status: "error" });
      } else {
        show({ message: "Error desconocido", status: "error" });
      }
    }
  };

  return (
    <>
      <CreatePostContext.Provider
        value={{ hastContent, setHasContent, content, setContent }}
      >
        <AppModal
          open={isOpen}
          onClose={handleClose}
          isNotCloseClick={false}
          sizeModal="auto"
          title={tWeb("titles.create-post")}
        >
          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={handleCreatePost}>
              <TabsPost />
              <AppFooterModal
                msgBtnCancel="Regresar"
                msgBtnDone="Publicar"
                positionBtn="center"
                isCustomButtons
              >
                <div className="w-10/12 m-auto">
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    startIcon={<SendIcon />}
                  >
                    <span className="text-sm md:text-lg">
                      {tWeb("descriptions.post")}
                    </span>
                  </Button>
                </div>
              </AppFooterModal>
            </form>
          </Box>
        </AppModal>
        <div className="app-insert-post">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.1 }}
            drag="x"
            onClick={() => handleOpen()}
            dragConstraints={{ left: -100, right: 100 }}
            className="flex flex-col justify-center text-center items-center"
            disabled={create.isPending}
          >
            <img src={imgPost} className="w-12 h-12" />
            <span className="text-mode-secondary text-[0.50rem] md:text-[0.75rem] font-black text-center">
              {t("post.new")}
            </span>
          </motion.button>
        </div>
      </CreatePostContext.Provider>
    </>
  );
};

export default AppNewPost;
