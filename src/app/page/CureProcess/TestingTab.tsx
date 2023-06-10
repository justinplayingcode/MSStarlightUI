import Api from "api";
import { UniformTable } from "src/app/common";
import { DepartmentType, TableType, accountRole } from "src/model/enum";
import { nonBoardingPatientColumns } from "../components/table/nonboardingcolumn";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { StartProcessDialog } from "./dialog/dialog";
import ConfirmDialog from "./dialog/confirmDialog";
import CureProgress from "./component/CureProgress";

const TestingTab = () => {
  const { info, role } = useSelector((state: RootState) => state.user);
  const {tableSelectedCount} = useSelector((state: RootState) => state.currentSelected);

  const [isDialogClosed, setDialogClosed] = React.useState<boolean>(true);
  const [isConfirmClosed, setConfirmClosed] = React.useState<boolean>(true);
  const [isModalClosed, setModalClosed] = React.useState<boolean>(true);
  
  const getTestingTabCommandBar = () => {
      const commandBar = [];
      // if (info?.departmentCode !== DepartmentType.tiepDon && role === accountRole.Doctor) {
      //     commandBar.push({
      //         key: 'newItem',
      //         text: 'Thêm',
      //         iconProps: { iconName: 'Add' },
      //         onClick: () => { setDialogClosed(false) },
      //     })
      // };
      if(tableSelectedCount === 1 
          // && info?.department !== 'Khoa Tiếp Đón'
          ){
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
    return (
      <div className='wrapper-table-content speciality-wrapper'>
        <UniformTable
                integrateItems={Api.cureProcessApi.getWaitedPatient}
                columns={nonBoardingPatientColumns}
                commandBarItems={getTestingTabCommandBar()} 
                tableType={TableType.scheduleParaclinical}
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
                    setConfirmClosed(true)
                    setModalClosed(false)
                }}
            />

            {/* Progress cure modal */}
            <CureProgress 
                isOpen={!isModalClosed} 
                onDismiss={() => {
                    setModalClosed(true)
                }}
                isNormalProgress={info?.departmentCode !== DepartmentType.canLamSang}
            />
      </div>
    )
}

export default TestingTab;