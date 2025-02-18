import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ResultTableHelperHook } from "../@types/core";


type AppTableComponentProps<TData> = {
    tableHelper: ResultTableHelperHook<TData>;
    isLoading: boolean;
    error: unknown;
    data: TData[];
};

export function AppTableComponent<TData>({ tableHelper, isLoading, error, data }: AppTableComponentProps<TData>) {
    const { actions, columns } = tableHelper; // columns debería ser un array de Column<TData>
    console.log(status);

    if(isLoading){
        return 'cargando...';
    }

    if(error){
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
                                    {actions.list?.render ? actions.list.render(row,++index) : ''}
                                </TableCell>
                          
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
