import Api from "api";
import { UniformTable } from "src/app/common";
import { DepartmentType, TableType, toastType } from "src/model/enum";
import { nonBoardingPatientColumns } from "../../components/table/nonboardingcolumn";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import ConfirmDialog from "../dialog/Confirm";
import { TestingForm } from "../dialog/TestingForm";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading, showToastMessage } from "src/redux/reducers";

const TestingTab = () => {
  const { info } = useSelector((state: RootState) => state.user);
  const {tableSelectedCount, tableSelectedItem} = useSelector((state: RootState) => state.currentSelected);

  const [isConfirmClosed, setConfirmClosed] = React.useState<boolean>(true);
  const [isStartProgress, setIsStartProgress] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const confirmStartTesting = () => {
    dispatch(openLoading());
    Api.scheduleApi.startTesting({id: tableSelectedItem[0]?._id}).then(data => {
      if(!data.status) {
        dispatch(showToastMessage({message: 'Bắt đầu khám bệnh cho bệnh nhân', type: toastType.info}));
        setConfirmClosed(true);
        setIsStartProgress(true);
      } else {
        dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error}));
        setConfirmClosed(true);
      }
    }).catch(() => {
        dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error}));
        setConfirmClosed(true);
      }).finally(() => dispatch(closeLoading()))
  }
  
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
          confirm={confirmStartTesting}
        />
        <TestingForm
          isOpen={isStartProgress}
          onDismiss={() => setIsStartProgress(false)}
          scheduleId={tableSelectedItem[0]?._id}
        />
      </div>
    )
}

export default TestingTab;