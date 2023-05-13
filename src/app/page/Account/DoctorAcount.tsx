import { ICommandBarItemProps } from "@fluentui/react"
import { useEffect, useState } from "react"
import { UniformTable } from "src/app/common"
import { doctormanagementColumns } from "../table/doctormanagertable"
import { useDispatch, useSelector } from "react-redux";
import { openPanel, setDoctorList } from "src/redux/reducers";
import { panelTypeConstant } from "src/model/contant";
import Api from "src/api";
import { AppDispatch } from "src/redux/store";
import { ApiStatus } from "model";

function DoctorAcount() {
    const [isLoadings, setIsLoading] = useState<boolean>(false);
    const [items, setItems] = useState<any[]>([]);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        getAllDoctor();
    }, [])

    const getAllDoctor = async () => {
        setIsLoading(true);
        const res = await Api.accountApi.getAllDoctor();
        if(res.status === ApiStatus.succes) {
            setIsLoading(false);
            setItems(res.data);
            dispatch(setDoctorList(res.data))
        } else {
            setIsLoading(false);
        }
    }

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