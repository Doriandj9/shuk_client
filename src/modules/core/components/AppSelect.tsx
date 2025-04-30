import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

type AppSelectProps = {
    name: string;
    label: string;
    fullWidth?: boolean;
    labelStrong?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any,
    className?: string;
    id?: string;
    options: { value: string | number; label: string, selected?:boolean; }[];
    placeholder?: string;
};

const AppSelect: React.FC<AppSelectProps> = ({ name, label, control, fullWidth, className, labelStrong, id, options, placeholder }) => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    return (
        <>
            <div className={className}>
                <FormControl fullWidth={fullWidth}>
                    <FormLabel sx={{ fontWeight: labelStrong ? 'bold' : 'normal' }}>{label}</FormLabel>
                    <Controller
                        name={name}
                        control={control}
                        render={(({ field }) => (
                            <Select
                                labelId={id}
                                displayEmpty
                                value={field.value ?? ''}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                MenuProps={MenuProps}
                                sx={{minWidth: '7rem', maxWidth: '100%'}}
                                placeholder={placeholder}
                            >
                                {options.map((item, index) => (
                                    <MenuItem key={index} id={String(index)} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>

                        ))}
                    />
                </FormControl>
            </div>
        </>
    );
};


export default AppSelect;