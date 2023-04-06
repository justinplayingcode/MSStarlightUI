import { Dropdown, IDropdownOption, ResponsiveMode } from "@fluentui/react"
import * as React from "react"

export interface IDropdownProp{
    options: IDropdownOption[];
    defaultSelectedKeys?: string[] | number[];
    dropdownWidth?: number | 'auto';
    multiSelectDelimiter?: string;
    onChange?: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;
    placeholder?: string;
    responsiveMode?: ResponsiveMode;
    selectedKeys?: string[] | number[] | null;
}

export const DropdownComponent = (props: IDropdownProp) => {
    return(
        <Dropdown 
            options={props.options || []}
            defaultSelectedKeys={props?.defaultSelectedKeys}
            dropdownWidth={props?.dropdownWidth}
            multiSelectDelimiter={props?.multiSelectDelimiter}
            onChange={props?.onChange} 
            placeholder={props?.placeholder}
            responsiveMode={props?.responsiveMode}
            selectedKeys={props?.selectedKeys}     
        />
    )
}