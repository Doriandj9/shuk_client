import { Skeleton } from "@mui/material";

export const AppLoadingTable = () => {

    return (
        <div>
            <Skeleton width={'100%'} height={'50px'} />
            <Skeleton width={'100%'} height={'50px'} />
            <Skeleton width={'100%'} height={'50px'} />
            <Skeleton width={'100%'} height={'50px'} />
        </div>
    );
};