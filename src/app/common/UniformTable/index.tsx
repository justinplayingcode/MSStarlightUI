import * as React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { DetailsListLayoutMode, Selection, SelectionMode, IColumn, ConstrainMode, DetailsList } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { CommandBar, ICommandBarItemProps, ShimmeredDetailsList, Stack } from '@fluentui/react';
import './index.scss';
import { Convert } from 'utils';
import { ApiStatus } from 'model';
import { connect } from 'react-redux';
import { setTableSelectedCount, setTableSelectedItem } from 'src/redux/reducers';

const classNames = mergeStyleSets({ controlWrapper: { display: 'flex',flexWrap: 'wrap', paddingLeft: '20px'}, selectionDetails: { marginBottom: '20px'}});
const controlStyles = {root: { margin: '0 30px 20px 0', maxWidth: '300px'}};

// ================

export interface IUniformTableOwnProps {
    columns: IColumn[];
    searchByKeyWord: string;
    commandBarItems: ICommandBarItemProps[];
    integrateItems: () => Promise<any>
}

export interface IUniformTablePropsFromDispatch {
  setTableSelectedCount: any;
  setTableSelectedItem: any;
}

type IUniformTableProps = IUniformTableOwnProps & IUniformTablePropsFromDispatch;

export interface IUniformTableState {
    items: any[];
    selectionDetails: string;
    columns: IColumn[];
    isLoading: boolean;
}

const mapDispatchToProps = {
  setTableSelectedCount,
  setTableSelectedItem
}

class UniformTable extends React.Component<IUniformTableProps, IUniformTableState> {
    private _selection: Selection;
    private _allItems: any[];

    constructor(props: IUniformTableProps) {
        super(props);
        this._allItems = [];
        this._selection = new Selection({
            onSelectionChanged: () => {
              this.props.setTableSelectedCount(this._selection.getSelectedCount());
              this.props.setTableSelectedItem(this._selection.getSelection());
              this.setState({
                selectionDetails: this._getSelectionDetails(),
              });
            },
        });
        this.state = {
            selectionDetails: this._getSelectionDetails(),
            items: [],
            isLoading: true,
            columns: this.props.columns,
        };
    }

    componentDidMount(): void {
      this.getData();
      this.props.setTableSelectedCount(0);
      this.props.setTableSelectedItem([   ]);
    }

    private getData() {
      this.props.integrateItems().then((data) => {
        if (data.status === ApiStatus.succes) {
          this.setState({
            items: data.data,
          })
          this._allItems = data.data
        }
      }).catch(() => {
        this.setState({
          items: [],
        })
        this._allItems = []
      }
      ).finally(() => {
        this.setState({ isLoading: false })
      })
    }

    private OnRefresh() {
      this.setState({
        items: [],
        isLoading: true,
      });
      this._allItems = []
      this.getData();
    }

    public render() {
        const { items, columns, isLoading } = this.state;
        const commandBar: ICommandBarItemProps[] = [
          ...this.props.commandBarItems,
          {
            key: 'refresh',
            text: 'Refresh',
            iconProps: { iconName: 'Refresh' },
            onClick: this.OnRefresh.bind(this),
          }
        ]

        return (
            <Stack className='table-container'>
                <div className='details-list'>
                    <div className='details-list-sub-header'>
                        <div className='details-list-sub-header-item'>
                            <CommandBar
                                items={commandBar}
                            />
                        </div>
                        <div className={`${classNames.controlWrapper} details-list-sub-header-item`}>
                            <TextField placeholder='Tìm kiếm' onChange={this._onChangeText} styles={controlStyles} iconProps={{iconName: 'search'}} />
                        </div>
                    </div>
                    <div className='details-list-wrapper'>
                        <MarqueeSelection selection={this._selection}>
                          {
                            isLoading ? 
                              <ShimmeredDetailsList
                                items={items}
                                columns={columns}
                                enableShimmer={true}
                              />
                            :
                            <DetailsList
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
                              // onColumnHeaderClick={this._onColumnClick}
                            />
                          }
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
export default connect(null, mapDispatchToProps)(UniformTable)