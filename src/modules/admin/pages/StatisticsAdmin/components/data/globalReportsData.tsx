export type GlobalReportDataType = {
    type: 'Global',
    total: number;
};

export const useTableDataReportGLobal = (total?: number) => {
    const data: GlobalReportDataType[] = [
        {
            type: 'Global',
            total: total ?? 0
        }
    ];
    return data;
};