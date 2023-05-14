import * as React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Announced } from '@fluentui/react/lib/Announced';
import { DetailsListLayoutMode, Selection, SelectionMode, IColumn, ConstrainMode, DetailsList } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { CommandBar, ICommandBarItemProps, ShimmeredDetailsList, Stack } from '@fluentui/react';
import image from 'image';
import './index.scss';
import { Convert } from 'utils';

const classNames = mergeStyleSets({ controlWrapper: { display: 'flex',flexWrap: 'wrap', paddingLeft: '20px'}, selectionDetails: { marginBottom: '20px'}});
const controlStyles = {root: { margin: '0 30px 20px 0', maxWidth: '300px'}};

// ================

export interface IUniformTableProps {
    items: any[];
    columns: IColumn[];
    isLoading?: boolean;
    searchByKeyWord: string;
    commandBarItems: ICommandBarItemProps[]
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
            items: this.props.items,
            columns: this.props.columns
        };
    }

    componentDidUpdate(prevProps: Readonly<IUniformTableProps>, prevState: Readonly<IUniformTableState>, snapshot?: any): void {
        if(this.props.items !== prevProps.items) {
            this.setState({
                items: this.props.items
            })
            this._allItems = this.props.items;
        } else if (this.props.isLoading !== prevProps.isLoading) {
          this.forceUpdate()
        }
    }

    public render() {
        const { items, columns } = this.state;
        const { isLoading, commandBarItems } = this.props;

        return (
            <Stack className='table-container'>
                <div className='details-list'>
                    <div className='details-list-sub-header'>
                        <div className='details-list-sub-header-item'>
                            <CommandBar
                                items={commandBarItems}
                            />
                        </div>
                        {/* <div>
                            <div className={classNames.selectionDetails}>{selectionDetails}</div>
                            <Announced message={selectionDetails} />
                        </div> */}
                        <div className={`${classNames.controlWrapper} details-list-sub-header-item`}>
                            <TextField label="Search by name:" onChange={this._onChangeText} styles={controlStyles} />
                            <Announced message={`Number of items after filter applied: ${items.length}.`} />
                        </div>
                    </div>
                    <div className='details-list-wrapper'>
                        <MarqueeSelection selection={this._selection}>
                            <ShimmeredDetailsList
                                items={items}
                                columns={columns}
                                selectionMode={SelectionMode.single}
                                getKey={this._getKey}
                                setKey="single"
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
                                enableShimmer={isLoading}
                                onColumnHeaderClick={this._onColumnClick}
                            />
                        </MarqueeSelection>
                        {items.length === 0 && !isLoading &&
                            <div className='details-list-no-content'>
                                {/* <img alt='' src={image.dataNotFound}/> */}
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
        const removeDiacritics = Convert.removeDiacritics(text);
        this.setState({
            items: removeDiacritics ? this._allItems.filter(i => Convert.removeDiacritics(i[searchByKeyWord]).toLowerCase().indexOf(removeDiacritics) > -1) : this._allItems,
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
        const diacritics = (item) => {
          if(typeof item === 'string') {
            return item.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          }
          return item
        }
        function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
            const key = columnKey as keyof T;
            return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? diacritics(a[key]) < diacritics(b[key]) : diacritics(a[key]) > diacritics(b[key])) ? 1 : -1));
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
        const newItems = _copyAndSort(items, currColumn.key!, currColumn.isSortedDescending);
        this.setState({
            columns: newColumns,
            items: newItems,
        });
    };
}
    