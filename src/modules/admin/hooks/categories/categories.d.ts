import { ResponseCreateApi, ResponseSuccessApi, ResponseUpdateApi } from "@/modules/core/@types/core";
import { InfinityData } from "@/modules/web/@types/web";
import { DocStatusData } from "@/modules/web/hooks/post/PostI";
import { NewCategoriesForm } from "@/modules/web/validations/categoriesSchema";


export type CategoriesModelType = {
    id: string | number;
    name: string;
    icon: string;
    doc_status: DocStatusData;
    is_active: boolean;
};

export type ParamsCategoriesInfinityFn = {
    per_page: string;
    page?: number;
    doc_status?: string;
};


export type GetCategoriesFn = {
    (params: ParamsCategoriesInfinityFn): Promise<InfinityData<CategoriesModelType>>;
};

export type GetCategoryFn = {
    (id: number | string | null): Promise<ResponseSuccessApi<CategoriesModelType>['data']>;
};

export type CreateCategoryFn = {
    (data: NewCategoriesForm): Promise<ResponseCreateApi<CategoriesModelType>['data']>;
}

export type UpdateCategoryFn = {
    (data: NewCategoriesForm, id: string): Promise<ResponseUpdateApi<CategoriesModelType>['data']>;
}

