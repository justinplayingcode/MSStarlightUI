import * as React from 'react'
import { UniformTable } from 'src/app/common';
import { StartProcessDialog } from './dialog';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { accountRole } from 'model';

const NonBoardingTab = () => {
    const [items, setItems] = React.useState<any[]>([]);
    const [isDialogClosed, setDialogClosed] = React.useState<boolean>(true)
    const [isLoading, setIsLoading] =React.useState<boolean>(false);
    
    const { info, role } = useSelector((state: RootState) => state.user)


    const nonBoardingPatientColumns =[];

    const getNonBoardingPatientCommandBar = () => {
        const commandBar = [];
        if (info?.department === 'Khoa Tiếp Đón' && role === accountRole.Doctor) {
            commandBar.push({
                key: 'newItem',
                text: 'Thêm',
                iconProps: { iconName: 'Add' },
                onClick: () => { setDialogClosed(false) },
            })
        };
        return commandBar;
    }

    return(
         <div className='wrapper-table-content speciality-wrapper'>
            {/* <UniformTable
                searchByKeyWord='name'
                items={items}
                isLoading={isLoading} 
                columns={nonBoardingPatientColumns}  
                commandBarItems={getNonBoardingPatientCommandBar()}          
            /> */}
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