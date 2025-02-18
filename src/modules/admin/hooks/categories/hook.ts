import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, getCategories, getCategory, updateCategory } from "./queries";
import { NewCategoriesForm } from "@/modules/web/validations/categoriesSchema";


export const useGetCategories = () => {
    const hook = useQuery({
        queryKey: ['categories','list'],
        queryFn: getCategories,
    });

    return {...hook};
};


export const useGetCategory = (id: string | number | null) => {
    const hook = useQuery({
        queryKey: ['categories',id],
        queryFn: () =>  getCategory(id),
        enabled: !!id
    });

    return {...hook};
};

export const useCreteCategory = () => {
    const client = useQueryClient();

    const create = useMutation({
        mutationKey: ['categories', 'new'],
        mutationFn: (data: NewCategoriesForm) => createCategory(data),
        onSuccess(){
            client.invalidateQueries({queryKey: ['categories','list']});
        }
    });

    return {create};
};

export const useUpdateCategory = (id?: string | number | null) => {
    const client = useQueryClient();

    const update = useMutation({
        mutationKey: ['categories', 'update'],
        mutationFn: (data: NewCategoriesForm) => updateCategory(data, String(id)),
        onSuccess(){
            client.invalidateQueries({queryKey: ['categories','list']});
        },
    });

    return {update};
};