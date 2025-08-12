import { Google, Facebook } from "@core/components/SVGComponents";
import { Button } from "@chakra-ui/react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { api, app } from "@/config/app";
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
import { isAndroid } from 'react-device-detect'; // Para detectar si es Android
import { routesApi } from "@/config/apiRoutes";

const AlternativeLogin = () => {
  const [t] = useTranslation("web");
  const navigate = useNavigate();

  const { authLogin, setAuthLogin } = useContext(LoadingAuthContext);
  const { updateToken, updateUser } = useAuthStore((state) => state);
  const { update } = useAppLoading((state) => state);
  const { authProvider, useQueryGoogleInfo } = useAuth(null, successLogin);
  const { show } = useAppToast();

  const url = new URL(window.location.href);
  const token = url.searchParams.get('token');


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
          if (isAndroid) {
            window.close(); // Cierra la ventana emergente en Android
          }
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

  const loginWithFacebook = () => {
    const fbAuthUrl = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${app.oAuthIdFacebook}&redirect_uri=${encodeURIComponent(api.getUri() + '/' + routesApi.public.get_data_facebook)}&response_type=code&scope=email,public_profile`;
    window.open(fbAuthUrl, '_blank', 'width=500,height=600');

  };

  useEffect(() => {
    update(authProvider.isPending);
  }, [authProvider.isPending]);


  useEffect(() => {
    if (token) {
      update(true);
      localStorage.setItem('__t_dto', token);
      window.close();
    }

  }, [token]);


  useEffect(() => {
    const onStorageChange = (event: StorageEvent) => {
      if (event.key === '__t_dto') {
        // location.replace('/?f=true');
        const token = localStorage.getItem('__t_dto');
        if (token) {
          const response = JSON.parse(atob(token)) as ResponseUserProps;
          updateToken(response.token, response.time_expired_token);
          updateUser(response.jwt);
          localStorage.removeItem('__t_dto');
          update(false);
          navigate(webRoutes.home.path);
          show({ message: t('descriptions.welcome') });
        }
      }
    };

    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, []);

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

        <Button
          colorScheme="gray"
          variant="outline"
          className="w-full mt-2 flex gap-2 group items-center"
          isDisabled={authLogin}
          onClick={() => loginWithFacebook()}
        >
          <Facebook className="w-4 h-4 text-blue-500" />
          <span className="text-mode-white dark:group-hover:text-black">
            {t("login.buttons.facebook")}
          </span>
        </Button>
      </div>
    </>
  );
};

export default AlternativeLogin;
