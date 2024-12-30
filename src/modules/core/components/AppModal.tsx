import { Divider, IconButton, Modal, ModalProps } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

type AppModalProps = ModalProps & {
    buttonClose?: boolean;
    isNotCloseClick?: boolean;
    open: boolean;
    onClose: ((event: object, reason: "backdropClick" | "escapeKeyDown") => void) & CallableFunction;
    sizeModal?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full" | "auto";
    title?: string;
    isFull?: boolean;
};

const sizeWidth = {
    "xs": 'md:w-2/12',
    "sm": 'md:w-3/12',
    "md": 'md:w-4/12',
    "lg": 'md:w-5/12',
    "xl": 'md:w-6/12',
    "2xl": 'md:w-7/12',
    "3xl": 'md:w-8/12',
    "4xl": 'md:w-9/12',
    "5xl": 'md:w-10/12',
    "6xl": 'md:w-11/12',
    "full": 'md:w-full',
    "auto": 'md:w-auto'
};

const AppModal: React.FC<AppModalProps> = ({ title = '', buttonClose = true, isNotCloseClick = true, open, onClose, sizeModal = 'md', isFull = false, ...props }) => {

    const sizeModalWidth = sizeWidth[sizeModal] || sizeWidth['md'];

    return (<>
        <Modal
            sx={{ position: 'fixed', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            open={open}
            onClose={props.disableEscapeKeyDown || isNotCloseClick ? onClose : () => { }}
            {...props}
        >
            <>
                {
                    !isFull ?
                        <div className={`flex justify-center relative app-container-fade min-h-40 ${sizeModalWidth} w-11/12`}>
                            <div className="w-full">
                                <header className={`relative flex items-center w-full ${title != '' ? 'py-2' : 'py-4'}`}>
                                    <div className="flex-grow">
                                        <h2 className="text-center font-semibold text-md md:text-xl px-4">{title}</h2>
                                    </div>
                                    <div>
                                        {
                                            buttonClose &&
                                            <IconButton
                                                sx={{ position: 'absolute', top: 5, right: 0 }}
                                                onClick={(e) => onClose ? onClose(e, 'backdropClick') : () => { }}
                                                size="small"
                                            >
                                                <CloseIcon
                                                />
                                            </IconButton>
                                        }
                                    </div>

                                </header>
                                {
                                    title != '' &&
                                    <div className="mb-4">
                                        <Divider />

                                    </div>
                                }
                                <div className="p-4">
                                    <>
                                        {props.children}
                                    </>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="w-auto bg-transparent flex justify-center overflow-auto">
                            {
                                buttonClose &&
                                <IconButton
                                    sx={{ position: 'absolute', top: 5, right: 0 }}
                                    onClick={(e) => onClose ? onClose(e, 'backdropClick') : () => { }}
                                    size="small"
                                >
                                    <CloseIcon
                                    />
                                </IconButton>
                            }
                            <>
                                {props.children}
                            </>
                        </div>
                }



            </>
        </Modal>
    </>);
};


export default AppModal;