import { ICommandBarItemProps } from "@fluentui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UniformTable } from "src/app/common";
import { panelTypeConstant } from "src/model/contant";
import { openPanel } from "src/redux/reducers";
import { patientmanagementColumns } from "../table/patientmanagementtable";

function PatientAccount() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setItems(listitems)
  }, [])

  const listitems = [
    {
      name: 'basdsadas',
      code: 'asdsdasdasdsad3213sa',
    },
    {
      name: 'casdsadasd',
      code: 'asdsda32434234sdsa',
    },
    {
      name: 'dasdsadsad',
      code: 'asds32453243242dasdsa',
    },
    {
      name: 'edgfdsdafsd',
      code: 'asdsdas324324234dsa',
    },
    {
      name: 'asdsahdsajkds',
      code: 'asdsdaasdsadsasdsa',
    },
  ]

  const patientmanagementCommandBar: ICommandBarItemProps[] = [
    //remove add button
    
    {
      key: 'newItem',
      text: 'Thêm',
      iconProps: { iconName: 'Add' },
      onClick: () => { dispatch(openPanel(panelTypeConstant.PANEL_CREATE_PATIENT)) },
    },
  ]

  return (
    <div className='wrapper-table-content speciality-wrapper'>
      <UniformTable
        searchByKeyWord='name'
        items={listitems}
        isLoading={isLoading}
        columns={patientmanagementColumns}
        commandBarItems={patientmanagementCommandBar}
      />
    </div>
  );
}

export default PatientAccount;