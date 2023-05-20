import { ICommandBarItemProps, Stack } from '@fluentui/react';
import { accountRole } from 'model';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { UniformTable } from 'src/app/common';
import { RootState } from 'src/redux/store';
import { tooltipPlainText } from 'src/utils/utils';
import Api from 'src/api/index'
import { useDispatch } from 'react-redux';
import { openPanel } from 'src/redux/reducers';
import { panelTypeConstant } from 'src/model/contant';

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
            isSorted: true,
            isSortedDescending: false,
            onRender: (item) => {
                return <div>{item?.name}</div>;
            },
        },
        {
            key: 'designation',
            name: 'Chỉ định',
            minWidth: 280,
            maxWidth: 400,
            isResizable: true,
            onRender: (item) => {
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
            onRender: (item) => {
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
            onRender: (item) => {
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
                        onClick: () => { dispatch(openPanel(panelTypeConstant.PANEL_CREATE_MEDICATION)) },
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
            {/* <>Quản lí Thuốc (show luôn table)
                <Stack>Xem danh sách</Stack>
                <Stack> thêm sửa xóa thuốc - admin</Stack>
            </> */}
            <UniformTable
                searchByKeyWord='name'
                columns={PillsColumns}  
                commandBarItems={getPillsCommanBar()}  
                integrateItems={Api.medicationApi.getAllMedication}        
            />
        </div>
    )
}
export default Medication;