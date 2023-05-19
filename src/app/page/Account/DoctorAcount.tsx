import { ICommandBarItemProps } from "@fluentui/react"
import { UniformTable } from "src/app/common"
import { doctormanagementColumns } from "../table/doctormanagercolumn"
import { useDispatch, useSelector } from "react-redux";
import { openPanel } from "src/redux/reducers";
import { panelTypeConstant } from "src/model/contant";
import Api from "src/api";
import { AppDispatch, RootState } from "src/redux/store";

function DoctorAcount() {
    const dispatch = useDispatch<AppDispatch>();
    const {tableSelectedCount} = useSelector((state: RootState) => state.currentSelected);

    const getDoctorManagmentCommandBar = () => {
        const command: ICommandBarItemProps[] = [];
        command.push({
            key: 'newItem',
            text: 'Thêm',
            iconProps: { iconName: 'Add' },
            onClick: () => { dispatch(openPanel(panelTypeConstant.PANEL_CREATE_DOCTOR)) },
        },);

        if(tableSelectedCount === 1){
            command.push({
                key: 'edit',
                text: 'Sửa',
                iconProps: { iconName: 'Edit' },
                onClick: () => { alert('edit') },
            })
        };

        return command;
    }

    return(
        <div className='wrapper-table-content speciality-wrapper'>
            <UniformTable
                integrateItems={Api.accountApi.getAllDoctor}
                searchByKeyWord='fullname'
                columns={doctormanagementColumns}
                commandBarItems={getDoctorManagmentCommandBar()}         
            />
        </div>
    )
}

export default DoctorAcount;