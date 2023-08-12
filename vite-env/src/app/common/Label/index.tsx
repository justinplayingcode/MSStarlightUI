import { Label } from "@fluentui/react"

export interface ILabelProps{
    required?: boolean;
    content: string
}

export const LabelComponent = (props: ILabelProps) => {
    return(
        <Label
            required={props?.required}
        >
            {props.content}
        </Label>
    )
}