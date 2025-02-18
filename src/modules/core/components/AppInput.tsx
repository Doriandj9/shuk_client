import { CircularProgress, FormControl, FormLabel, TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";

type AppInputProps = {
    inputProps: TextFieldProps
    label: string;
    fullWidth?: boolean;
    labelStrong?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any,
    className?: string;
    loading?: boolean;
};

const AppInput: React.FC<AppInputProps> = ({ label, inputProps, control, labelStrong, className, fullWidth, loading }) => {
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
                            disabled={loading}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                      </>
                                    )
                                }
                            }}
                        />
                    ))}
                />
            </FormControl>
        </div>

        </>
    );
};

export default AppInput;