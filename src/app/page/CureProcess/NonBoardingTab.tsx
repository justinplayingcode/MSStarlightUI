import * as React from 'react'
import { UniformTable } from 'src/app/common';
import { StartProcessDialog } from './dialog';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { accountRole } from 'model';

import Api from 'src/api'
import { useEffect } from 'react';
import { nonBoardingPatientColumns } from '../table/nonboardingtabletab';
import { useNavigate } from 'react-router-dom';

const NonBoardingTab = () => {
    const [isDialogClosed, setDialogClosed] = React.useState<boolean>(true);

    const navigate = useNavigate();
    const { info, role } = useSelector((state: RootState) => state.user);
    const {tableSelectedCount} = useSelector((state: RootState) => state.currentSelected);
    
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
        if(tableSelectedCount === 1){
            commandBar.push({
                key: 'edit',
                text: 'Sửa',
                iconProps: { iconName: 'PageHeaderEdit' },
                onClick: () => { navigate('/curing-proces/cure-progress') },
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