import { IColumn, Stack } from '@fluentui/react';
import './index.scss';
import { useState, useEffect } from 'react';
import { UniformTable } from 'src/app/common';

interface ISpecialityItem {
    
}

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
        <div className='wrapper-content speciality-wrapper'>
            <UniformTable
                searchByKeyWord='name'
                items={listitems}
                isLoading={isLoading} 
                columns={columns}            
            />
        </div>
    )
}
export default Speciality;