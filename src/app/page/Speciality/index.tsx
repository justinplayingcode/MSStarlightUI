import { IColumn, Stack } from '@fluentui/react';
import './index.scss';
import { UniformTable } from 'src/app/common';
import { departmentColumn } from '../table/departmentcolumn';
import Api from 'api';


const Speciality = () => {

    return(
        <div className='wrapper-table-content speciality-wrapper'>
            <UniformTable
                integrateItems={Api.departmentApi.getAllDepartment}
                commandBarItems={[]}
                searchByKeyWord='name'
                columns={departmentColumn}            
            />
        </div>
    )
}
export default Speciality;