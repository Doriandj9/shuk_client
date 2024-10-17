import { PostText } from "@/modules/core/@types/post";
import { useFormContext } from "react-hook-form";



const TabPostText  = () => {
    
    const { register } = useFormContext<PostText>();

    return (<>
        <div className="flex items-center justify-center w-full h-full">
            <input type="text" {...register('description')} />
        </div>
    </>);
};

export default TabPostText;