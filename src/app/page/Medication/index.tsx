import { ICommandBarItemProps, Stack } from '@fluentui/react';
import { accountRole } from 'model';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { UniformTable } from 'src/app/common';
import { RootState } from 'src/redux/store';
import { tooltipPlainText } from 'src/utils/utils';
import { medicationColumns } from '../table/medicastioncolumn';
import Api from 'api';

const Medication = () => {

    const { role } = useSelector((state: RootState) => state.user);

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
            <UniformTable
              integrateItems={Api.medicationApi.getAllMedication}
                searchByKeyWord='name'
                columns={medicationColumns}  
                commandBarItems={getPillsCommanBar()}          
            />
        </div>
    )
}
export default Medication;