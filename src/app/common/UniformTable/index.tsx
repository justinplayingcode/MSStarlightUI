import * as React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Announced } from '@fluentui/react/lib/Announced';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn, ConstrainMode } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { CommandBar, ShimmeredDetailsList, Stack, TooltipHost } from '@fluentui/react';
import { doctormanagementCommandBar } from 'src/app/page/table/doctormanagertable';
import image from 'image';
import './index.scss';

const classNames = mergeStyleSets({ controlWrapper: { display: 'flex',flexWrap: 'wrap', paddingLeft: '20px'}, selectionDetails: { marginBottom: '20px'}});
const controlStyles = {root: { margin: '0 30px 20px 0', maxWidth: '300px'}};

// ================

export interface IUniformTableProps {
    items: any[];
    columns: IColumn[];
    isLoading?: boolean;
    searchByKeyWord: string;
    // commandBar
}

export interface IUniformTableState {
    items: any[];
    selectionDetails?: string;
    columns: IColumn[];
}

export class UniformTable extends React.Component<IUniformTableProps, IUniformTableState> {
    private _selection: Selection;
    private _allItems: any[];

    constructor(props: IUniformTableProps) {
        super(props);
        this._allItems = this.props.items;
    
        this._selection = new Selection({
            onSelectionChanged: () => {
            this.setState({
                selectionDetails: this._getSelectionDetails(),
            });
            },
        });
    
        this.state = {
            selectionDetails: this._getSelectionDetails(),
            items: this.props.items || [],
            columns: this.props.columns
        };
    }

    public render() {
        const { selectionDetails, items, columns } = this.state;
        const { isLoading } = this.props;

        return (
            <Stack className='table-container'>
                <div className='details-list'>
                    <div>
                        <CommandBar
                            items={doctormanagementCommandBar}
                        />
                    </div>
                    <div className='details-list-sub-header'>
                        <div>
                            <div className={classNames.selectionDetails}>{selectionDetails}</div>
                            <Announced message={selectionDetails} />
                        </div>
                        <div className={classNames.controlWrapper}>
                            <TextField label="Search by name:" onChange={this._onChangeText} styles={controlStyles} />
                            <Announced message={`Number of items after filter applied: ${items.length}.`} />
                        </div>
                    </div>
                    <div className='details-list-wrapper'>
                        <MarqueeSelection selection={this._selection}>
                            <ShimmeredDetailsList
                                items={items}
                                columns={columns}
                                selectionMode={SelectionMode.multiple}
                                getKey={this._getKey}
                                setKey="multiple"
                                layoutMode={DetailsListLayoutMode.justified}
                                constrainMode={ConstrainMode.unconstrained}
                                isHeaderVisible={true}
                                selection={this._selection}
                                selectionPreservedOnEmptyClick={true}
                                enterModalSelectionOnTouch={true}
                                listProps={
                                    {renderedWindowsAhead: 0,
                                    renderedWindowsBehind: 0}
                                }
                                enableShimmer={isLoading || false}
                                onColumnHeaderClick={this._onColumnClick}
                            />
                        </MarqueeSelection>
                        {items.length === 0 && !isLoading &&
                            <div className='details-list-no-content'>
                                <img alt='' src={image.dataNotFound}/>
                                <p>Không có dữ liệu...</p>
                            </div>
                        }
                    </div>
                </div>
            </Stack>
        );
    }

    private _getKey(item: any, index?: number): string {
        if(!!item) {
            return item.key;
        }
        return ''
    }

    private _onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
        const { searchByKeyWord } = this.props
        this.setState({
            items: text ? this._allItems.filter(i => i[searchByKeyWord].toLowerCase().indexOf(text) > -1) : this._allItems,
        });
    };

    private _getSelectionDetails(): string {
        const selectionCount = this._selection.getSelectedCount();
        switch (selectionCount) {
            case 0:
            return 'No items selected';
            case 1:
            return '1 item selected: ' + (this._selection.getSelection()[0] as any).name;
            default:
            return `${selectionCount} items selected`;
        }
    }

    private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
        const { columns, items } = this.state;
        const newColumns: IColumn[] = columns.slice();
        const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
        function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
            const key = columnKey as keyof T;
            return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
        }
        newColumns.forEach((newCol: IColumn) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
                currColumn.isSorted = true;
            } else {
                newCol.isSorted = false;
                newCol.isSortedDescending = true;
            }
        });
        const newItems = _copyAndSort(items, currColumn.fieldName!, currColumn.isSortedDescending);
        this.setState({
            columns: newColumns,
            items: newItems,
        });
    };
}
    