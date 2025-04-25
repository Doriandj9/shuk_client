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