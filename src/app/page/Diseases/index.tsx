import { ICommandBarItemProps, Stack } from '@fluentui/react';
import { accountRole } from 'model';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { UniformTable } from 'src/app/common';
import { RootState } from 'src/redux/store';
import { tooltipPlainText } from 'src/utils/utils';

const Diseases = () => {
    const { role } = useSelector((state: RootState) => state.user);

    const diseasesColumns =[
        {
            key: 'code',
            name: 'Mã bệnh',
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,
            isSorted: true,
            isSortedDescending: false,
            onRender: (item) => {
                return <div>{item?.code}</div>;
            },
        },
        {
            key: 'name',
            name: 'Tên bệnh',
            minWidth: 180,
            maxWidth: 250,
            isResizable: true,
            onRender: (item) => {
                return <span>{item?.name}</span>;
            },
        },
        {
            key: 'description',
            name: 'Mô tả',
            minWidth: 230,
            maxWidth: 350,
            isResizable: true,
            onRender: (item) => {
                return (tooltipPlainText(item?.description));
            },
        },
        {
            key: 'department',
            name: 'Khoa',
            minWidth: 230,
            maxWidth: 350,
            isResizable: true,
            onRender: (item) => {
                return <span>{item?.departmentId}</span>;
            },
        },

    ];

    const getDiseasesCommanBar = () => {
        const commadBarButton: ICommandBarItemProps[] =[];
        if(role === accountRole.Admin){
            commadBarButton.push(
            {
                key: 'newItem',
                text: 'Thêm',
                iconProps: { iconName: 'Add' },
                onClick: () => { alert('thêm') },
            },
            {
                key: 'editItem',
                text: 'Sửa',
                iconProps: { iconName: 'Edit' },
                onClick: () => { alert('Sửa') },
            },
            {
                key: 'deleteItem',
                text: 'Xóa',
                iconProps: { iconName: 'Delete' },
                onClick: () => { alert('Xóa') },
            },
            )
        }
        return commadBarButton;
    } 
    return(
        <div className='wrapper-table-content'>
            {/* <>Quản lí bệnh
                <Stack>Xem danh sách</Stack>
                <Stack> thêm sửa xóa thuốc - admin</Stack>
            </> */}
            {/* <UniformTable
                searchByKeyWord='name'
                items={DiseasesList}
                isLoading={isLoading} 
                columns={diseasesColumns}  
                commandBarItems={getDiseasesCommanBar()}          
            /> */}
        </div>
    )
}
export default Diseases;