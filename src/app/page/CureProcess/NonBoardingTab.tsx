import * as React from 'react'
import { UniformTable } from 'src/app/common';

const NonBoardingTab = () => {
    const [items, setItems] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] =React.useState<boolean>(false);


    const nonBoardingPatientColumns =[];

    const nonBoardingPatientCommanBar = [
        {
            key: 'newItem',
            text: 'Thêm',
            iconProps: { iconName: 'Add' },
            onClick: () => { alert('hehe') },
        },
    ]

    return(
         <div className='wrapper-content speciality-wrapper'>
            <UniformTable
                searchByKeyWord='name'
                items={items}
                isLoading={isLoading} 
                columns={nonBoardingPatientColumns}  
                commandBarItems={nonBoardingPatientCommanBar}          
            />
        </div>
    )
}

export default NonBoardingTab;