import { TableHelperHook } from "@/modules/core/@types/core";
import { CategoriesModelType } from "../../hooks/categories/categories";
import { useTranslation } from "react-i18next";
import { appLoadImage } from "@/modules/core/utilities/img/convert";

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
                return <span className="flex justify-center">
                    <img className="img-shadow w-8 h-8" src={appLoadImage(item?.icon ?? '')} alt="icon" />
                </span>;
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