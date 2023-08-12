import { IRenderFunction, TextField } from "@fluentui/react"
import * as React from "react"

export interface ITextFieldProps extends React.AllHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>{
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
    onRenderDescription?: IRenderFunction<ITextFieldProps>;
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
            onRenderDescription={props.onRenderDescription!}
            readOnly={props?.readonly}
            resizable={props?.resizable}
            type={props?.type}
            value={props?.value}
        />
    )
}