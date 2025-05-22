import { Fade, IconButton, Paper, Popper, PopperPlacementType } from "@mui/material";
import ColorLens from "@mui/icons-material/ColorLens";
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { usePostStore } from "@/store/postStore";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { IoMdClose } from "react-icons/io";
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';

const OptionsBackgrounds = () => {
    const updateBackground = usePostStore((state) => state.updateModifierBg);
    const updateStyle = usePostStore((state) => state.updateModifierStyle);
    const updateSParagraph = usePostStore((state) => state.updateModifierStilePrg);
    const [color, setColor] = useState("#ccc");
    const [colorText, setColorText] = useState("#000");

    const isModifyBackground = usePostStore((state) => state.modifier.isModifyBackground);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const [placement, setPlacement] = useState<PopperPlacementType>();

    const handleClick =
        (newPlacement: PopperPlacementType) =>
            (event: React.MouseEvent<HTMLButtonElement>) => {
                setAnchorEl(event.currentTarget);
                setOpen((prev) => placement !== newPlacement || !prev);
                setPlacement(newPlacement);
            };


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

    const handleOneOp = (pal: string) => {
        updateBackground(true);
        updateStyle({
            backgroundColor: pal,
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

        setColor(pal);

    };

    const handleTextOp = (pal: string) => {
        updateBackground(true);
        updateStyle({
            backgroundColor: color,
            color: pal
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

        setColorText(pal);
    };



    return (
        <>
            <IconButton
                disabled={!isModifyBackground}
                onClick={handleCancelOp}>
                <DoNotDisturbIcon />
            </IconButton>
            <IconButton onClick={handleClick('top-end')}>
                <ColorLens />
            </IconButton>
            <ColorText color={colorText}  changeStatus={handleTextOp}  />
            <Popper
                // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
                sx={{ zIndex: 5000 }}
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper sx={{ position: 'relative' }}>
                            <HexColorPicker color={color} onChange={(co) => {
                                handleOneOp(co);
                            }} />
                            <div className="absolute -top-7 -right-7 text-white">
                                <button
                                    title="Close"
                                    className="flex justify-center h-8 w-8 rounded-full app-container-fade items-center text-slate-600 dark:text-white"
                                    onClick={() => {
                                        setOpen(false);
                                    }}>
                                    <IoMdClose className="w-6 h-6" />
                                </button>
                            </div>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </>
    );
};

type ColorTextProps = {
    color: string;
    changeStatus: (color: string) => void;
};

const ColorText: React.FC<ColorTextProps> = ({ color, changeStatus }) => {

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const [placement, setPlacement] = useState<PopperPlacementType>();

    const handleClick =
        (newPlacement: PopperPlacementType) =>
            (event: React.MouseEvent<HTMLButtonElement>) => {
                setAnchorEl(event.currentTarget);
                setOpen((prev) => placement !== newPlacement || !prev);
                setPlacement(newPlacement);
            };

    return (
        <>
            <IconButton onClick={handleClick('top-end')}>
                <FormatColorTextIcon />
            </IconButton>
            <Popper
                // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
                sx={{ zIndex: 5000 }}
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper sx={{ position: 'relative' }}>
                            <HexColorPicker color={color} onChange={(co) => {
                                changeStatus(co);
                            }} />
                            <div className="absolute -top-7 -right-7 text-white">
                                <button
                                    title="Close"
                                    className="flex justify-center h-8 w-8 rounded-full app-container-fade items-center text-slate-600 dark:text-white"
                                    onClick={() => {
                                        setOpen(false);
                                    }}>
                                    <IoMdClose className="w-6 h-6" />
                                </button>
                            </div>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </>
    );
};


export default OptionsBackgrounds;