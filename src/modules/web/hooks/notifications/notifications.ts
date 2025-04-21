import { DocStatus } from "@/config/app";
import { InfinityData, User } from "../../@types/web";
import { ResponseCreateApi, ResponseSuccessApi } from "@/modules/core/@types/core";
import { TranslateNotify } from "@/modules/core/hooks/useMessageAndTransPost";

export type TypesNotificationModel = {
  TYPE_LIKE_POST: "TLP";
  TYPE_NEW_POST_COMMENT: "TCP";
  TYPE_NEW_POST: "TNP";
  TYPE_SHARED_POST: "TSP";
  TYPE_APP_SHUK_POST: "TASP";

};

export const ValueTypesNotifyModel: TypesNotificationModel = {
  TYPE_LIKE_POST: 'TLP',
  TYPE_NEW_POST: 'TNP',
  TYPE_NEW_POST_COMMENT: 'TCP',
  TYPE_SHARED_POST: 'TSP',
  TYPE_APP_SHUK_POST: "TASP"
};

export type PNotifyNewPost = {
  relative_path: string;
};


export type NotificationModel<TPayload> = {
  id?: number;
  sender?: User | null;
  receiver?: User | null;
  doc_status: (typeof DocStatus[keyof typeof DocStatus]);
  is_active: boolean;
  action?: string | null;
  type: ( typeof ValueTypesNotifyModel[keyof typeof ValueTypesNotifyModel]);
  message?: string | null;
  payload?: TPayload | null;
  trans?: TranslateNotify | null;
  created_by?: number | null;
  updated_by?: number | null;
  created_at?: string;
  updated_at?: string;
};

export type ParamsForGetNotifiesUser = {
  per_page?: string;
  page?: number;
  user_id?: number | string;
};

export type GetNotifiesForUser = {
  (params: ParamsForGetNotifiesUser): Promise<InfinityData<NotificationModel<PNotifyNewPost>>>;
}

export type PutNotifiesUserAllDraft = {
  (userId: string, data: Partial<NotificationModel<PNotifyNewPost>>): Promise<ResponseSuccessApi<object>['data']>; 
};


export type UpdateNotifyUser = {
  (data: Partial<NotificationModel<PNotifyNewPost>>): Promise<ResponseSuccessApi<NotificationModel<PNotifyNewPost>>['data']>; 
};

export type StoreNotificationUser = Pick<NotificationModel<PNotifyNewPost>
,'action' | 'message' | 'trans' | 'payload'  | 'type'>
&
{
  sender?: number | string;
  receiver?: string | number;
};


export type StoreNotificationUserFn = {
  (data: StoreNotificationUser): Promise<ResponseCreateApi<NotificationModel<PNotifyNewPost>>['data']>; 
};