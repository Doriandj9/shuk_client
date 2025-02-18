import { TableHelperHook } from "@/modules/core/@types/core";
import { CategoriesModelType } from "../../hooks/categories/categories";
import { useTranslation } from "react-i18next";

export const useTableHelperCategories: TableHelperHook<CategoriesModelType> = (actionFn) => {
    const [t] = useTranslation('web');

    return {
        columns: [{
            header: 'N°. ',
            render(item, index) {
                
                return index;
            },
        }, {
            header: t('columns.category.name'),
            render(item) {
                return `${item?.name}`;
            },
        }, {
            header: t('columns.category.icon'),
            render(item) {
                return <span className="block flex justify-center items-center"
                    dangerouslySetInnerHTML={{ __html: item?.icon ?? '' }} />;
            },
        }],
        actions: {
            header: t('columns.actions'),
            // width: '0.5rem',
            list: {
                render: actionFn
            }
        }
    };
};