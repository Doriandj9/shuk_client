import { DocStatus } from "@/modules/core/@types/core";
import { facebookUser, googleUser } from "@/modules/core/@types/gUser";

export type ResponseUserProps = {
    token: string;
    time_expired_token: string;
    jwt: string;
    is_user_provider: boolean;
};


export type User = {
    id: number;
    id_client?: string | null;
    id_provider?: number | null;
    full_name?: string | null;
    email?: string | null;
    password?: string | null;
    email_verified_at?: Date | null;
    phone?: string | null;
    birthday?: Date | null;
    nationality?: string | null;
    photo?: string | null;
    is_active?: boolean;
    doc_status?: DocStatus;
    abilities?: string | null;
    data_login_social_media?: string | null | googleUser | facebookUser;
    is_user_provider?: boolean
}