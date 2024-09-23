import { FormControlOptions, FormLabelProps, Input, InputProps,FormControl, FormLabel } from "@chakra-ui/react";
import ComponentChakra from "./ComponentChakra";
import React from "react";
import { useThemeMode } from "@/store/themeMode";
import { app } from "@/config/app";

type FormControlChakra = {
    label: string;
    withProvider?: boolean;
    disabledControl?: boolean;
    disabledInput?: boolean;
    labelStrong?: boolean;
    propsControl?: FormControlOptions;
    propsInputs?: InputProps;
    propsLabel?: FormLabelProps;
    validation?: string | boolean
};

const AppFormInput: React.FC<FormControlChakra> = ({
    label,disabledControl=false, disabledInput=false, 
    labelStrong= true, propsControl, propsInputs,
    propsLabel, withProvider = false, 
    validation= false
}) => {

    const theme = useThemeMode((state) => state.theme);

    return (
        <>
        
        <ComponentChakra whitProvider={withProvider}>
            <FormControl className="mt-2" isDisabled={disabledControl} {...propsControl}>
                <FormLabel {...propsLabel}>
                    {labelStrong ? 
                    <strong className="text-mode-primary">{label}</strong> 
                    :
                    <span>{label}</span> }
                </FormLabel>
                <Input {...propsInputs} disabled={disabledInput} sx={{
                    _hover:{zIndex: 0},
                    _focus:{
                        zIndex: 0,
                        borderColor: theme !== 'dark' ? app.colors.primary : app.colors.secondary,
                        outlineColor: 'none',
                    },
                    borderColor: theme !== 'dark' ? '#ccc' : 'white',
                    backgroundColor: theme !== 'dark' ? 'white' : '#e2e8f0'
                    }}
                    />
                {validation && <span className="text-red-500 dark:text-red-400 text-xs">{validation}</span>}
            </FormControl>
        </ComponentChakra>
        </>
    );
};

export default AppFormInput;