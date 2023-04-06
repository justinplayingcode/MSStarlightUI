import * as React from 'react'
import { ITableGridProps } from './home.type'
import { useCallback, useEffect, useState } from 'react'
import { SearchBox } from '@fluentui/react';

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
        setSearchText(props.searchText || "");
    }, [props.searchText]);

    // const renderSearchBox = useCallback(() => {
    //     if(props.hasCheckbox){
    //         return(
    //             <SearchBox
    //                 showIcon
    //                 value={searchText}
    //                 placeholder={props.placeHolder}
    //                 onChange={(e, val) => setSearchText(val || "")}
    //                 onSearch={(val) => {
    //                     onSearch(val || "");
    //                     setSelectAll(false);
    //                     !props?.updateSelectedItems([])
    //                 }}
    //                 onEscape={() => {
    //                     onSearch("");
    //                     setSelectAll(false);
    //                     props?.updateSelectedItems([]);
    //                 }}
    //                 onClear={() => {
    //                     onSearch("");
    //                     setSelectAll(false);
    //                     props?.updateSelectedItems([];)
    //                 }}
    //             />
    //         );
    //     }
    // }, [props.hasSearchBox, props.placeHolder, searchText, onSearch]);
    
    return(
        <>
        </>
    )
}