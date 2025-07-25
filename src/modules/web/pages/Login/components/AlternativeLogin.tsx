import { Google, Facebook } from "@core/components/SVGComponents";
import { Button } from "@chakra-ui/react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { LoginSocialFacebook } from "reactjs-social-login";
import { app } from "@/config/app";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/modules/web/hooks/auth/hooksAuth";
import { useContext, useEffect } from "react";
import { LoadingAuthContext } from "../Login";
import { toast } from "sonner";
import AppToast from "@/modules/core/components/AppToast";
import { useAuthStore } from "@/store/auth";
import { ResponseUserProps } from "@/modules/web/@types/web";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";
import { useAppLoading } from "@/store/loadingStore";
import { useAppToast } from "@/modules/core/hooks/useAppToast";

const AlternativeLogin = () => {
  const [t] = useTranslation("web");
  const navigate = useNavigate();

  const { authLogin, setAuthLogin } = useContext(LoadingAuthContext);
  const { updateToken, updateUser } = useAuthStore((state) => state);
  const { update } = useAppLoading((state) => state);
  const { authProvider, useQueryGoogleInfo } = useAuth(null, successLogin);
  const { show } = useAppToast();

  const { googleQuery } = useQueryGoogleInfo();

  const loginGoogle = useGoogleLogin({
    onSuccess: (response) => {
      googleQuery.mutate(response.access_token, {
        onSuccess(data) {
          authProvider.mutate(
            {
              id_client: data?.id,
              id_provider: app.socialProviders.google,
              payload: JSON.stringify(data),
              email: data?.email
            },
            {
              onError: () => {
                googleLogout();
              },
            }
          );
          setAuthLogin(authProvider.isPending);
        },
      });
    },
    onError: (error) =>
      toast.custom((id) => (
        <AppToast id={id} message={error.error_description} status="error" />
      )),
  });

  function successLogin(data: ResponseUserProps) {
    updateToken(data.token, data.time_expired_token);
    updateUser(data.jwt);
    update(false);
    navigate(webRoutes.home.path);
    show({ message: t('descriptions.welcome') });

  }

  useEffect(() => {
    update(authProvider.isPending);
  }, [authProvider.isPending]);

  return (
    <>
      <div className="app-login-content font-semibold">
        <Button
          onClick={() => loginGoogle()}
          colorScheme="gray"
          variant="outline"
          className="w-full flex gap-2 group items-center"
          isDisabled={authLogin}
        >
          <Google className="w-4 h-4" />
          <span className="text-mode-white dark:group-hover:text-black">
            {t("login.buttons.google")}
          </span>
        </Button>
        <LoginSocialFacebook
          appId={app.oAuthIdFacebook || ""}
          onResolve={(response) => {
            authProvider.mutate(
              {
                id_client: response.data?.userID,
                id_provider: app.socialProviders.facebook,
                payload: JSON.stringify(response.data),
                email: response.data?.email
              },
              {
                onError: () => { }
              }
            );
            setAuthLogin(authProvider.isPending);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <Button
            colorScheme="gray"
            variant="outline"
            className="w-full mt-2 flex gap-2 group items-center"
            isDisabled={authLogin}
          >
            <Facebook className="w-4 h-4 text-blue-500" />
            <span className="text-mode-white dark:group-hover:text-black">
              {t("login.buttons.facebook")}
            </span>
          </Button>
        </LoginSocialFacebook>
      </div>
    </>
  );
};

export default AlternativeLogin;
