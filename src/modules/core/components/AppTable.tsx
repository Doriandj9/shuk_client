import { Pagination, PaginationItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ResultTableHelperHook } from "../@types/core";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type AppTableComponentProps<TData> = {
    tableHelper: ResultTableHelperHook<TData>;
    isLoading: boolean;
    error: unknown;
    data: TData[];
    count?: number;
    onPage?: (page: number) => unknown;
};

export function AppTableComponent<TData>({ tableHelper, isLoading, error, data, count, onPage }: AppTableComponentProps<TData>) {
    const { actions, columns } = tableHelper; // columns debería ser un array de Column<TData>

    if (isLoading) {
        return 'cargando...';
    }

    if (error) {
        return 'error';
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((item, index) => {
                                return (
                                    <TableCell align="center" key={index}>{item.header.trim()}</TableCell>
                                );
                            })}
                            <TableCell>{actions.header.trim()}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow
                                key={++index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {columns.map((item, columnIndex) => (
                                    <TableCell key={columnIndex} align="center">
                                        {item.render(row, ++index)}
                                    </TableCell>
                                ))}

                                <TableCell style={{
                                    width: actions.width ?? '1.8rem'
                                }}>
                                    {actions.list?.render ? actions.list.render(row, ++index) : ''}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="mt-2">
                <Stack spacing={2}>
                    <Pagination
                        count={count}
                        renderItem={(item) => {

                            if (onPage) {
                                item.onClick = () => onPage(item?.page ?? 1);
                            }
                            return (
                                <PaginationItem

                                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                    {
                                    ...item
                                    }
                                />
                            );
                        }}
                    />
                </Stack>
            </div>
        </>
    );
}
