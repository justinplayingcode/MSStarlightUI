import { Alignment, Stack, css } from "@fluentui/react";
import './index.scss'

export interface IInfomationGridItem{
    label: string | JSX.Element;
    value: string | JSX.Element
}

interface IProps {
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
                    style={{ width: props.customLabelWidth || '160px'}}
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
                    {renderText(item?.value)}
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