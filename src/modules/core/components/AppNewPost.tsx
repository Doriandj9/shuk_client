import imgPost from "@/assets/img/undraw_wall_post_re_y78d.svg";
import { Box, Button, Divider } from "@mui/material";
import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import AppItem from "./AppItem";
import AppModal from "./AppModal";
import AppFooterModal from "./AppFooterModal";
import SendIcon from "@mui/icons-material/Send";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import ImageIcon from '@mui/icons-material/Image';
import { SubmitHandler,useForm } from "react-hook-form";
import { FormPostSchema } from "../validations/postSchema";

export type ContentFormPost = {
  description: string,
};

type ContextPostType = {
  hastContent: boolean;
  setHasContent: Dispatch<SetStateAction<boolean>>;
  content?: ContentFormPost;
};

const CreatePostContext = React.createContext<ContextPostType>({ hastContent: false, setHasContent: () => { } });

const AppNewPost = () => {
  const [t] = useTranslation("core");
  const [tWeb] = useTranslation("web");
  const [hastContent, setHasContent] = useState<boolean>(false);
  const { handleSubmit } = useForm<FormPostSchema>();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCreatePost = SubmitHandler<FormPostSchema> = (data) => {

  };
 

  return (
    <>
      <CreatePostContext.Provider
        value={{ hastContent, setHasContent }}
      >
        <AppModal
          open={isOpen}
          onClose={handleClose}
          isNotCloseClick={false}
          sizeModal="3xl"
          title={tWeb("titles.create-post")}
        >
          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={handleSubmit(handleCreatePost)}>
            <div className="app-post-grid">
              <div className="post-grid-content">
                <AppItem>content</AppItem>
              </div>
              <div className="post-grid-navbar">
                <AppItem>
                  <div className="flex justify-center items-center flex-row md:flex-col">
                    <button className="post-navbar-item ">
                      <TextFieldsIcon fontSize="large" color="secondary" />
                      <span className="">
                        {tWeb('descriptions.post-text')}
                      </span>
                    </button>
                    <div className="my-2 w-4 md:w-full">
                      <Divider />
                    </div>
                    <button className="post-navbar-item">
                      <ImageIcon fontSize="large" color="success" />
                      <span className="">
                        {tWeb('descriptions.post-img')}
                      </span>
                    </button>
                    <div className="my-2 w-4 md:w-full">
                      <Divider />
                    </div>
                    <button className="post-navbar-item ">
                      <VideoCameraBackIcon fontSize="large" color="warning" />
                      <span className="">
                        {tWeb('descriptions.post-video')}
                      </span>
                    </button>
                  </div>
                </AppItem>
              </div>
              <div className="post-grid-menu">
                <AppItem>Menu</AppItem>
              </div>
            </div>

            <AppFooterModal
              msgBtnCancel="Regresar"
              msgBtnDone="Publicar"
              positionBtn="center"
              isCustomButtons
            >
              <div className="w-10/12 m-auto">
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  startIcon={<SendIcon />}
                  disabled={!hastContent}
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
