import React, { MouseEventHandler, useState } from "react";
import AppModalV2 from "./AppModalV2";

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
            <AppModalV2
                open={open}
                onClose={closeImg}
                sizeModal="auto"
                isFull
            >
                <div className="p-1 w-auto bg-mode-white">
                 <img src={pathImg} alt="" />
                </div>

            </AppModalV2>

            {render(openImg)}
        </>
    );
};


export default AppEventRenderClickImg;