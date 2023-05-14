import { ICommandBarItemProps, Stack } from '@fluentui/react';
import { accountRole } from 'model';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { UniformTable } from 'src/app/common';
import { RootState } from 'src/redux/store';
import { tooltipPlainText } from 'src/utils/utils';

const Pills = () => {
    const [items, setItems] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] =React.useState<boolean>(false);

    const { role } = useSelector((state: RootState) => state.user);

    const pillsList = [
        {
            name: 'Peniciline',
            usage: 'một kháng sinh nhóm penicillin có tác dụng diệt khuẩn nhờ cơ chế ức chế sự tổng hợp thành tế bào vi khuẩn.',
            price: '10.000'
        },
        {
            name: 'Peniciline',
            usage: 'một kháng sinh nhóm penicillin có tác dụng diệt khuẩn nhờ cơ chế ức chế sự tổng hợp thành tế bào vi khuẩn.',
            price: '10.000'
        },
        {
            name: 'Peniciline',
            usage: 'một kháng sinh nhóm penicillin có tác dụng diệt khuẩn nhờ cơ chế ức chế sự tổng hợp thành tế bào vi khuẩn.',
            price: '10.000'
        },
        {
            name: 'Peniciline',
            usage: 'một kháng sinh nhóm penicillin có tác dụng diệt khuẩn nhờ cơ chế ức chế sự tổng hợp thành tế bào vi khuẩn.',
            price: '10.000'
        },
    ];

    React.useEffect(() => {
        setItems(pillsList)
    },[])

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
            key: 'usage',
            name: 'Công dụng',
            minWidth: 280,
            maxWidth: 400,
            isResizable: true,
            onRender: (item) => {
                // return <SelfTooltipHost text={item?.usage} />;
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
            {/* <>Quản lí Thuốc (show luôn table)
                <Stack>Xem danh sách</Stack>
                <Stack> thêm sửa xóa thuốc - admin</Stack>
            </> */}
            {/* <UniformTable
                searchByKeyWord='name'
                items={pillsList}
                isLoading={isLoading} 
                columns={PillsColumns}  
                commandBarItems={getPillsCommanBar()}          
            /> */}
        </div>
    )
}
export default Pills;