import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export type InfinityScrollType = {
    action: boolean;
};

type InfinityScrollProps = {
    render: (scroll: InfinityScrollType & {changeStatus: Dispatch<SetStateAction<InfinityScrollType>>}) => React.ReactElement
};

const InfinityScroll: React.FC<InfinityScrollProps> = ({render}) => {
    const [scroll, setScroll] = useState<InfinityScrollType>({action: false});

    const handleScroll = () => {

        const heightScroll = window.innerHeight + window.scrollY;
        const totalHeightWindow = document.documentElement.scrollHeight;
        // const heightNearEnd =  heightScroll + 20;

        if(heightScroll + 25 >= totalHeightWindow ){
            setScroll({...scroll, action: true});
        }
        
    };

    useEffect(() => {
        window.removeEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div>
                {render({action: scroll.action, changeStatus: setScroll})}
            </div>
        </>
    );
};



export default React.memo(InfinityScroll);