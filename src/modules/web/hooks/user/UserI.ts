import { ResponseSuccessApi } from "@/modules/core/@types/core";

export type LikeAppFn = {
    (type: 'like' | 'dislike'): Promise<ResponseSuccessApi<string>['data']>;
};

export type PayloadSettingsPlatform = {
    settings: {
      likes: number[]; 
      followers: number[];
      dislikes: number[];
    };
  };
export type AppPlatformModel = {
    id: number;
    likes: number;
    followers: number;
    dislike: number;
    picture?: string | null;
    payload: PayloadSettingsPlatform;
    user_id: number;
    created_by?: number | null;
    updated_by?: number | null;
};

export type GetSettingsPlatform = {
    (): Promise<ResponseSuccessApi<AppPlatformModel>['data']>;
};

export type NotEmailsForm = {
  email: string;
  not_email: true;
};

export type PutNotEmails = {
  (data: NotEmailsForm ): Promise<ResponseSuccessApi<'OK'>['data']>;
};