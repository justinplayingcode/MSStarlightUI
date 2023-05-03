import * as React from 'react'
import './tablewrapper.scss'
import { Stack } from '@fluentui/react'

interface ITableWrapperProps{
    table?: JSX.Element;
}

export const Tablewrapper = (props: ITableWrapperProps) => {
    return(
        <Stack className='table-container'>
            {props?.table}
        </Stack>
    )
}