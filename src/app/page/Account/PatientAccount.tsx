import { ICommandBarItemProps } from "@fluentui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UniformTable } from "src/app/common";
import { panelTypeConstant } from "src/model/contant";
import { openPanel } from "src/redux/reducers";
import { patientmanagementColumns } from "../table/patientmanagementtable";
import Api from 'src/api'
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { accountRole } from "model";

function PatientAccount() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>([]);

  const dispatch = useDispatch();
  const {role, info} = useSelector((state: RootState) => state.user);

  const getAllPatient = () => {
    setIsLoading(true);
    Api.accountApi.getAllPatient().then((data) => {
      setItems(data.data);
    }).catch(err => {
      const { message } = err.response.data;
      // setErrorMessage(message)
  }).finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getAllPatient();
  }, [])

  const getPatientmanagementCommandBar = () => {

    //remove add button
    const commadBar = [];
    if(role === accountRole.Doctor && info?.department === 'Khoa Tiếp Đón'){
      commadBar.push(
        {
          key: 'newItem',
          text: 'Thêm',
          iconProps: { iconName: 'Add' },
          onClick: () => { dispatch(openPanel(panelTypeConstant.PANEL_CREATE_PATIENT)) },
        },
      )
    }
    return commadBar;
  
  } 

  return (
    <div className='wrapper-table-content speciality-wrapper'>
      {/* <UniformTable
        searchByKeyWord='name'
        items={items}
        isLoading={isLoading}
        columns={patientmanagementColumns}
        commandBarItems={patientmanagementCommandBar}
      /> */}
    </div>
  );
}

export default PatientAccount;