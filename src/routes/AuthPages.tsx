import { Children } from "@/modules/core/@types/core";
import { useAuthStore } from "@/store/auth";

const AuthPages: React.FC<Children> = ({children}) => {
    const {isLogin} = useAuthStore((state) => state);

    if(!isLogin){

        return (
            <>
                <p>No logueador</p>
            </>
        );
    }

    return (
        <>
            {children}
        </>
    );
};


export default AuthPages;