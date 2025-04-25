import { FormControl, FormLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

type AppPhoneNumberInputProps = {
    name: string;
    placeholder?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control?: any;
    label?: string;
    fullWidth?: boolean;
    labelStrong?: boolean;
    className?: string;
};

export const AppPhoneNumberInput: React.FC<AppPhoneNumberInputProps> = ({ name, placeholder, control, label, fullWidth, labelStrong, className }) => {

    return (
        <>
            <div className={className}>

                <Controller
                    name={name}
                    control={control}
                    render={(({ field, fieldState }) => (
                        <FormControl fullWidth={fullWidth} 
                        >
                            <FormLabel sx={{ fontWeight: labelStrong ? 'bold' : 'normal' }}>{label}</FormLabel>
                            <PhoneInput
                                ref={field.ref}
                                placeholder={placeholder}
                                value={field.value}
                                onChange={(value) => field.onChange({ target: { value: value } })}
                                className="border border-gray-300 p-2 w-full rounded-lg"

                            />
                            {fieldState.error && (
                                <span className="text-red-400 text-xs">Invalid phone number</span>
                            )}
                        </FormControl>
                    ))}

                />
            </div>
        </>
    );
};