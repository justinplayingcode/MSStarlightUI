import * as React from 'react'
import { UniformTable } from 'src/app/common';
import { StartProcessDialog } from './dialog';

const NonBoardingTab = () => {
    const [items, setItems] = React.useState<any[]>([]);
    const [isDialogClosed, setDialogClosed] = React.useState<boolean>(true)
    const [isLoading, setIsLoading] =React.useState<boolean>(false);


    const nonBoardingPatientColumns =[];

    const nonBoardingPatientCommanBar = [
        {
            key: 'newItem',
            text: 'Thêm',
            iconProps: { iconName: 'Add' },
            onClick: () => { setDialogClosed(false) },
        },
    ]

    return(
         <div className='wrapper-table-content speciality-wrapper'>
            <UniformTable
                searchByKeyWord='name'
                items={items}
                isLoading={isLoading} 
                columns={nonBoardingPatientColumns}  
                commandBarItems={nonBoardingPatientCommanBar}          
            />
            <StartProcessDialog 
                isDialogClosed={isDialogClosed} 
                closeDialog={() => {
                    setDialogClosed(true);
                }}             
            />
        </div>
    )
}

export default NonBoardingTab;