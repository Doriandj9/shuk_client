import { Chip } from "@mui/material";
import { Controller } from "react-hook-form";
import DoneIcon from '@mui/icons-material/Done';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';


type AppChipProps = {
    label: string;
    name: string;
    labelStrong?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any,
    className?: string;
    loading?: boolean;
    value?: string;
    setValues?: (prevState: string[]) => unknown;
    values?: string[];
};

export const AppChip: React.FC<AppChipProps> = ({ name, control, label, className, value, setValues, values }) => {
    const isDone = values?.includes(value ?? '');


    return (
        <>
            <div className={className}>
                {
                    control ?
                        <Controller
                            name={name}
                            control={control}
                            render={(({ field }) => {
                                return (
                                    < Chip
                                        label={<span className="text-xs">{label}</span>}
                                        onClick={() => {
                                            if (!setValues || !value) return;
                                            const current = field.value instanceof Array ? field.value : [];

                                            const result = !current.includes(value) ?
                                                [...current, value] :
                                                [...current].filter((item) => item !== value);

                                            field.onChange({ target: { value: result } });
                                        }}
                                        icon={isDone ? <DoneIcon /> : <HorizontalRuleIcon />}
                                        color={isDone ? 'primary' : 'default'}
                                    />
                                );
                            })}
                        />
                        :
                        < Chip
                            label={<span className="text-xs">{label}</span>}
                            onClick={() => {
                                if (!setValues || !value || !values) return;

                                if (!values.includes(value)) {
                                    setValues([...values, value]);
                                } else {
                                    setValues([...values].filter((item) => item !== value));
                                }
                            }}
                            icon={isDone ? <DoneIcon /> : <HorizontalRuleIcon />}
                            color={isDone ? 'primary' : 'default'}
                        />
                }
            </div>
        </>
    );
};