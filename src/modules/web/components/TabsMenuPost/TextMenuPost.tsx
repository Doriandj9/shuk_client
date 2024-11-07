import { CreatePostContext } from "@/modules/core/components/AppNewPost";
import { Button } from "@mui/material";
import { useContext } from "react";


const TextMenuPost = () => {
    const {content,setContent} = useContext(CreatePostContext);

    const handleClick = () => {
        setContent({
            type: content?.type || 'PT',
            modifier: {style: {...content?.modifier.style, backgroundColor: 'black', color: 'white'} },
            value: {html: content?.value.html || ''}
        });
    };

    return (<>
        <div className="w-full h-16 overflow-x-auto">
            <div className="flex items-center h-full">
               <Button onClick={() => handleClick()}>
                COLOR
               </Button>
            </div>
        </div>
    </>);
};


export default TextMenuPost;