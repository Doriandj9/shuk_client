import { useGetAppSettings } from "@/modules/web/hooks/user/hook";
import { LikeApp } from "./LikeApp";
import { DisLikeApp } from "./DisLikeApp";


export const ActionsWrapper = () => {
    const {data} = useGetAppSettings();
    return (<>
        <div className="flex flex-col justify-center items-center w-6 mt-2">
            <LikeApp likes={data?.payload?.settings?.likes?.length ?? 0} />
        </div>
        <div className="flex flex-col justify-center items-center w-6 mt-2">
            <DisLikeApp dislikes={data?.payload?.settings?.dislikes.length ?? 0}/>
        </div>
    </>);
};