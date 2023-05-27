import * as React from 'react'
import { UniformTable } from 'src/app/common';
import { StartProcessDialog } from './dialog/dialog';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { accountRole } from 'model';

import Api from 'src/api'
import { useEffect } from 'react';
import { nonBoardingPatientColumns } from '../table/nonboardingcolumn';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from './dialog/confirmDialog';

const NonBoardingTab = () => {
    const navigate = useNavigate();
    const { info, role } = useSelector((state: RootState) => state.user);
    const {tableSelectedCount} = useSelector((state: RootState) => state.currentSelected);

    const [isDialogClosed, setDialogClosed] = React.useState<boolean>(true);
    const [isConfirmClosed, setConfirmClosed] = React.useState<boolean>(true)
    
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
        if(tableSelectedCount === 1 && info?.department !== 'Khoa Tiếp Đón'){
            commandBar.push({
                key: 'edit',
                text: 'Bắt đầu',
                iconProps: { iconName: 'PageHeaderEdit' },
                onClick: () => { 
                    setConfirmClosed(false);
                    // navigate('/curing-proces/cure-progress') 
                },
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
            
            {/* dialog when add patient to wait queue */}
            <StartProcessDialog 
                isDialogClosed={isDialogClosed} 
                closeDialog={() => {
                    setDialogClosed(true);
                }}             
            />

            {/* dialog confirm start the cure process */}
            <ConfirmDialog
                isDialogClosed={isConfirmClosed}
                closeDialog={() => {
                    setConfirmClosed(true)
                }}
                confirm={() => {

                }}
            />
        </div>
    )
}

export default NonBoardingTab;