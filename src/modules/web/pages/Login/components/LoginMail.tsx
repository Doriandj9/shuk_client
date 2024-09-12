import AppFormInput from "@/modules/core/components/AppFormInput";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";


const LoginMail = () => {

    return (
        <>
            <div className="app-login-content">
                <AppFormInput
                    label=""
                    propsInputs={{ placeholder: 'Enter your email' }}
                    withProvider={false}
                />
                <Button colorScheme="yellow" className="w-full mt-4">
                    <span className="text-sm">Continue with email</span>
                </Button>
                <div className="mt-2 text-center">
                    <span className="me-2">Not account shuk?</span>
                    <Link className="text-sm text-blue-500" to={''}>
                        Register for Shuk
                    </Link>
                </div>
            </div>
        </>
    );
};

export default LoginMail;