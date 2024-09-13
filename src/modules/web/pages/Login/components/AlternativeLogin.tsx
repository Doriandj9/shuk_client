
import { Google, Facebook } from "@core/components/SVGComponents";
import { Button } from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";
import { LoginSocialFacebook } from "reactjs-social-login";
import { app } from "@/config/app";

const AlternativeLogin = () => {
    const login = useGoogleLogin({
        onSuccess: response => {
            console.log(response);
            getInfo(response.access_token);
        }
      });
      const getInfo = async (accesToken: string) => {
        try {
            const request = await fetch('https://www.googleapis.com/oauth2/v2/userinfo',{
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${accesToken}`,
                },
              });
            const response = await request.json();

            console.log(response);
        } catch (error) {
            console.log(error);
        }
      };
    return (
        <>
            <div className="app-login-content font-semibold">
                <Button onClick={() => login()} colorScheme="gray" variant='outline' className="w-full flex gap-2">
                    <Google className="w-4 h-4" /> Continue with Google
                </Button>
                <LoginSocialFacebook
                    appId={app.oAuthIdFacebook || ''}
                    onResolve={(response) => {
                        console.log(response.data);
                    }}
                    onReject={(err) => {
                        console.log(err);
                    }}
                >
                    <Button colorScheme="gray" variant='outline' className="w-full mt-2 flex gap-2">
                        <Facebook className="w-4 h-4 text-blue-500" /> Continue with Facebook
                    </Button>
                </LoginSocialFacebook>
            </div>
        </>
    );
};


export default AlternativeLogin;