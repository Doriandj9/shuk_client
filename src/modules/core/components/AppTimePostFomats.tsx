import React from "react";
import { useTimeFormatPost } from "../hooks/useTimesFormats";

type TimePostFormat = {
    date: string | null;
};

export const TimePostFormat: React.FC<TimePostFormat> = ({ date }) => {
    const { format } = useTimeFormatPost();
    return (
        <>
        {format(date)}
        </>
    );
};