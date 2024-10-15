import { Button } from "@mui/material";
import { Children } from "../@types/core";
import { MouseEvent } from "react";

type AppFooterModalProps = Children & {
    isCustomButtons?: boolean;
    positionBtn?: 'start' | 'center' | 'end';
    msgBtnDone?: string;
    msgBtnCancel?: string;
    onDone?: (e?: MouseEvent)=> unknown,
    onCancel?: (e?: MouseEvent)=> unknown,
    isOkBtn?: boolean;
};
const aligns = {
    'start': 'justify-start',
    'center': 'justify-center',
    'end': 'justify-end',
};
const AppFooterModal: React.FC<AppFooterModalProps> = ({ isCustomButtons = false,
    msgBtnDone = '',
    msgBtnCancel = '',
    onDone = () => { },
    onCancel = () => { },
    isOkBtn = true,
    positionBtn = 'end',
    children }) => {
    const btnAlign = aligns[positionBtn];
    return (<>
        <div className={`flex items-center gap-2 mt-8 ${btnAlign}`}>
            {
                !isCustomButtons ?
                <>
                    <Button onClick={onCancel} color={`${isOkBtn ? 'error': 'secondary'}`} variant="contained">
                            {msgBtnCancel}
                    </Button>
                    <Button onClick={onDone} color={`${isOkBtn ? 'secondary': 'error'}`} variant="contained">
                            {msgBtnDone}
                    </Button>
                </>
                :
                <>
                    {children}
                </>
            }
        </div>
    </>);
};


export default AppFooterModal;