import { FormControl, FormLabel, TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";

type AppInputProps = {
    inputProps: TextFieldProps
    label: string;
    fullWidth?: boolean;
    labelStrong?: boolean;
    control: unknown,
    className?: string;
};

const AppInput: React.FC<AppInputProps> = ({ label, inputProps, control, labelStrong, className, fullWidth }) => {
    return (
        <>
        <div className={className}>
            <FormControl fullWidth={fullWidth}>
                <FormLabel sx={{fontWeight: labelStrong ? 'bold' : 'normal' }}>{label}</FormLabel>
                <Controller
                    name={inputProps.name ?? ''}
                    control={control}
                    render={(({ field, fieldState }) => (
                        <TextField
                            variant="outlined"
                            {...inputProps}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            inputRef={field.ref}
                            error={fieldState?.error ? true : false}
                            helperText={fieldState?.error?.message || inputProps.helperText}
                            color={fieldState?.error ? 'primary' : 'error'}
                            value={field.value ?? ''}
                        />
                    ))}
                />
            </FormControl>
        </div>

        </>
    );
};

export default AppInput;