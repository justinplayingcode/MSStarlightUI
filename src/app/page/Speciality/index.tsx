import { IColumn, Stack } from '@fluentui/react';
import './index.scss';
import { UniformTable } from 'src/app/common';
import Api from 'src/api/index'
import { departmentManagementColumns } from '../table/departmentManagementTable';
import { useEffect, useState } from 'react';

const Speciality = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [items, setItems] = useState<any[]>([])

    useEffect(() => {
        setItems(listitems)
    }, [])

    const listitems = [
        {
            name: 'basdsadas',
            code: 'asdsdasdasdsad3213sa',
        },
        {
            name: 'casdsadasd',
            code: 'asdsda32434234sdsa',
        },
        {
            name: 'dasdsadsad',
            code: 'asds32453243242dasdsa',
        },
        {
            name: 'edgfdsdafsd',
            code: 'asdsdas324324234dsa',
        },
        {
            name: 'asdsahdsajkds',
            code: 'asdsdaasdsadsasdsa',
        },
        {
            name: 'basdsadas',
            code: 'asdsdasdasdsad3213sa',
        },
        {
            name: 'casdsadasd',
            code: 'asdsda32434234sdsa',
        },
        {
            name: 'dasdsadsad',
            code: 'asds32453243242dasdsa',
        },
        {
            name: 'edgfdsdafsd',
            code: 'asdsdas324324234dsa',
        },
        {
            name: 'asdsahdsajkds',
            code: 'asdsdaasdsadsasdsa',
        },
        {
            name: 'basdsadas',
            code: 'asdsdasdasdsad3213sa',
        },

    ]

    const columns: IColumn[] = [
        {
            key: 'name',
            name: 'Name',
            minWidth: 210,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onRender: (item) => {
                return <span>{item.name}</span>;
            },
        },
        {
            key: 'code',
            name: 'Code',
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,
            onRender: (item) => {
                return <span>{item.code}</span>;
            },
        },
    ];


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