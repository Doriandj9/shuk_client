
import { AppChip } from "@/modules/core/components/AppChip";
import { useCategories } from "@/store/categories";
import { usePostStore } from "@/store/postStore";



export const TagCategories = () => {
    const cValues = usePostStore((state) => state.categories);
    const setCValues = usePostStore((state) => state.updateCategories);
    const { categories } = useCategories((state) => state);
    
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