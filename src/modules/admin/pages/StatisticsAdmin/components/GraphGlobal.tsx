import { useGetDataGlobalReports } from "@/modules/admin/hooks/reports/hook";
import { GetDataGlobalReportsParams } from "@/modules/admin/hooks/reports/reports";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GraphDataGlobal } from "./data/GraphDataGlobal";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { DocStatusData } from "@/modules/web/hooks/post/PostI";
import { useAppToast } from "@/modules/core/hooks/useAppToast";

const DataDocStatus = [{
    label: 'Activos',
    value: 'AC',
    selected: true
}, {
    label: 'Eliminados',
    value: 'DL',
}];

type GraphGlobalProps = {
    open: boolean;
    onCLose: CallableFunction;
};


export const GraphGlobal: React.FC<GraphGlobalProps> = ({ open, onCLose }) => {
    const [t] = useTranslation('web');
    const {show} = useAppToast();
    const [paramsGlobals, setParamsGlobals] = useState<GetDataGlobalReportsParams>({ limit: '100', order: 'desc', doc_status: 'AC', column_name: 'likes' });
    const [t_core] = useTranslation('core');
    const { data, error, isLoading } = useGetDataGlobalReports(paramsGlobals);


    return (<>
        <Dialog
            open={open}
            onClose={() => onCLose()}
            fullWidth
            maxWidth={'xl'}
        >
            <DialogTitle>
                {t('titles.reports').slice(0, -1)} Global
            </DialogTitle>
            <DialogContent>
                <div>
                    <h2 className="text-center font-bold text-mode-slate">Reporte de las {paramsGlobals.limit} publicaciones por numero likes, comentarios y compartidas.</h2>
                    <div className="flex gap-4 justify-center mt-2">
                        <Button variant={'contained'} color={paramsGlobals.column_name === 'likes' ? 'success' : 'inherit'} startIcon={<ThumbUpOffAltIcon />}
                            onClick={() => {
                                setParamsGlobals({
                                    ...paramsGlobals,
                                    column_name: 'likes'
                                });
                            }}

                        >
                            Likes
                        </Button>
                        <Button variant={'contained'} color={paramsGlobals.column_name === 'comments' ? 'success' : 'inherit'} startIcon={<ChatBubbleOutlineIcon />}
                            onClick={() => {
                                setParamsGlobals({
                                    ...paramsGlobals,
                                    column_name: 'comments'
                                });
                            }}
                        >
                            Comentarios
                        </Button>
                        <Button variant={'contained'} color={paramsGlobals.column_name === 'shared' ? 'success' : 'inherit'} startIcon={<ShareIcon />}
                            onClick={() => {
                                setParamsGlobals({
                                    ...paramsGlobals,
                                    column_name: 'shared'
                                });
                            }}
                        >
                            Compartidas
                        </Button>
                    </div>
                    <div className="flex gap-4 justify-center mt-2 items-center">
                        <IconButton color={paramsGlobals.order === 'desc' ? 'success' : 'inherit'}
                            onClick={() => {
                                setParamsGlobals({
                                    ...paramsGlobals,
                                    order: "desc"
                                });
                            }}
                        >
                            <KeyboardDoubleArrowUpIcon />
                        </IconButton>

                        <IconButton color={paramsGlobals.order === 'asc' ? 'success' : 'inherit'}
                            onClick={() => {
                                setParamsGlobals({
                                    ...paramsGlobals,
                                    order: "asc"
                                });
                            }}
                        >
                            <KeyboardDoubleArrowDownIcon />
                        </IconButton>

                        <div>
                            <input type="number" className="w-24 h-10 rounded-lg shadow text-black p-1"
                                value={paramsGlobals.limit}
                                max={'500'}
                                onChange={(e) => {
                                    if(parseInt(e.target.value) > 500){
                                        show({message: 'No se puede solicitar mas de 500 posts',status: 'error'});
                                        return;
                                    }

                                    setParamsGlobals({ ...paramsGlobals, limit: e.target.value });
                                }}
                            />
                        </div>

                        <div>
                            <Select 
                            value={paramsGlobals.doc_status}
                            onChange={(e) => setParamsGlobals({ ...paramsGlobals, doc_status: e.target.value as DocStatusData })}
                            >
                                {DataDocStatus.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                        </div>

                    </div>
                    <GraphDataGlobal data={data ?? []} error={error} isLoading={isLoading} columnName={paramsGlobals.column_name} />

                </div>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="warning" onClick={() => onCLose()} >
                    {t_core('messages.labels.app.close')}
                </Button>
            </DialogActions>
        </Dialog>
    </>);
};