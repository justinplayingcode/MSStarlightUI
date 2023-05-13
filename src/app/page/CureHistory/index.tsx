import { Stack } from '@fluentui/react';
import * as React from 'react'
import { UniformTable } from 'src/app/common';

const CureHistory = () => {
    const [items, setItems] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] =React.useState<boolean>(false);

    const cureHistoryColumns =[
        
    ];

    const cureHistoryCommanBar = [
        {
            key: 'newItem',
            text: 'Thêm',
            iconProps: { iconName: 'Add' },
            onClick: () => { alert('Lịch sử khám bệnh') },
        },
    ]

    return(
        <div className='wrapper-table-content'>
            {/* <>Lịch sử khám chữa bệnh
                <Stack>Working after</Stack>
            </> */}
            <UniformTable
                searchByKeyWord='name'
                items={items}
                isLoading={isLoading} 
                columns={cureHistoryColumns}  
                commandBarItems={cureHistoryCommanBar}          
            />
        </div>
    )
}
export default CureHistory;




    

   