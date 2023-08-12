import { FontIcon} from "@fluentui/react";

export interface IIconProps {
    name: string;
    className?: string;
    ariaLabel?: string;
}

export const IconComponent = (props: IIconProps) => {
    return (
        <FontIcon
            className={props.className}
            iconName={props.name}
            aria-label={props.ariaLabel || ""}
        />
    )
}