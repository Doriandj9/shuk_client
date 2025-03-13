import { CircularProgress, FormControl, FormLabel, IconButton } from "@mui/material";
import { ChangeEvent, DragEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowDropUp from '@mui/icons-material/FileUpload';
import LaptopIcon from '@mui/icons-material/Laptop';
import { Close } from "@mui/icons-material";
import { Controller } from "react-hook-form";

type InputFileState = 'INITIAL' | 'DRAG-START' | 'DRAG-LEAVE' | 'DROP' | 'ERROR' | 'DROP-LOAD' | 'PREVIEW';


const clasesForState = {
    'INITIAL': '',
    'DRAG-START': 'border-2 border-green-500 bg-green-100 dark:bg-green-900 border-dashed',
    'DRAG-LEAVE': '',
    'DROP': '',
    'ERROR': 'border dark:bg-red-900 border-red-500  bg-red-50',
    'DROP-LOAD': '',
    'PREVIEW': ''
};

type AppInputFileProps = {
    label: string;
    fullWidth?: boolean;
    name: string;
    labelStrong?: boolean;
    className?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any;
    preview?: boolean;
    render: (file: Blob | null | undefined, preview: string) => unknown;
};


export const AppInputFile: React.FC<AppInputFileProps> = ({ control, name, label, className, labelStrong, preview, render }) => {
    const [t] = useTranslation('web');
    const [file, setFile] = useState<string | null | ArrayBuffer>(null);
    const [fileBlob, setFileBlob] = useState<Blob | null | undefined>(null);
    const [dropState, setDropState] = useState<InputFileState>('INITIAL');
    const [error, setError] = useState('');
    const [nameFile, setNameFile] = useState('');


    const handleDropFile = (e: DragEvent, change: (event: {target: {value: unknown}}) => unknown) => {
        e.preventDefault();
        try {
            setDropState('DROP');
            const files = e.dataTransfer.files;
            if (files.length > 1) {
                setError(t('validations.messages.one-img-post'));
                setDropState('ERROR');
                return;
            }

            if (files.length == 0) {
                setError(t('validations.messages.empty-img-post'));
                setDropState('ERROR');
                return;
            }
            setDropState('DROP-LOAD');
            const fileDrop = files[0];

            if (!fileDrop.type.includes('image/')) {
                setError(t('validations.messages.not-img-post'));
                setDropState('ERROR');
                return;
            }

            const reader = new FileReader();

            reader.onload = () => {
                setFile(reader.result);
                setNameFile(fileDrop.name);
                setDropState('PREVIEW');
            };
            
            reader.readAsDataURL(fileDrop);
            setFileBlob(fileDrop);
            change({target: {value: fileDrop}});

        } catch (e) {
            console.error(e);
            setError(t('validations.messages.unknown-img-post'));
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
    };

    const handleChangeInputFile = (e: ChangeEvent<HTMLInputElement>, change: (event: {target: {value: unknown}}) => unknown) => {
        const files = e.target.files;
        if (!files) {
            setError(t('validations.messages.not-selected-img'));
            setDropState('ERROR');
            return;
        }

        if (files.length == 0) {
            setError(t('validations.messages.not-selected-img'));
            setDropState('ERROR');
            return;
        }

        setDropState('DROP-LOAD');
        const fileDrop = files[0];

        const reader = new FileReader();

        reader.onload = () => {
            setFile(reader.result);
            setNameFile(fileDrop.name);
            setDropState('PREVIEW');
            setFileBlob(fileDrop);
        };
        reader.readAsDataURL(fileDrop);
        change({target: {value: fileDrop}});

    };

    return (
        <>
            <div className={className}>
                <Controller
                    name={name}
                    control={control}
                    render={(({ field }) => (
                        <FormControl fullWidth >
                            <FormLabel htmlFor={name} sx={{ fontWeight: labelStrong ? 'bold' : 'normal' }}>{label}</FormLabel>
                            <div className="relative w-full h-24 border">
                                {
                                    dropState !== 'DRAG-START' &&
                                    <div className="flex flex-col items-center absolute center-absolute w-full">
                                        {
                                            (dropState === 'PREVIEW' || dropState === 'DROP-LOAD') ? '' :
                                                <>
                                                    <section className="flex justify-center items-center gap-1">
                                                        <ArrowDropUp />
                                                        <span className="">
                                                            {t('titles.drop-file')}
                                                        </span>
                                                    </section>
                                                    <span>{t('login.labels.or')}</span>
                                                    <label htmlFor="file-post" className="block flex items-center gap-1 cursor-pointer">
                                                        <LaptopIcon />
                                                        {t('titles.file-search')}
                                                        <input type="file" id="file-post" accept="image/*"
                                                            onChange={(e) => handleChangeInputFile(e, field.onChange)}
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
                                            <div className="px-6  py-2 border-2 border-preview rounded-md relative text-container-overflow max-w-full">
                                                {
                                                    preview &&
                                                    <img src={typeof file === 'string' ? file : ''} alt="file preview"
                                                        className="w-20 h-20 rounded-md"
                                                    />
                                                }
                                                {
                                                    !preview &&
                                                    <span className="">
                                                        {nameFile}
                                                    </span>
                                                }
                                                <IconButton sx={{
                                                    position: 'absolute',
                                                    top: -5,
                                                    right: -5,
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
                                    onDrop={(e) => handleDropFile(e,field.onChange)}
                                    draggable
                                >
                                    {dropState == 'DRAG-START' && <span className="text-mode-primary">{t('titles.drag-file')}</span>}
                                </div>
                            </div>
                        </FormControl>

                    ))}
                />
            </div>
            {
                render(fileBlob, typeof file === 'string' ? file : '')
            }
        </>
    );
};