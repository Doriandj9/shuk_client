import { ResponseSuccessApi } from "@/modules/core/@types/core";
import { DocStatusData, PostData } from "@/modules/web/hooks/post/PostI";

type GetDataGlobalReportsParams = {
    limit?: string;
    doc_status?: DocStatusData;
    column_name?: keyof PostData; 
    order: 'desc' | 'asc';
};

export type GetDataGlobalReports = {
    (params: GetDataGlobalReportsParams): Promise<ResponseSuccessApi<PostData[]>['data']>; 
};