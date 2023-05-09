import { IColumn, ICommandBarItemProps } from "@fluentui/react"
import { useEffect, useState } from "react"
import { UniformTable } from "src/app/common"
import { doctormanagementColumns } from "../table/doctormanagertable"
import { useDispatch } from "react-redux";
import { openPanel } from "src/redux/reducers";
import { panelTypeConstant } from "src/model/contant";

function DoctorAcount() {
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
        {
            name: 'basdsadas',
            code: 'asdsdasdasdsad3213sa',
        },

    ]

    const doctormanagementCommandBar: ICommandBarItemProps[] = [
      {
          key: 'newItem',
          text: 'Thêm',
          iconProps: { iconName: 'Add' },
          onClick: () => { dispatch(openPanel(panelTypeConstant.PANEL_CREATE_DOCTOR)) },
      },
    ]

    return(
        <div className='wrapper-content speciality-wrapper'>
            <UniformTable
                searchByKeyWord='name'
                items={listitems}
                isLoading={isLoading} 
                columns={doctormanagementColumns}  
                commandBarItems={doctormanagementCommandBar}          
            />
        </div>
    )
}

export default DoctorAcount;