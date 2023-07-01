import { ICommandBarItemProps } from "@fluentui/react"
import { UniformTable } from "src/app/common"
import { useDispatch, useSelector } from "react-redux";
import { openPanel, showToastMessage } from "src/redux/reducers";
import { panelTypeConstant } from "src/model/contant";
import Api from "src/api";
import { AppDispatch, RootState } from "src/redux/store";
import { TableType, toastType } from "src/model/enum";
import { doctormanagementColumns } from "../components/table/doctormanagercolumn";
import { useState } from "react";
import ResetPassword from "./dialog/resetPassword";
import { useNavigate } from "react-router-dom";

function DoctorAcount() {
    const [hiddenReset, setHiddenReset] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {tableSelectedCount, tableSelectedItem} = useSelector((state: RootState) => state.currentSelected);

    const getDoctorManagmentCommandBar = () => {
        const command: ICommandBarItemProps[] = [];
        command.push({
            key: 'newItem',
            text: 'Thêm',
            iconProps: { iconName: 'Add' },
            onClick: () => { dispatch(openPanel(panelTypeConstant.PANEL_CREATE_DOCTOR)) },
        });

        if(tableSelectedCount === 1){
            command.push({
                key: 'edit',
                text: 'Thông tin bác sĩ',
                iconProps: { iconName: 'ProfileSearch' },
                onClick: () => { navigate(`/doctor-management/doctor-details/${tableSelectedItem[0]?.userId}`) },
            });
            command.push({
                key: "resetPassword",
                text: "Đặt lại mật khẩu",
                iconProps: { iconName: 'Rename'},
                onClick: () => setHiddenReset(false)
            })
        };

        return command;
    }

    return(
        <div className='wrapper-table-content speciality-wrapper'>
            <UniformTable
                integrateItems={Api.accountApi.getAll}
                columns={doctormanagementColumns}
                commandBarItems={getDoctorManagmentCommandBar()}  
                tableType={TableType.doctorAccount}       
            />
            <ResetPassword
                isHidden={hiddenReset}
                onDismiss={() => {
                    setHiddenReset(true);
                }}
            />
        </div>
    )
}

export default DoctorAcount;