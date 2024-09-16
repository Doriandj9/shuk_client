import { useMutation } from "react-query";
import { authFn } from "./requestsAuth";
import { AxiosError } from "axios";


export const useAuth = () => {

    const auth = useMutation({
        mutationFn: (data: object) => authFn(data),
        onError: (error: AxiosError) =>{
            console.log('eeeeeeeeeeeeeeeeeeeeee',error.response?.data);
        }
    });

    return {
        auth
    };
};