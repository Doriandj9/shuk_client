import { FormControlLabel, FormLabelProps, Switch, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

type AppSwitchProps = {
    label: string;
    labelStrong?: boolean;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control?: any;
    isChecked?: boolean;
    className?: string;
    propsFormControl?: FormLabelProps
};

const AppSwitch: React.FC<AppSwitchProps> = ({ label, name, labelStrong, control, isChecked, className, propsFormControl }) => {

    return (
        <>
            <div className={className}>
                <Controller
                    name={name}
                    control={control}
                    render={(({ field }) => (
                        <FormControlLabel
                            {...propsFormControl}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            control={
                                <Switch
                                    inputRef={field.ref}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    defaultChecked={isChecked}
                                    value={field.value ?? ''}

                                />
                            }
                            label={<>
                                <Typography sx={{ fontWeight: labelStrong ? 'bold' : 'normal', padding: 0, margin:0 }} >{label}</Typography>
                            </>}
                            labelPlacement="start"
                        />
                    ))}
                />
            </div>

        </>
    );
};

export default AppSwitch;