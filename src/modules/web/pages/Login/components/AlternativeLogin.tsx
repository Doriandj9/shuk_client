import { Google, Facebook } from "@core/components/SVGComponents";
import { Button } from "@chakra-ui/react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { LoginSocialFacebook } from "reactjs-social-login";
import { app } from "@/config/app";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/modules/web/hooks/auth/hooksAuth";
import { useContext, useEffect, useState } from "react";
import { LoadingAuthContext } from "../Login";
import AppLoading from "@/modules/core/components/AppLoading";
import { toast } from "sonner";
import AppToast from "@/modules/core/components/AppToast";

const AlternativeLogin = () => {
  const [t] = useTranslation("web");
  const { authLogin, setAuthLogin } = useContext(LoadingAuthContext);
  const [googleUserToken, setGoogleUserToken] = useState<string | null>(null);

  const { authProvider, useGetInfoGoogle } = useAuth(null, successLogin);

  const { data, isLoading } = useGetInfoGoogle(googleUserToken || "");

  const loginGoogle = useGoogleLogin({
    onSuccess: (response) => {
      setGoogleUserToken(response.access_token);
    },
    onError: (error) =>
      toast.custom((id) => (
        <AppToast id={id} message={error.error_description} status="error" />
      )),
  });

  function successLogin(data: unknown) {
    console.log(data);
  }
  
  useEffect(() => {
    if (data) {
      authProvider.mutate(
        {
          id_client: data?.id,
          id_provider: app.socialProviders.google,
          payload: JSON.stringify(data),
        },
        {
          onError: () => {
            googleLogout();
          },
        }
      );
      setAuthLogin(authProvider.isPending);
    }
  }, [data]);

  return (
    <>
      <AppLoading isOpen={isLoading || authProvider.isPending} />
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
                id_provider: app.socialProviders.google,
                payload: JSON.stringify(data),
              },
              {
                onError: () => {}
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
