import { Divider } from "@mui/material";
import React from "react";


type AppDividerProps = {
    separate?: '2' | '3' | '4' | '5' | '6' | '6' | '8' ;
    onlyTop?: boolean;
    onlyBottom?: boolean;
};

const AppDivider: React.FC<AppDividerProps> = ({separate = '2', onlyTop = false, onlyBottom= false}) => {

    return (
        <div className={`${onlyTop ? 'mt-'+separate : onlyBottom ? 'mb-'+separate :  'my-' + separate}`}>
            <Divider />
        </div>
    );
};

export default AppDivider;