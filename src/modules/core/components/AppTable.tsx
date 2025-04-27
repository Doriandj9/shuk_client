import { Pagination, PaginationItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ResultTableHelperHook } from "../@types/core";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AppLoadingTable } from "./AppLoadingTable";
import AppErrorFetchingPosts from "./AppErrorFetchingPosts";

type AppTableComponentProps<TData> = {
    tableHelper: ResultTableHelperHook<TData>;
    isLoading: boolean;
    error: Error | null;
    data: TData[];
    count?: number;
    onPage?: (page: number) => unknown;
    currentPage?: number;
    perPage?: number;
};

export function AppTableComponent<TData>({ tableHelper, isLoading, error, data, count, onPage, currentPage, perPage }: AppTableComponentProps<TData>) {
    const { actions, columns } = tableHelper; // columns debería ser un array de Column<TData>

    if (isLoading) {
        return <AppLoadingTable />;
    }

    if (error) {
        return <AppErrorFetchingPosts error={error} />;
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
                        {data.map((row, index) => {

                            const ident = perPage ?
                                currentPage ?
                                    currentPage === 0 ? (0 * perPage) + (++index)
                                        : ((currentPage - 1) * perPage) + (++index)
                                    : ++index
                                : ++index;

                            return (
                                <TableRow
                                    key={ident}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {columns.map((item, columnIndex) => (
                                        <TableCell key={columnIndex} align="center">
                                            {item.render(row, ident)}
                                        </TableCell>
                                    ))}

                                    <TableCell style={{
                                        width: actions.width ?? '1.8rem'
                                    }}>
                                        {actions.list?.render ? actions.list.render(row, ident) : ''}
                                    </TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="mt-2">
                <Stack spacing={2}>
                    <Pagination
                        page={ currentPage ?? 1 }
                        count={count}
                        onChange={(e, page) => {
                            if (onPage) {
                                onPage(page ?? 1);
                            }

                        }}
                        renderItem={(item) => {

                            return (
                                <PaginationItem

                                    slots={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon,
                                    }}
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
