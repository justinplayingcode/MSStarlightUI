import { IColumn, Stack } from '@fluentui/react';
import './index.scss';
import { useState, useEffect } from 'react';
import { UniformTable } from 'src/app/common';
import Api from 'src/api/index'
import { departmentManagementColumns } from '../table/departmentManagementTable';

const Speciality = () => {


    return(
        <div className='wrapper-table-content speciality-wrapper'>
            <UniformTable
                commandBarItems={[]}
                searchByKeyWord='name'
                columns={departmentManagementColumns} 
                integrateItems={Api.departmentApi.getAllDepartment}            
            />
        </div>
    )
}
export default Speciality;