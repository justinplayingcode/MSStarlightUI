import { ICommandBarItemProps } from "@fluentui/react"
import { useEffect, useState } from "react"
import { UniformTable } from "src/app/common"
import { doctormanagementColumns } from "../table/doctormanagertable"
import { useDispatch, useSelector } from "react-redux";
import { openPanel, setDoctorList } from "src/redux/reducers";
import { panelTypeConstant } from "src/model/contant";
import Api from "src/api";
import { AppDispatch, RootState } from "src/redux/store";
import { ApiStatus } from "model";

function DoctorAcount() {
    const [isLoadings, setIsLoading] = useState<boolean>(false);
    const [items, setItems] = useState<any[]>([]);

    const dispatch = useDispatch<AppDispatch>();
    const { isOpen } = useSelector((state: RootState) => state.panel)

    useEffect(() => {
        getAllDoctor();
    }, [])   

    const getAllDoctor = () => {
        setIsLoading(true);
        setItems([]);
        Api.accountApi.getAllDoctor().then((data) => {
            if (data.status === ApiStatus.succes) {
                setItems(data.data);
            } else {
                setIsLoading(false);
            }
        }).catch().finally(() => setIsLoading(false))
    }

    const refreshData = () => {
      getAllDoctor()
    }

    const doctormanagementCommandBar: ICommandBarItemProps[] = [
        {
            key: 'newItem',
            text: 'Thêm',
            iconProps: { iconName: 'Add' },
            onClick: () => { dispatch(openPanel(panelTypeConstant.PANEL_CREATE_DOCTOR)) },
        },
        {
          key: 'refresh',
          text: 'Refresh',
          iconProps: { iconName: 'Refresh' },
          onClick: refreshData,
      },
    ]

    return(
        <div className='wrapper-table-content speciality-wrapper'>
            <UniformTable
                searchByKeyWord='fullname'
                items={items}
                isLoading={isLoadings}
                columns={doctormanagementColumns}
                commandBarItems={doctormanagementCommandBar}         
            />
        </div>
    )
}

export default DoctorAcount;