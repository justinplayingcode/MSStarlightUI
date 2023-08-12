import { Alignment, DatePicker, Dropdown, IDropdownOption, Stack, TextField, css } from "@fluentui/react";
import './index.scss'
import { onFormatDate } from "src/model/userModel";
import { Convert } from "utils";
import { Dictionary } from "@reduxjs/toolkit";

export enum InputType{
    DisText,
    Text,
    Dropdown,
    Date
}
export interface IInfomationGridItem{
    label: string | JSX.Element;
    onChange?: (newValue?: string | IDropdownOption | Date) => void;
    value: string;
    type?: InputType;
    option? : IDropdownOption[];
    errorMessage? : string
}

interface IProps {
    isEdit?: boolean;
    //list data to show
    items: IInfomationGridItem[];

    isDataLoaded?: boolean;

    verticalAlign?: Alignment;

    customLabelWidth?: string;

    customValueWidth?: string;

    gridWrapperStyle?: string;
}

export const InfomationGridComponent = (props: IProps) => {
    const renderText = (text?: string | JSX.Element) => {
        return (
            <Stack verticalAlign={props.verticalAlign || 'start'} verticalFill>
                {text}
            </Stack>
        )
    }

    const renderInput = (item: IInfomationGridItem) => {
        switch(item.type){
            case InputType.DisText:
                return(
                    <TextField
                        disabled
                        value={item.value}
                    />
                )
            case InputType.Text:
                return(
                    <TextField
                        value={item.value}
                        onChange={(e, val) =>{
                            item.onChange?.(val)
                        }}
                        errorMessage={item?.errorMessage}
                    />
                )
            case InputType.Dropdown:
                return(
                    <Dropdown
                        options={item?.option || []}
                        selectedKey={item.value}
                        onChange={(e, option) => {
                            item.onChange?.(option)
                        }} 
                        errorMessage={item?.errorMessage}
                    />
                )
            case InputType.Date:
                return(
                    <>
                    <DatePicker
                        allowTextInput={false}
                        formatDate={onFormatDate}
                        value={Convert.dmystringtoDate(item?.value)}
                        onSelectDate={(date) => {
                            item.onChange(date)                            
                        }}
                    />
                    <Stack style={{color: 'red'}}>{item?.errorMessage}</Stack>
                    </>
                )
            default:
                return <></>
        }
    }

    const renderItem = (item: IInfomationGridItem, index: number) => {
        const opacity = props.isDataLoaded ? 1 : 1 - index * 0.15;
        return(
            <Stack
                horizontal
                className="grid-row"
                styles={{root: {opacity}}}
                key={`infomation-grid-item-${index}`}
            >
                <Stack.Item
                    style={{ width: props.customLabelWidth || '130px'}}
                    className={css("label-section", { 'has-background': props.isDataLoaded})}
                    disableShrink
                    grow={0}
                >
                    {renderText(item?.label)}
                </Stack.Item>
                <Stack.Item
                    style={{width: !!props.customValueWidth && props.customValueWidth}}
                    className="value-section"
                    grow={1}
                >
                    {
                    !props?.isEdit
                        ? renderText(item?.value)
                        : renderInput(item)
                    }
                    
                </Stack.Item>
            </Stack>
        )
    }

    const renderList = () => {
        const items = props.isDataLoaded
            ? props.items
            : Array.from<IInfomationGridItem>({length: 5});
        return items.map((item, index) => renderItem(item, index))
    }

    return(
        <Stack
            tokens={{childrenGap: 2}}
            className={css("infomation-grid-wrapper", props.gridWrapperStyle)}
        >
            {renderList()}
        </Stack>
    )
}