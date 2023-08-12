import { ICommandBarItemProps } from '@fluentui/react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { tooltipPlainText } from '../../../utils/utils';
import { accountRole } from '../../../model';
import { openPanel } from '../../../redux/reducers';
import { panelTypeConstant } from '../../../model/contant';
import { UniformTable } from '../../common';
import Api from '../../../api';
import { TableType } from '../../../model/enum';

const Medication = () => {
    const dispatch = useDispatch();
    const { role } = useSelector((state: RootState) => state.user);
    const { tableSelectedCount} = useSelector((state: RootState) => state.currentSelected)

    const PillsColumns =[
        {
            key: 'name',
            name: 'Tên thuốc',
            minWidth: 180,
            maxWidth: 250,
            isResizable: true,
            onRender: (item: any) => {
                return <div>{item?.name}</div>;
            },
        },
        {
            key: 'designation',
            name: 'Chỉ định',
            minWidth: 280,
            maxWidth: 400,
            isResizable: true,
            onRender: (item: any) => {
                return(
                    tooltipPlainText(item?.designation)
                )
            },
        },
        {
            key: 'usage',
            name: 'Công dụng',
            minWidth: 280,
            maxWidth: 400,
            isResizable: true,
            onRender: (item: any) => {
                return(
                    tooltipPlainText(item?.usage)
                )
            },
        },
        {
            key: 'price',
            name: 'Giá',
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,
            onRender: (item: any) => {
                return <span>{item?.price} đ</span>;
            },
        },

    ];

    const getPillsCommanBar = () => {
        const commadBarButton: ICommandBarItemProps[] =[];
        if(role === accountRole.Admin){
            commadBarButton.push(
            {
                key: 'newItem',
                text: 'Thêm',
                iconProps: { iconName: 'Add' },
                onClick: () => { dispatch(openPanel(panelTypeConstant.PANEL_CREATE_MEDICATION)) },
            })
            if(tableSelectedCount === 1){
                commadBarButton.push(
                    {
                        key: 'editItem',
                        text: 'Sửa',
                        iconProps: { iconName: 'Edit' },
                        onClick: () => { dispatch(openPanel(panelTypeConstant.PANEL_EDIT_MEDICATION)) },
                    },
                    {
                        key: 'deleteItem',
                        text: 'Xóa',
                        iconProps: { iconName: 'Delete' },
                        onClick: () => { alert('Xóa') },
                    },
                )
            }
        }
        return commadBarButton;
    } 

    return(
        <div className='wrapper-table-content'>
            <UniformTable
                columns={PillsColumns}  
                commandBarItems={getPillsCommanBar()}  
                integrateItems={Api.medicationApi.getAllMedication}  
                tableType={TableType.medications}      
            />
        </div>
    )
}
export default Medication;