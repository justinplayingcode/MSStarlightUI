import { ICommandBarItemProps } from "@fluentui/react"
import { useCallback, useEffect, useState } from "react"
import { UniformTable } from "src/app/common"
import { doctormanagementColumns } from "../table/doctormanagertable"
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors, openPanel } from "src/redux/reducers";
import { panelTypeConstant } from "src/model/contant";
import { AppDispatch, RootState } from "src/redux/store";

function DoctorAcount() {
    const { doctorList, isLoading, isDataLoaded } = useSelector((state: RootState) => state.doctorManagement);
    const dispatch = useDispatch<AppDispatch>();

    // const [items, setItems] = useState([])
    // const [shimmer, setShimmer] = useState(true)
    
    useEffect(() => {
        dispatch(getAllDoctors());
    }, [])

    // useEffect(() => {
    //     if (!isLoading) {
    //         setItems(doctorList)
    //         setShimmer(false)
    //     }
    // }, [isLoading])

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
            {/* {isLoading ? <>loading</> :              */}
                <UniformTable
                    searchByKeyWord='fullname'
                    items={doctorList}
                    isLoading={isLoading}
                    columns={doctormanagementColumns}  
                    commandBarItems={doctormanagementCommandBar}          
                />
            {/* } */}
        </div>
    )
}

export default DoctorAcount;