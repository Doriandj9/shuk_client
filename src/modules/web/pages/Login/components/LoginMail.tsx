import AppFormInput from "@/modules/core/components/AppFormInput";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React, { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@web/hooks/auth/hooksAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginSchema } from "@/modules/web/validations/loginSchema";
import { LoadingAuthContext } from "../Login";
import { ResponseUserProps } from "@/modules/web/@types/web";
import { useAuthStore } from "@/store/auth";
import { Link, useNavigate } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";

type PropsLoginMail = {
  handleChangeMode: CallableFunction;
};

type Inputs = {
  email: string;
  password: string;
};

const LoginMail: React.FC<PropsLoginMail> = ({ handleChangeMode }) => {
  const navigate = useNavigate();
  const [t] = useTranslation("web");
  const { setAuthLogin, authLogin } = useContext(LoadingAuthContext);
  const { updateToken, updateUser } = useAuthStore((state) => state);

  const schema = useLoginSchema();

  const { auth } = useAuth(handleSuccessLogin);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const handleLogin: SubmitHandler<Inputs> = (data) => {
    auth.mutate(data, {
      onError: () => {
        reset({ password: "" });
      },
    });
  };

  function handleSuccessLogin(data: ResponseUserProps) {
    updateToken(data.token, data.time_expired_token);
    updateUser(data.jwt);
    navigate(webRoutes.home.path);
  }

  useEffect(() => {
    setAuthLogin(auth.isPending);
  }, [auth.isPending]);

  return (
    <>
      {/* <AppLoading isOpen={auth.isPending} /> */}
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="app-login-content">
          <AppFormInput
            label=""
            propsInputs={{
              placeholder: t("login.inputs.email.placeholder"),
              type: "email",
              ...register("email"),
              isReadOnly: auth.isPending,
            }}
            withProvider={false}
            validation={errors.email?.message}
            propsControl={{
              isInvalid: errors.email?.message ? true : false,
            }}
          />
          <AppFormInput
            label=""
            propsInputs={{
              placeholder: t("login.inputs.password.placeholder"),
              type: "password",
              ...register("password"),
              isReadOnly: auth.isPending,
            }}
            withProvider={false}
            validation={errors.password?.message}
            propsControl={{
              isInvalid: errors.password?.message ? true : false,
            }}
          />
          <Button
            type="submit"
            colorScheme="yellow"
            isLoading={auth.isPending}
            isDisabled={authLogin}
            className="w-full mt-4"
          >
            <span className="text-sm">{t("login.buttons.login")}</span>
          </Button>
          <div className="mt-2 text-center">
            <span className="me-2 text-mode-white-primary">
              {t("login.labels.not-account")}
            </span>
            <button
              className="text-sm text-blue-500 dark:text-blue-400"
              onClick={() => handleChangeMode()}
            >
              {t("login.labels.register-account")}
            </button>
          </div>

          <div className="mt-2 text-center">
            <Link
            to={webRoutes.forward_password.path}
              className="text-sm text-blue-500 dark:text-blue-400"
            >
              {t("register.labels.forward-password")}
            </Link>
          </div>

        </div>
      </form>
    </>
  );
};

export default LoginMail;
