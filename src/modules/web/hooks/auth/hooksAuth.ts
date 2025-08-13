import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import { authFn, authLogOut, authProviderFn, completeRegister, forwardPassword, getJwt, infoUserGoogle, initialRegister, resetPassword, verifyTokenResetPassword } from "./requestsAuth";
import { api } from "@/config/app";
import { showError } from "@/modules/core/utilities/errors";
import { useContext } from "react";
import { KeysPostContext } from "../../providers/KeysPosts";
import { DataRegisterInitial, ForwardPasswordInputs, RegisterUser, ResetPasswordForm } from "./request";


export const useAuth = (handleSuccessLogin?: CallableFunction | null, handleSuccessLoginProvider?: CallableFunction) => {
    const client = useQueryClient();
    const {keys} = useContext(KeysPostContext);
    const auth = useMutation({
        mutationFn: (data: object) => authFn(data),
        onSuccess(data) {
            client.invalidateQueries({queryKey: ['posts']});
            client.invalidateQueries({queryKey: keys});
            return handleSuccessLogin && handleSuccessLogin(data);
        },
        onError(error) {
            showError(error);
        },
    });

    const authProvider = useMutation({
        mutationFn: authProviderFn,
        onSuccess(data) {
            return handleSuccessLoginProvider && handleSuccessLoginProvider(data);
        },
        onError(error) {
            showError(error);
        },
    });

    const useQueryGoogleInfo = () => {

        const googleQuery = useMutation({
            mutationKey: ['user_google'],
            mutationFn: async (accessToken: string) => await infoUserGoogle(accessToken),
        });

        return {googleQuery};
    };

    return {
        auth,
        authProvider,
        useQueryGoogleInfo
    };
};

export const useAuthLogout = (handleFn: CallableFunction) => {

    const logout = useMutation({
        mutationKey: ['user-logout'],
        mutationFn: authLogOut,
        onSuccess: () => {
            handleFn();
        },
    });

    return { logout };
};


export const useTest = () => {
    return useQuery({
        queryKey: ['test'],
        queryFn: async () => {
            const response = await api.get('test');
            return response.data?.data;
        },

    });
};

export const useInitialRegister = () => {
    const register = useMutation({
        mutationKey: ['initial-register'],
        mutationFn: (data: DataRegisterInitial) => initialRegister(data),
        onError(error) {
            if(error) {
                showError(error);
            }
        }
    });

    return { register };
};

export const useCompleteRegister = () => {
    const register = useMutation({
        mutationKey: ['complete-register'],
        mutationFn: (data: RegisterUser) => completeRegister(data),
        onError(error) {
            if(error) {
                showError(error);
            }
        }
    });

    return { register };
};

export const useForwardPassword = () => {
    const forward = useMutation({
        mutationKey: ['forward-password'],
        mutationFn: (data: ForwardPasswordInputs) => forwardPassword(data),
        onError(error) {
            if(error) {
                showError(error);
            }
        }
    });

    return { forward };
};


export const useVerifyTokenResetPassword = (token?: string | null) => {
    const hook = useQuery({
        queryKey: ['token-reset'],
        queryFn: () => verifyTokenResetPassword(String(token)),
        enabled: !!token
    });

    return {...hook};
};

export const useResetPassword = () => {
    const forward = useMutation({
        mutationKey: ['reset-password'],
        mutationFn: (data: ResetPasswordForm) => resetPassword(data),
        onError(error) {
            if(error) {
                showError(error);
            }
        }
    });

    return { forward };
};

export const useUserJwt = () => {
    const tokenQuery = useMutation({
        mutationKey: ['jtw-user'],
        mutationFn: (token: string) => getJwt(token),
    });


    return {tokenQuery};
};