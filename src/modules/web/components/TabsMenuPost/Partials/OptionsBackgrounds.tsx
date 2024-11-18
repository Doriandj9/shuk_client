import { IconButton } from "@mui/material";
import ColorLens from "@mui/icons-material/ColorLens";
import { CreatePostContext } from "@/modules/core/components/AppNewPost";
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { useContext } from "react";


const OptionsBackgrounds = () => {
    const { content, setContent } = useContext(CreatePostContext);

    const handleCancelOp = () => {
        setContent({
            type: content?.type || "PT",
            modifier: {
                style: {
                    ...content?.modifier.style,
                    backgroundColor: 'transparent',
                    color: 'rgba(0, 0, 0, 0.6)',
                },
                isModifyBackground: false,
                styleParagraph: {}
            },
            
            value: { html: content?.value.html || "" },
        });
    };

    const handleOneOp = () => {
        setContent({
            type: content?.type || "PT",
            modifier: {
                style: {
                    ...content?.modifier.style,
                    backgroundColor: "black",
                    color: "white"
                },
                isModifyBackground: true,
                styleParagraph: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            },
            value: { html: content?.value.html || "" },
        });
    };
    return (
        <>
        <IconButton
        disabled={!content?.modifier.isModifyBackground}
        onClick={handleCancelOp}>
                <DoNotDisturbIcon />
            </IconButton>
            <IconButton onClick={handleOneOp}>
                <ColorLens />
            </IconButton>
        </>
    );
};


export default OptionsBackgrounds;