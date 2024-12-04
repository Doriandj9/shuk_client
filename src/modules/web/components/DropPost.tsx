import { ChangeEvent, DragEvent, useState } from "react";
import ArrowDropUp from '@mui/icons-material/FileUpload';
import LaptopIcon from '@mui/icons-material/Laptop';
import Close from '@mui/icons-material/Close';
import { CircularProgress, IconButton } from "@mui/material";
import { usePostStore } from "@/store/postStore";

type DropPostState = 'INITIAL' | 'DRAG-START' | 'DRAG-LEAVE' | 'DROP' | 'ERROR' | 'DROP-LOAD' | 'PREVIEW';


const clasesForState = {
    'INITIAL': '',
    'DRAG-START': 'border-2 border-green-500 bg-green-100 dark:bg-green-900 border-dashed',
    'DRAG-LEAVE': '',
    'DROP': '',
    'ERROR': 'border dark:bg-red-900 border-red-500  bg-red-50',
    'DROP-LOAD': '',
    'PREVIEW': ''
};


const DropPost = () => {
    const fileStore = usePostStore((state) => state.value.file);
    const updateFile = usePostStore((state) => state.updateValueFile);
    const [file, setFile] = useState<string | null | ArrayBuffer>(null);
    
    const [dropState, setDropState] = useState<DropPostState>('INITIAL');
    const [error, setError] = useState('');
    
    if(fileStore && dropState !== 'PREVIEW'){
        const reader = new FileReader();
        reader.onload = () => {
            if(!file){
                setFile(reader.result);
                setDropState('PREVIEW');
            }
        };
        reader.readAsDataURL(fileStore);
    }

    const handleDropFile = (e: DragEvent) => {
        e.preventDefault();
        try {
            setDropState('DROP');
            const files = e.dataTransfer.files;
            if (files.length > 1) {
                setError('No puede arrastrar mas de una imagen por publicación');
                setDropState('ERROR');
                return;
            }

            if (files.length == 0) {
                setError('No arrastro una imagen');
                setDropState('ERROR');
                return;
            }
            setDropState('DROP-LOAD');
            const fileDrop = files[0];

            if(!fileDrop.type.includes('image/')){
                setError('El archivo arrastrado no es una imagen');
                setDropState('ERROR');
                return; 
            }

            const reader = new FileReader();

            reader.onload = () => {
                setFile(reader.result);
                updateFile(fileDrop);
                setDropState('PREVIEW');

            };

            reader.readAsDataURL(fileDrop);


        } catch (e) {
            console.error(e);
            setError('Existe un error al intentar subir el archivo');
            setDropState('ERROR');
        }
    };

    const handleDragEnter = () => {
        setDropState('DRAG-START');
    };

    const handleDragLeave = () => {
        setDropState('DRAG-LEAVE');
    };

    const resetFile = () => {
        setDropState('INITIAL');
        setFile(null);
        updateFile(null);
    };

    const handleChangeInputFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(!files){
            setError('No selecciono una imagen');
            setDropState('ERROR');
            return;
        }

        if (files.length == 0) {
            setError('No selecciono una imagen');
            setDropState('ERROR');
            return;
        }

        setDropState('DROP-LOAD');
        const fileDrop = files[0];

        const reader = new FileReader();

        reader.onload = () => {
            setFile(reader.result);
            updateFile(fileDrop);
            setDropState('PREVIEW');
        };

        reader.readAsDataURL(fileDrop);

    };

    return (
        <>
            <div className="relative w-full h-full">
                {
                    dropState !== 'DRAG-START' &&
                    <div className="flex flex-col items-center absolute center-absolute w-full">
                        {
                            (dropState === 'PREVIEW' || dropState === 'DROP-LOAD') ? '' :
                                <>
                                    <section className="flex justify-center items-center gap-1">
                                        <ArrowDropUp />
                                        <span className="">
                                            Arrastre un archivo.
                                        </span>
                                    </section>
                                    <span>O</span>
                                    <label htmlFor="file-post" className="block flex items-center gap-1 cursor-pointer">
                                        <LaptopIcon />
                                        Buscar archivo
                                        <input type="file" id="file-post" accept="image/*" 
                                        onChange={(e) => handleChangeInputFile(e)}
                                        className="opacity-0 w-0" />
                                    </label>
                                </>
                        }
                        {
                            dropState === 'ERROR' &&
                            <span className="dark:text-red-100 text-red-900 text-xs block text-center mt-2">{error}</span>
                        }
                        {
                            dropState === 'PREVIEW' &&
                            <div className="p-1 border-2 border-preview rounded-md relative">
                                <img src={typeof file === 'string' ? file : ''} alt="file preview"
                                    className="w-40 h-40 rounded-md"
                                />
                                <IconButton sx={{
                                    position: 'absolute',
                                    top: -15,
                                    right: -15,
                                    backgroundColor: 'white'
                                }} size="small"
                                    onClick={resetFile}
                                >
                                    <Close fontSize="small" color="error" />
                                </IconButton>
                            </div>
                        }

                        {
                            dropState === 'DROP-LOAD' &&
                            <CircularProgress color="info" />
                        }
                    </div>
                }
                <div className={`w-full h-full flex  justify-center items-center flex-col ${clasesForState[dropState]}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDropFile(e)}
                    draggable
                >
                    {dropState == 'DRAG-START' && <span className="text-mode-primary">Suelte la imagen</span>}
                </div>
            </div>

        </>
    );
};

export default DropPost;