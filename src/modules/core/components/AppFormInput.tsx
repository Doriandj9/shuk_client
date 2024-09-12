import { FormControlOptions, FormLabelProps, Input, InputProps,FormControl, FormLabel } from "@chakra-ui/react";
import ComponentChakra from "./ComponentChakra";
import React from "react";
import { useThemeMode } from "@/store/themeMode";
import { app } from "@/config/app";

type FormControlChakra = {
    label: string;
    disabledControl?: boolean;
    disabledInput?: boolean;
    labelStrong?: boolean;
    propsControl?: FormControlOptions;
    propsInputs?: InputProps;
    propsLabel?: FormLabelProps;
};

const AppFormInput: React.FC<FormControlChakra> = ({
    label,disabledControl=false, disabledInput=false, 
    labelStrong= true, propsControl, propsInputs,
    propsLabel
}) => {

    const theme = useThemeMode((state) => state.theme);

    return (
        <>
        <ComponentChakra>
            <FormControl isDisabled={disabledControl} {...propsControl}>
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
                    backgroundColor: theme !== 'dark' ? 'white' : 'white'
                    }} />
            </FormControl>
        </ComponentChakra>
        </>
    );
};

export default AppFormInput;