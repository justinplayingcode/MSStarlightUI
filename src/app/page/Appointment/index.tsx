import { useEffect, useState } from "react";
import Tabs, { ITabProps } from "src/app/common/Tab";
import AppointmentStep from "./AppointmentStep";
import AppointmentReportStatic from "./AppointmentReportStatic";

function Appointment() {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const getTab = () => {
    const tabs:ITabProps[] = [];
      tabs.push(
        {
          label: "Danh sách lịch hẹn",
          index: 0,
          Component: <AppointmentReportStatic/>
        },
        {
          label: "Đặt lịch khám bệnh",
          index: 1,
          Component: <AppointmentStep/>
        }
      );      
    return tabs;
  }


  useEffect(() => {
    setSelectedTab(getTab()[0].index);
  },[])

  return ( 
    <div className='wrapper-table-content speciality-wrapper'>
      <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={getTab()} />
    </div>
  );
}

export default Appointment;