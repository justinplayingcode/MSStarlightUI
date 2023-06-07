import { IPersonaProps, Stack } from '@fluentui/react';
import { useState } from 'react';
import Picker from 'src/app/common/picker';

const News = () => {


  

    return(
        <div className='wrapper-table-content speciality-wrapper'>

            <>Thông tin, tư vấn
                <Stack>Render theo template tạo khi thêm bài viết</Stack>
                <Picker />
            </>
        </div>
    )
}
export default News;