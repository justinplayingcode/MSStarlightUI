import * as React from 'react'
import { ITableGridProps } from './home.type'
import { useCallback, useEffect, useState } from 'react'
import { SearchBox, Stack } from '@fluentui/react';

export const TableGridComponent = <T,>(props: ITableGridProps<T>) => {
    const [searchText, setSearchText] = useState("");
    const [selectAll, setSelectAll] = useState(false);
    const [gridItems, setGridItems] = useState<T[]>([]);
    const [inLoadingNext, setInLoadingNext] = useState(false);
    const [gridContentWidth, setGridContentWidth] = useState(0);

    const onSearch = useCallback(
        (value: string) => {
            setSearchText(value.trim());
            props.onSearch?.(value.trim());
        },
        [props.onSearch]
    );
    
    useEffect(()=> {
        setSearchText(props.searchText!);
    }, [props.searchText]);

    const renderSearchBox = useCallback(() => {
        if(props.hasCheckbox){
            return(
                <SearchBox
                    showIcon
                    value={searchText}
                    placeholder={props.placeHolder}
                    onChange={(e, val) => setSearchText(val || "")}
                    onSearch={(val) => {
                        onSearch(val || "");
                        setSelectAll(false);
                        props.updateSelectedItems?.([])
                    }}
                    onEscape={() => {
                        onSearch("");
                        setSelectAll(false);
                        props.updateSelectedItems?.([]);
                    }}
                    onClear={() => {
                        onSearch("");
                        setSelectAll(false);
                        props.updateSelectedItems?.([]);
                    }}
                />
            );
        }
    }, [props.hasSearchBox, props.placeHolder, searchText, onSearch]);

    //filter
    //manage column button 
    //render condition?

    const renderCommandBar = () => {
        const sections: JSX.Element[] = [];
        if(props.commandButtons?.length){
            sections.push(
                <Stack key="grid-command-bars" horizontal tokens={{childrenGap: 8}}>
                    {props.commandButtons.map((item, index) => (
                        <Stack.Item key={item.key || `grid-command-item-${index}`}>{item}</Stack.Item>
                    ))}
                </Stack>
            );
        }
        if(props.hasCheckbox && props.hasSelectedCount) {
            sections.push(
                <Stack
                    key="grid-selected-status"
                    verticalFill
                    verticalAlign='center'
                    className='grid-selected-count'
                >
                    {props.showTotalCount && 
                        <>{`${props.selectedItems!.length} of ${props.items!.length} selected`}</>
                    }
                    {!props.showTotalCount &&
                     props.selectedItems!.length > 0 &&
                     <>{`${props.selectedItems!.length} selected`}</>
                    }
                </Stack>
            );
        }
        if(sections.length) {
            return(
                <Stack
                    horizontal
                    horizontalAlign='space-between'
                    tokens={{ padding: "16px 24px", childrenGap: 16}}
                    className='grid-command-button'
                >
                    {sections}
                </Stack>
            )
        }
    };

    useEffect(() => {
        if (props.items?.length){
            const newItems = [...props.items];
            if (props.hasNextPage) {
                newItems.push(...new Array(5).fill(undefined));
            }
            setGridItems(newItems);
            if(props.hasCheckbox && selectAll){
                const newSelectedItems = [...props.selectedItems!];
                props.items.forEach((item, index) => {
                    if(index >= gridItems.filter((i) => !!i).length){
                        newSelectedItems.push({...item});
                    }
                });
                props.updateSelectedItems!(newSelectedItems);
            }
        } else {
            setGridItems([]);
        }
    },[JSON.stringify(props.items), props.hasNextPage]);

    useEffect(() => {
        if (gridItems.length && props.hasNextPage) {
            const gridHeight = document.querySelector('#grid-content')?.clientHeight;
            const contentHeight = document.querySelector('#.ms-Detailist-contentWrapper')?.clientHeight;
            //5 * shimmer row, row height 43
            if( gridHeight && contentHeight && gridHeight > contentHeight - 43 * 5) {
                setInLoadingNext(true);
                props.onLoadNext?.();
            } else {
                setInLoadingNext(false);
            }
        } else {
            setInLoadingNext(false);
        }
    }, [gridItems])

    
    
    return(
        <>
        </>
    )
}