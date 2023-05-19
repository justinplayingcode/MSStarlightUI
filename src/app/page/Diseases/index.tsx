import { ICommandBarItemProps, Stack } from '@fluentui/react';
import Api from 'api';
import { accountRole } from 'model';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { UniformTable } from 'src/app/common';
import { RootState } from 'src/redux/store';
import { tooltipPlainText } from 'src/utils/utils';
import { diseasesColumns } from '../table/diseasescolumn';

const Diseases = () => {
    const { role } = useSelector((state: RootState) => state.user);

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
            <UniformTable
                integrateItems={Api.diseasesApi.getAllDiseases}
                searchByKeyWord='name'
                columns={diseasesColumns}  
                commandBarItems={getDiseasesCommanBar()}          
            />
        </div>
    )
}
export default Diseases;