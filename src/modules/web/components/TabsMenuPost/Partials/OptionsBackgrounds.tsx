import { IconButton } from "@mui/material";
import ColorLens from "@mui/icons-material/ColorLens";
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { usePostStore } from "@/store/postStore";


const OptionsBackgrounds = () => {
    const updateBackground = usePostStore((state) => state.updateModifierBg);
    const updateStyle = usePostStore((state) => state.updateModifierStyle);
    const updateSParagraph = usePostStore((state) => state.updateModifierStilePrg);
    const isModifyBackground = usePostStore((state) => state.modifier.isModifyBackground);

    const handleCancelOp = () => {
        updateBackground(false);
        updateStyle({
            backgroundColor: 'transparent',
            color: 'rgba(0, 0, 0, 0.6)'
        });
        updateSParagraph({
            display: 'block',
            justifyContent: 'none',
            alignItems: 'none'
        });
    };

    const handleOneOp = () => {
        updateBackground(true);
        updateStyle({
            backgroundColor: '#ccc',
            color: 'black'
        });
        updateSParagraph({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            maxWidth: '100%',
            whiteSpace: 'normal',
            wordWrap: 'break-word'
        });

    };
    return (
        <>
            <IconButton
                disabled={!isModifyBackground}
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