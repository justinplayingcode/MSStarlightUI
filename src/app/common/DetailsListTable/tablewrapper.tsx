import './tablewrapper.scss'
import { Stack } from '@fluentui/react'
import { DetailsListTable } from '.';

interface ITableWrapperProps{
    tableType?: string;
}

export const Tablewrapper = (props: ITableWrapperProps) => {

    return(
        <Stack className='table-container'>
            <DetailsListTable {...props} />
        </Stack>
    )
}