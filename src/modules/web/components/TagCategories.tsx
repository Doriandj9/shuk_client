
import { CategoriesModelType } from "@/modules/admin/hooks/categories/categories";
import { AppChip } from "@/modules/core/components/AppChip";
import { usePostStore } from "@/store/postStore";


type TagCategoriesProps ={
    categories: CategoriesModelType[];
}

export const TagCategories: React.FC<TagCategoriesProps> = ({categories}) => {
    const cValues = usePostStore((state) => state.categories);
    const setCValues = usePostStore((state) => state.updateCategories);
    
    return (
        <>
            {categories.map((category) => (
                <AppChip key={category.id} name="" control={undefined} label={category.name}
                    value={String(category.id)}
                    setValues={setCValues}
                    values={cValues}
                />
            ))}
        </>
    );
};