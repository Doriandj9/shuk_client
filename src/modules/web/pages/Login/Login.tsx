import AppLayout from "@core/layouts/AppLayout";
import { Children } from "@core/@types/core";
import ComponentChakra from "@/modules/core/components/ComponentChakra";
import HeaderImg from "./components/HeaderImg";
import HeaderContent from "./components/HeaderContent";
import LoginMail from "./components/LoginMail";
import AlternativeLogin from "./components/AlternativeLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { app } from "@/config/app";

const Login: React.FC<Children> = () => {
    
    return (<>
        <AppLayout>
      <GoogleOAuthProvider clientId={app.oAuthId || '913311559669-4lp0mh31a80mdd9favrsvoch3ks0skqr.apps.googleusercontent.com'}>
            <ComponentChakra>
            <div className="w-full flex justify-center flex-grow h-full">
                <div className="app-container-fade w-full h-full flex-grow flex justify-center items-center">
                    <div className="w-full app-login-container">
                        <div className="app-login">
                            <HeaderImg />
                            <HeaderContent />
                            <LoginMail />
                            <div className="my-2">
                                <div className="flex items-center app-login-content gap-2">
                                    <span className="flex-grow border-t border-slate-200 h-[1px]" />
                                    <span className="text-slate-500 font-regular">OR</span>
                                    <span className="flex-grow border-t border-slate-200 h-[1px]" /> 
                                </div>
                            </div>
                            <AlternativeLogin />
                            <div className="app-login-content text-center my-4">
                                <div>Having issues? <a className="text-blue-500">Contact us</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </ComponentChakra>
      </GoogleOAuthProvider>
        </AppLayout>
    </>);
};



export default Login;