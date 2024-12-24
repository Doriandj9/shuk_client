import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router-dom";

type MiddlewareAuthPropsOne = {
    redirect: string;
    containThrow?: boolean;
    isReturn?: boolean;
}

type MiddlewareAuth = {
    (args: MiddlewareAuthPropsOne): void;
}

export const useMiddlewareAuth = () => {
    const isLogin = useAuthStore(state => state.isLogin);
    const navigate = useNavigate();

    const verifiedAuth: MiddlewareAuth = ({redirect,containThrow=false, isReturn=false}) => {
        if (!isLogin && containThrow) {
            throw new Error('Unauthorized');
        }

        if (!isLogin && isReturn) {
            return false;
        }

        if(isLogin && isReturn){
            return true;
        }

        if(isLogin && !isReturn){
            return;
        }

        navigate(redirect);
        return;
    };
    
    return {verifiedAuth};
};

