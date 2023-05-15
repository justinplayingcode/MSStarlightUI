import * as React from 'react'
import { UniformTable } from 'src/app/common';
import { StartProcessDialog } from './dialog';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { accountRole } from 'model';

import Api from 'src/api'
import { useEffect } from 'react';
import { nonBoardingPatientColumns } from '../table/nonboardingtabletab';

const NonBoardingTab = () => {
    const [isDialogClosed, setDialogClosed] = React.useState<boolean>(true)    
    const { info, role } = useSelector((state: RootState) => state.user);
    
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
            <UniformTable
                searchByKeyWord='name'
                integrateItems={() =>Api.cureProcessApi.getWaitPatient({
                    boarding: false,
                    department: info?.departmentId
                })}
                columns={nonBoardingPatientColumns}
                commandBarItems={getNonBoardingPatientCommandBar()} 
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