import { ICommandBarItemProps } from "@fluentui/react"
import { useCallback, useEffect, useState } from "react"
import { UniformTable } from "src/app/common"
import { doctormanagementColumns } from "../table/doctormanagertable"
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors, openPanel } from "src/redux/reducers";
import { panelTypeConstant } from "src/model/contant";
import { AppDispatch, RootState } from "src/redux/store";
import { ApiLoadingStatus, resetLoadDoctorStatus } from "src/redux/reducers/doctorManagementReducer";

function DoctorAcount() {
  const [isLoadings, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const {doctorList, loadDoctorStatus} = useSelector((state: RootState) => state.doctorManagement)


  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllDoctors());   
  }, [])

  useEffect(() => {
      if(loadDoctorStatus === ApiLoadingStatus.Success){
        // console.log('status')
        dispatch(resetLoadDoctorStatus());
        setItems(doctorList);
        setIsLoading(false);
    }
  }, [loadDoctorStatus, doctorList])

  useEffect(() => {
    console.log(items)
  })
//   useEffect(() => {
//     setIsLoading(isLoading);
//     setItems(doctorList);
//     console.log(doctorList)
//   }, [doctorList, isLoading])


//   useEffect(()=> {
//     setItems(doctorList)
//   }, [doctorList])


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
        <div className='wrapper-table-content speciality-wrapper'>
            {/* {isLoading ? <>loading</> :              */}
                <UniformTable
                    searchByKeyWord='fullname'
                    items={doctorList}
                    isLoading={isLoadings}
                    columns={doctormanagementColumns}  
                    commandBarItems={doctormanagementCommandBar}          
                />
            {/* } */}
        </div>
    )
}

export default DoctorAcount;