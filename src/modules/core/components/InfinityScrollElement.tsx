import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export type InfinityScrollElementType = {
    action: boolean;
};

type InfinityScrollElementProps = {
    render: (scroll: InfinityScrollElementType & {changeStatus: Dispatch<SetStateAction<InfinityScrollElementType>>}) => React.ReactElement,
    refElement?: React.RefObject<HTMLDivElement>
    className?: string;
    elementName?: string;
};

const InfinityScrollElement: React.FC<InfinityScrollElementProps> = ({render, refElement, className}) => {
    const [scroll, setScroll] = useState<InfinityScrollElementType>({action: false});

    const handleScroll = () => {

        const clientHeight = refElement?.current?.clientHeight || 0 ;
        const scrollTop = refElement?.current?.scrollTop || 0;
        const heightScroll = clientHeight + scrollTop  + 25;
        const totalHeightWindow = refElement?.current?.scrollHeight || 0;
        if(heightScroll >= totalHeightWindow ){
            setScroll({...scroll, action: true});
        }
        
    };

    useEffect(() => {
        
        if(refElement){
            refElement.current?.addEventListener('scroll', handleScroll);
            return () => {
                refElement.current?.removeEventListener('scroll', handleScroll);
            };
        }
    }, [refElement]);
    
    return (
        <>
            <div className={className}>
                {render({action: scroll.action, changeStatus: setScroll})}
            </div>
        </>
    );
};



export default React.memo(InfinityScrollElement);