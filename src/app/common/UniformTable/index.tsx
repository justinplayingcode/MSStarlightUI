import * as React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { DetailsListLayoutMode, Selection, SelectionMode, IColumn, ConstrainMode, DetailsList } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { CommandBar, ICommandBarItemProps, Icon, ShimmeredDetailsList, Stack } from '@fluentui/react';
import './index.scss';
import { ApiStatus } from 'model';
import { connect } from 'react-redux';
import { setTableSelectedCount, setTableSelectedItem } from 'src/redux/reducers';
import { RootState } from 'src/redux/store';
import Pagination from 'src/app/common/pagination';
import { TableType } from 'src/model/enum';

const classNames = mergeStyleSets({ controlWrapper: { display: 'flex',flexWrap: 'wrap', paddingLeft: '20px'}, selectionDetails: { marginBottom: '20px'}});
const controlStyles = {root: { margin: '0 30px 20px 0', maxWidth: '300px'}};

// ================

export interface IUniformTableOwnProps {
    columns: IColumn[];
    commandBarItems: ICommandBarItemProps[];
    integrateItems: (requestBody: any) => Promise<any>;
    tableType: TableType;
    pageSize?: number;
}

export interface  IUniformTablePropsFromState {
  refresh: boolean;
}

export interface IUniformTablePropsFromDispatch {
  setTableSelectedCount: any;
  setTableSelectedItem: any;
}

type IUniformTableProps = IUniformTableOwnProps & IUniformTablePropsFromDispatch & IUniformTablePropsFromState;

export interface IUniformTableState {
    items: any[];
    selectionDetails: string;
    columns: IColumn[];
    isLoading: boolean;

    page: number;
    total: number;
    pageSize: number;
    searchKey: string;
}

const mapDispatchToProps = {
  setTableSelectedCount,
  setTableSelectedItem
}

const mapStateToProps = (state: RootState) => ({
  refresh: state.table.refresh
})

class UniformTable extends React.Component<IUniformTableProps, IUniformTableState> {
    private _selection: Selection;
    private _buttonSearch;

    constructor(props: IUniformTableProps) {
        super(props);
        this._buttonSearch = React.createRef();
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
            searchKey: "",
            page: 1,
            total: 0,
            pageSize: this.props.pageSize || 20,
        };
    }

    componentDidMount(): void {
      this.getData();
      this.props.setTableSelectedCount(0);
      this.props.setTableSelectedItem([]);
    }

    componentDidUpdate(prevProps: Readonly<IUniformTableProps>, prevState: Readonly<IUniformTableState>, snapshot?: any): void {
      if(this.props.refresh !== prevProps.refresh) {
        this.OnRefresh();
      }
    }

    private getData() {
      const { searchKey, page } = this.state;
      const requestBody = {
        page: page,
        pageSize: this.state.pageSize,
        tableType: this.props.tableType,
        searchKey: searchKey
      }
      this.setState({
        items: [],
        isLoading: true,
      });
      this.props.integrateItems(requestBody).then((data) => {
        if (data.status === ApiStatus.succes) {
          this.setState({
            items: data.data.values,
            total: data.data.total
          })
        }
      }).catch(() => {
        this.setState({
          items: [],
        })
      }
      ).finally(() => {
        this.setState({ isLoading: false })
      })
    }

    private OnRefresh() {
      this.setState({
        searchKey: ""
      }, () => this.getData());
    }

    private onClickSearch() {
      this.getData();
    }
    private onKeyDownSearch = (e) => {
      if(e.key === "Enter") {
        this.state.searchKey.length > 0 ? this._buttonSearch.current.click() : undefined
      }
    }

    private onChangePaging(value: number) {
      this.setState({
        page: value
      }, () => this.getData())
    }

    public render() {
        const { items, columns, isLoading, total, pageSize } = this.state;
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
            <Stack className='table-container' onKeyDown={this.onKeyDownSearch.bind(this)}
            >
                <div className='details-list'>
                    <div className='details-list-sub-header'>
                        <div className='details-list-sub-header-item'>
                            <CommandBar
                                items={commandBar}
                            />
                        </div>
                        <div className={`${classNames.controlWrapper} details-list-sub-header-item`}>
                            <TextField 
                              placeholder='Tìm kiếm' 
                              onChange={this._onChangeText} 
                              styles={controlStyles} 
                              disabled={isLoading}
                              value={this.state.searchKey}
                            />
                            <div 
                              className={`details-list-sub-header-item-icon ${isLoading ? "disable" : ""}`}
                              onClick={this.state.searchKey.length > 0 ? this.onClickSearch.bind(this) : undefined}
                              ref={this._buttonSearch}
                            >
                              <Icon 
                                iconName={"Search"} 
                              />
                            </div>
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
                            />
                          }
                        </MarqueeSelection>
                        {items.length === 0 && !isLoading &&
                            <div className='details-list-no-content'>
                                <Icon 
                                  iconName={"EventTentative"} 
                                  className='details-list-no-content-icon'
                                />
                                <p>Không có dữ liệu...</p>
                            </div>
                        }
                    </div>
                    <div className='details-list-paging'>
                        <Pagination
                          pageTotal={Math.ceil(total/pageSize)}
                          postPerPage={10}
                          callback={this.onChangePaging.bind(this)}
                          disable={isLoading}
                        />
                    </div>
                </div>
            </Stack>
        );
    }

    private _onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
        this.setState({
          searchKey: text.trim()
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
}
export default connect(mapStateToProps, mapDispatchToProps)(UniformTable)