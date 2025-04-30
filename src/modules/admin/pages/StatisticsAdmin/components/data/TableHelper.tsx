import { TableHelperHook } from "@/modules/core/@types/core";
import { GlobalReportDataType } from "./globalReportsData";
import { useTranslation } from "react-i18next";


export const useTableHelperGlobalData: TableHelperHook<GlobalReportDataType> = (actionFn) => {
        const [t] = useTranslation('web');

    return {
        columns: [
            {
                header: 'N°',
                render(item, index) {
                    return index;
                }
            },
            {
                header: t('titles.type'),
                render(item) {
                    return item?.type;
                },
            },
            {
                header: t('titles.total'),
                render(item) {
                    return item?.total;
                },
            }
        ],
        actions: {
            header: t('columns.actions'),
            list: {
                render: actionFn
            }
        }
    };

};