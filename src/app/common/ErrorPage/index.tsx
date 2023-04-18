import { DefaultButton, Stack, Text } from '@fluentui/react'
import * as React from 'react'
import './index.scss'

export const ErrorPage = () => {
    return (
        <Stack className="error-page">
            <Stack className='content'>
                <Text className='content-error-code'>404</Text>
                <Text className='content-header-text'>Lỗi! Không tìm thấy trang</Text>
                <Stack className='buttons' horizontal>
                    <DefaultButton text="Trở lại trang chủ" href='#' />
                </Stack>
            </Stack>
        </Stack>
    )
}