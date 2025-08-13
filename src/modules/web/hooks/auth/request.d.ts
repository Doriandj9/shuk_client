import { ResponseSuccessApi } from "@/modules/core/@types/core";
import { ResponseUserProps } from "../../@types/web";

type AuthFn = {
    (data): unknown | unknown[];
};

export type DataRegisterInitial = {
    full_name: string;
    email: string;
    language?: string;
};

export type RegisterUser = DataRegisterInitial & {
    username: string;
    phone: string;
    birthday: string;
    password: string;
    password_confirmation?: string;
};

export type InitialRegisterFn = {
    (data: DataRegisterInitial): Promise<ResponseSuccessApi<'OK'>['data']>;
};

export type CompleteRegisterFn = {
    (data: RegisterUser): Promise<ResponseSuccessApi<ResponseUserProps>['data']>;
};

export type ForwardPasswordInputs = Pick<DataRegisterInitial,'email'>;

export type ForwardPasswordFn = {
    (data: ForwardPasswordInputs ): Promise<ResponseSuccessApi<string>['data']>;
};

export type VerifyTokenResetPassword = {
    (token: string): Promise<ResponseSuccessApi<{email: string}>['data']>;
};

export type ResetPasswordForm = Pick<RegisterUser,'email'| 'password' | 'password_confirmation'>;

export type ResetPasswordFn =  {
    (data: ResetPasswordForm): Promise<ResponseSuccessApi<string>['data']>; 
};

export type GetJwtUser = {
    (token:string): Promise<ResponseSuccessApi<string>['data']>;
};