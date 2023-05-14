import { ICommandBarItemProps } from "@fluentui/react"
import { UniformTable } from "src/app/common"
import { doctormanagementColumns } from "../table/doctormanagertable"
import { useDispatch, useSelector } from "react-redux";
import { openPanel } from "src/redux/reducers";
import { panelTypeConstant } from "src/model/contant";
import Api from "src/api";
import { AppDispatch, RootState } from "src/redux/store";

function DoctorAcount() {
    const dispatch = useDispatch<AppDispatch>();
    const { isOpen } = useSelector((state: RootState) => state.panel) 

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
            <UniformTable
                integrateItems={Api.accountApi.getAllDoctor}
                searchByKeyWord='fullname'
                columns={doctormanagementColumns}
                commandBarItems={doctormanagementCommandBar}         
            />
        </div>
    )
}

export default DoctorAcount;