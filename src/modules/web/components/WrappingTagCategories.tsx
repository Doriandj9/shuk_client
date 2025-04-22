import { useGetCategories } from "@/modules/admin/hooks/categories/hook";
import { TagCategories } from "./TagCategories";


export const WrappingTagCategories = () => {
    const {data} = useGetCategories();

    return (
        <TagCategories categories={data ?? []}  />
    );
};