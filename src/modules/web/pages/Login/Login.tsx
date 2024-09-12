import AppLayout from "@core/layouts/AppLayout";
import { Children } from "@core/@types/core";
import AppFormInput from "@/modules/core/components/AppFormInput";
import logo from '@/assets/img/logo_shuks/SHUK-ICONO.png';
import ComponentChakra from "@/modules/core/components/ComponentChakra";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Login: React.FC<Children> = () => {
    
    return (<>
        <AppLayout>
            <div className="w-full flex justify-center flex-grow h-full">
                <div className="app-container-fade w-full h-full flex-grow flex justify-center items-center">
                    <div className="w-full app-login-container">
                        <div className="app-login">
                            <div className="app-login-img">
                                <img src={logo} className="w-20 h-20" />
                            </div>

                            <div className="app-login-header">
                                <h3>
                                Log in to your account
                                </h3>
                                <aside>Start making your dreams come true</aside>
                            </div>
                            <div className="app-login-content">
                                <AppFormInput 
                                label=""
                                propsInputs={{placeholder: 'Enter your email'}}
                                />
                                <ComponentChakra>
                                    <Button colorScheme="yellow" className="w-full mt-4">
                                    <span className="text-sm">Continue with email</span>
                                    </Button>
                                </ComponentChakra>
                                <div className="mt-2 text-center">
                                    <span className="me-2">Not account shuk?</span>
                                    <Link className="text-sm text-blue-500" to={''}>
                                        Register for Shuk
                                    </Link>
                                </div>
                            </div>
                            <div className="my-2">
                                <div className="flex items-center app-login-content gap-2">
                                    <span className="flex-grow border-t border-slate-200 h-[1px]" />
                                    <span className="text-slate-500 font-regular">OR</span>
                                    <span className="flex-grow border-t border-slate-200 h-[1px]" /> 
                                </div>
                            </div>
                            <div className="app-login-content">
                            <ComponentChakra>
                                    <Button colorScheme="gray" variant='outline' className="w-full">
                                    <Svg /> google
                                    </Button>
                                </ComponentChakra>
                                <ComponentChakra>
                                    <Button colorScheme="gray" variant='outline' className="w-full mt-4">
                                    <Svg /> google
                                    </Button>
                                </ComponentChakra>
                            </div>
                            <div className="app-login-content text-center my-4">
                                <div>Having issues? <a className="text-blue-500">Contact us</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    </>);
};


const Svg = () => {

    return (<><svg viewBox="0 0 24 24" focusable="false" className="w-4 h-4" aria-hidden="true"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"></path><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"></path><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"></path><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"></path></g></svg></>);
};

export default Login;