import imgPost from "@/assets/img/undraw_wall_post_re_y78d.svg";
import { Box, Button, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AppItem from "./AppItem";
import AppModal from "./AppModal";
import AppFooterModal from "./AppFooterModal";
import SendIcon from "@mui/icons-material/Send";
import TextFieldsIcon from '@mui/icons-material/TextFields';

const AppNewPost = () => {
  const [t] = useTranslation("core");
  const [tWeb] = useTranslation("web");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <AppModal
        open={isOpen}
        onClose={handleClose}
        isNotCloseClick={false}
        sizeModal="3xl"
        title={tWeb("titles.create-post")}
      >
        <Box sx={{ flexGrow: 1 }}>
          <div className="app-post-grid">
            <div className="post-grid-content">
              <AppItem>content</AppItem>
            </div>
            <div className="post-grid-navbar">
              <AppItem>
                <div className="flex justify-center items-center flex-col">
                  <button className="post-navbar-item ">
                    <TextFieldsIcon fontSize="large" />
                    <span className="text-center text-xs text-mode-primary">
                      Publicación de texto
                    </span>
                  </button>
                  <div className="my-2 w-full"> 
                    <Divider  />
                  </div>
                  <button className="post-navbar-item">dasda</button>
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
              >
                <span className="text-sm md:text-lg">
                  {tWeb("descriptions.post")}
                </span>
              </Button>
            </div>
          </AppFooterModal>
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
    </>
  );
};

export default AppNewPost;
