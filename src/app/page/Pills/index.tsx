import { Stack } from '@fluentui/react';
import * as React from 'react'

const Pills = () => {
    return(
        <div className='wrapper-content'>
            <>Quản lí Thuốc (show luôn table)
                <Stack>Xem danh sách</Stack>
                <Stack> thêm sửa xóa thuốc - admin</Stack>
            </>

        </div>
    )
}
export default Pills;