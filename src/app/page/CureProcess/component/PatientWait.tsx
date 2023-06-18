import * as React from 'react'
import { UniformTable } from 'src/app/common';
import { StartProcessDialog } from '../dialog/StartProcessDialog';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { accountRole } from 'model';

import Api from 'src/api'
import { DepartmentType, TableType } from 'src/model/enum';
import { nonBoardingPatientColumns } from '../../components/table/nonboardingcolumn';
import NormalProgress from '../dialog/NormalProgress';
import ConfirmDialog from '../dialog/Confirm';

const PatientWait = () => {
    const { info, role } = useSelector((state: RootState) => state.user);
    const {tableSelectedCount} = useSelector((state: RootState) => state.currentSelected);

    const [isDialogClosed, setDialogClosed] = React.useState<boolean>(true);
    const [isConfirmClosed, setConfirmClosed] = React.useState<boolean>(true);
    const [isStartProgress, setIsStartProgress] = React.useState<boolean>(false);
    
    const getNonBoardingPatientCommandBar = () => {
        const commandBar = [];
        if (info?.departmentCode === DepartmentType.tiepDon && role === accountRole.Doctor) {
            commandBar.push({
                key: 'add',
                text: 'Thêm',
                iconProps: { iconName: 'Add' },
                onClick: () => { setDialogClosed(false) },
            })
        };
        if(tableSelectedCount === 1 && info?.departmentCode !== DepartmentType.tiepDon && role === accountRole.Doctor){
            commandBar.push({
                key: 'start',
                text: 'Bắt đầu',
                iconProps: { iconName: 'PageHeaderEdit' },
                onClick: () => { 
                    setConfirmClosed(false);
                },
            })
        };
        return commandBar;
    }

    return(
          <div className='wrapper-table-content speciality-wrapper'>
            <UniformTable
                integrateItems={Api.cureProcessApi.getWaitedPatient}
                columns={nonBoardingPatientColumns}
                commandBarItems={getNonBoardingPatientCommandBar()} 
                tableType={TableType.scheduleNormal}
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
                title="Xác nhận khám cho bệnh nhân"
                isDialogClosed={isConfirmClosed}
                closeDialog={() => {
                    setConfirmClosed(true)
                }}
                confirm={() => {
                    setConfirmClosed(true)
                    setIsStartProgress(true)
                }}
            />
            <NormalProgress
              isOpen={isStartProgress} 
              onDismiss={() => setIsStartProgress(false)}
          />
        </div>
    )
}

export default PatientWait;