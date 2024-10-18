import imgPost from "@/assets/img/undraw_wall_post_re_y78d.svg";
import { Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import AppModal from "./AppModal";
import AppFooterModal from "./AppFooterModal";
import SendIcon from "@mui/icons-material/Send";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormPostSchema, usePostSchema } from "../validations/postSchema";
import { ZodType, ZodTypeDef } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TabsPost from "@/modules/web/components/TabsPost";
import * as z from 'zod';
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";
import { ContentFormPost } from "../@types/post";



type PostTypeSchemaState = [string, ZodType<unknown, ZodTypeDef>];

type ContextPostType = {
  hastContent: boolean;
  setHasContent: Dispatch<SetStateAction<boolean>>;
  content: ContentFormPost | null;
  setContent: Dispatch<SetStateAction<ContentFormPost>>
};

type ContextPostSchema<T> = {
  defaultSchema: T;
  changeSchema: (schema: 0 | 1 | 2) => void;
};

type TypeWithScheme = [
  [string, ZodType<unknown, ZodTypeDef>],
  [string, ZodType<unknown, ZodTypeDef>],
  [string, ZodType<unknown, ZodTypeDef>]
];



export const CreatePostContext = React.createContext<ContextPostType>({ hastContent: false, setHasContent: () => { }, content: null, setContent : () => { }});
export const SchemasPostContext = React.createContext<ContextPostSchema<PostTypeSchemaState>>({ defaultSchema: ['PT', z.object({})], changeSchema: () => { } });



const AppNewPost = () => {
  const [t] = useTranslation("core");
  const [tWeb] = useTranslation("web");
  const navigate = useNavigate();

  const isLoginUser = useAuthStore((state) => state.isLogin);

  const schema = usePostSchema();
  const schemaPosts: TypeWithScheme = [['PT', schema.partial({ file: true })], ['PI', schema], ['PV', schema]];

  const [defaultSchema, setDefaultSchema] = useState<PostTypeSchemaState>(schemaPosts[0]);

  const [hastContent, setHasContent] = useState<boolean>(false);
  const [content, setContent] = useState<ContentFormPost>({type:'PT', modifier: {style: {}}, value: {}});

  const methods = useForm<FormPostSchema>({
    resolver: zodResolver(defaultSchema[1])
  });

  const [isOpen, setIsOpen] = useState(false);

  const changeSchema = (schema: 0 | 1 | 2) => {
    setDefaultSchema(schemaPosts[schema]);
  };

  const handleOpen = () => {
    if(!isLoginUser){
      navigate(webRoutes.login.path);
    };
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCreatePost: SubmitHandler<FormPostSchema> = (data) => {
    console.log(data);
  };

  console.log(methods.formState.errors.payloadPost?.message);

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
            <SchemasPostContext.Provider value={{ defaultSchema, changeSchema }}>

              <FormProvider {...methods}>

                <form onSubmit={methods.handleSubmit(handleCreatePost)}>
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
                        disabled={hastContent}
                      >
                        <span className="text-sm md:text-lg">
                          {tWeb("descriptions.post")}
                        </span>
                      </Button>
                    </div>
                  </AppFooterModal>
                </form>

              </FormProvider>
            </SchemasPostContext.Provider>
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
