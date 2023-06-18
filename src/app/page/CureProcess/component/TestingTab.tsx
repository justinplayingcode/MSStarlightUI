import Api from "api";
import { UniformTable } from "src/app/common";
import { DepartmentType, TableType } from "src/model/enum";
import { nonBoardingPatientColumns } from "../../components/table/nonboardingcolumn";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import ConfirmDialog from "../dialog/Confirm";
import { TestingForm } from "../dialog/TestingForm";

const TestingTab = () => {
  const { info, role } = useSelector((state: RootState) => state.user);
  const {tableSelectedCount} = useSelector((state: RootState) => state.currentSelected);

  const [isConfirmClosed, setConfirmClosed] = React.useState<boolean>(true);
  const [isStartProgress, setIsStartProgress] = React.useState<boolean>(false);
  
  const getTestingTabCommandBar = () => {
      const commandBar = [];
      if(tableSelectedCount === 1 && info?.departmentCode === DepartmentType.canLamSang) {
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
    return (
      <div className='wrapper-table-content speciality-wrapper'>
        <UniformTable
          integrateItems={Api.cureProcessApi.getWaitedPatient}
          columns={nonBoardingPatientColumns}
          commandBarItems={getTestingTabCommandBar()} 
          tableType={TableType.scheduleParaclinical}
        />
        <ConfirmDialog
          title="Xác nhận xét nghiệm cho bệnh nhân"
          isDialogClosed={isConfirmClosed}
          closeDialog={() => {
              setConfirmClosed(true)
          }}
          confirm={() => {
              setConfirmClosed(true)
              setIsStartProgress(true)
          }}
        />
        <TestingForm
          // isOpen={isStartProgress}
          isOpen={true}
          onDismiss={() => setIsStartProgress(false)}
        />
      </div>
    )
}

export default TestingTab;