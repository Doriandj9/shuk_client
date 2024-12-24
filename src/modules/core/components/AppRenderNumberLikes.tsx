import React from "react";
import {formatNumberInteraction } from "../utilities/formatNumbers";

type AppRenderNumberLikesProps = {
    likes: number
}

const AppRenderNumberLikes:React.FC<AppRenderNumberLikesProps>  = ({likes}) => {

    return (
        <>
            <span className="text-xs">{formatNumberInteraction(likes)}</span>
        </>
    );
};

export default AppRenderNumberLikes;