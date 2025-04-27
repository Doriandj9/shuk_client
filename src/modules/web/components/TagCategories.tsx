
import { CategoriesModelType } from "@/modules/admin/hooks/categories/categories";
import { AppChip } from "@/modules/core/components/AppChip";


type TagCategoriesProps ={
    category: CategoriesModelType;
    setCValues: (categories: string[]) => unknown;
    cValues: string[];
    
}

export const TagCategories: React.FC<TagCategoriesProps> = ({category, setCValues, cValues}) => {
    
    
    return (
        <>
                <AppChip key={category.id} name="" control={undefined} label={category.name}
                    value={String(category.id)}
                    setValues={setCValues}
                    values={cValues}
                />
        </>
    );
};