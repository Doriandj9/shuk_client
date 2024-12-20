import React, { MouseEventHandler, useState } from "react";
import AppModal from "./AppModal";

type AppEventRenderClickImgProps = {
    render: (open: MouseEventHandler<HTMLImageElement>) => React.ReactElement,
    pathImg: string;
};

const AppEventRenderClickImg: React.FC<AppEventRenderClickImgProps> = ({ render, pathImg }) => {
    const [open, setOpen] = useState(false);

    const openImg = () => {
        setOpen(true);
    };
    const closeImg = () => {
        setOpen(false);
    };

    return (
        <>
            <AppModal
                open={open}
                onClose={closeImg}
                sizeModal="auto"
                isFull
            >
                <div className="p-1 w-auto bg-mode-white">
                 <img src={pathImg} alt="" />
                </div>

            </AppModal>

            {render(openImg)}
        </>
    );
};


export default AppEventRenderClickImg;