import { AppTableComponent } from "@/modules/core/components/AppTable";
import { useTranslation } from "react-i18next";
import { useTableDataReportGLobal } from "./components/data/globalReportsData";
import { useTableHelperGlobalData } from "./components/data/TableHelper";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { IconButton } from "@mui/material";
import { useState } from "react";
import { GraphGlobal } from "./components/GraphGlobal";

export const StatisticsAdmin = () => {
    const [t] = useTranslation('web');
    const dataGlobal = useTableDataReportGLobal(0);
    const [openGlobalModal, setOpenGlobalModal] = useState(false);
    const actionGlobal = () => {

        return (
            <IconButton color="success" onClick={() => setOpenGlobalModal(true)}>
                <EqualizerIcon />
            </IconButton>
        );
    };
    const tableHelpGlobal = useTableHelperGlobalData(actionGlobal);

    
    return (
        <>
        <GraphGlobal open={openGlobalModal} onCLose={() => setOpenGlobalModal(false)} />
            <div className="app-container-fade p-2 h-full w-full">
                <div className="flex justify-start mb-4">
                    <div className="flex items-center gap-1 text-mode-primary w-auto border-b-2 border-mode-primary ps-2 pe-4">
                        {/* <PostAddIcon /> */}
                        <h2 className="text-xl font-bold ">{t('titles.reports')}</h2>

                    </div>
                </div>

                <AppTableComponent data={dataGlobal} error={null} isLoading={false} tableHelper={tableHelpGlobal} />
            </div>
        </>
    );
};