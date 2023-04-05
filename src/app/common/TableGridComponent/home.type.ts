import { DetailsListLayoutMode, IColumn } from "@fluentui/react";

export interface ITableGridProps<T> {
    //
    enableShimmer?: boolean;

    hasSearchBox?: boolean;

    searchText?: string;

    placeHolder?: string;

    onSearch?: (searchText: string) => void;

    hasFilter?: boolean;
    //loading filter
    enableFilterPanelShimmer?: boolean;
    //if need filter, i'll add later
    // filterGroup?: IFilterGroup[];
    //manageColumn callout

    selectedColumnKeys?: string[];

    updateSelectedColumnKeys?: (keys: string[]) => void;

    //Operation button
    commandButtons?: JSX.Element[];

    hasSelectedCount?: boolean;

    showTotalCount?: boolean;

    disableNoItems?: boolean;

    isHeaderVisible?: boolean;

    compact?: boolean;

    items?: T[];

    columns: IColumn[];

    layoutMode?: DetailsListLayoutMode;

    enableAutoPercentColumnWidth?: boolean;

    onGridRowClick?: (item: T) => void;

    hasCheckbox?: boolean;

    selectedItems?: T[];

    comparePropertyName?: string;

    updateSelectedItems?: (items: T[]) => void;

    hasNextPage?: boolean;

    onLoadNext?: () => void;

    disableNoItemsType?: boolean;

    imagePrompt?: string;

    



}