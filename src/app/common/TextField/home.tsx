import { TextField } from "@fluentui/react"
import * as React from "react"

export interface ITextFieldProps{
    autoAdjustHeight?: boolean;
    borderless?: boolean;
    canRevealPassword?: boolean;
    className?: string;
    defaultValue?: string;
    description?: string;
    disabled?: boolean;
    errorMessage?: string | JSX.Element;
    inputClassName?: string;
    label?: string;
    multiline?: boolean;
    onChange?:(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void
    readonly?:boolean;
    resizable?: boolean;
    value?: string

}

export const TextFieldComponent = (props: ITextFieldProps ) => {
    return(
        <TextField
            autoAdjustHeight={props?.autoAdjustHeight}
            borderless={props?.borderless}
            canRevealPassword={props?.canRevealPassword}
            className={props?.className}
            defaultValue={props?.defaultValue}
            description={props?.description}
            disabled={props?.disabled}
            errorMessage={props?.errorMessage}
            inputClassName={props?.inputClassName}
            label={props?.label}
            multiline={props?.multiline}
            onChange={props?.onChange}
            readOnly={props?.readonly}
            resizable={props?.resizable}
            value={props?.value}
        />
    )
}