import { ICommandBarItemProps } from "@fluentui/react"
import { useDispatch, useSelector } from "react-redux";
import { doctormanagementColumns } from "../components/table/doctormanagercolumn";
import { useState } from "react";
import ResetPassword from "./dialog/resetPassword";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/store";
import { openPanel, showToastMessage } from "../../../redux/reducers";
import { panelTypeConstant } from "../../../model/contant";
import Api from "../../../api";
import { TableType, exportCsvType, toastType } from "../../../model/enum";
import { UniformTable } from "../../common";

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
                iconProps: { iconName: 'ContactInfo' },
                onClick: () => { navigate(`/doctor-management/doctor-details/${tableSelectedItem[0]?.userId}`) },
            });
            command.push({
                key: "resetPassword",
                text: "Đặt lại mật khẩu",
                iconProps: { iconName: 'Rename'},
                onClick: () => setHiddenReset(false)
            })
        }
        command.push({
          key: "export",
          text: "Xuất file excel",
          iconProps: { iconName: 'Installation' },
          onClick: handleExportCsv
        })
        return command;
    }

    const handleExportCsv = () => {
      dispatch(showToastMessage({message: 'Đang tiến hành tải file, vui lòng chờ trong ít phút', type: toastType.info}));
      Api.statisticApi.exportExcel(exportCsvType.doctorAccount).api.then(response  => {
        const blob = new Blob([(response as any).csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const filename: string = (response as any).fileName;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch(() => {
        dispatch(showToastMessage({message: 'Xảy ra lỗi khi tải xuống, vui lòng thử lại', type: toastType.error}));
      });
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