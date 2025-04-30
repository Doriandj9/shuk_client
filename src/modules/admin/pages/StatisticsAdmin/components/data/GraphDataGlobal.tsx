import { PostData } from "@/modules/web/hooks/post/PostI";
import { CircularProgress } from "@mui/material";

type GraphDataGlobalProps = {
    data: PostData[];
    isLoading?: boolean;
    error?: Error | null;
    columnName?: string;

};

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: '',
        },
    },
};

function eliminarEtiquetasHTML(texto?: string) {
    return texto?.replace(/<[^>]*>/g, '');
  }

export const GraphDataGlobal: React.FC<GraphDataGlobalProps> = ({ data, error, isLoading, columnName }) => {
    const labels = data.map((post) => eliminarEtiquetasHTML(post.description?.slice(0,20)) + '...' );
    const dataGraph = {
        labels,
        datasets: [
            {
                label: columnName ?? 'N/A',
                data: data.map((post) => post[columnName as keyof PostData]),
                backgroundColor: 'rgba(119, 117, 21, 0.5)',
            },
        ],
    };
    
    return (
        <>
        <div className="relative">
            {
                isLoading && (
                    <div className="absolute h-full w-full flex justify-center items-center">
                            <CircularProgress />
                    </div>
                )
            }
            {
                error && (
                    <div className="absolute h-full w-full flex justify-center items-center">
                           {error.message}
                    </div>
                )
            }
            <Bar options={options} data={dataGraph} />
        </div>
        </>
    );
};