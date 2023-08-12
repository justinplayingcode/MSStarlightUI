import { useEffect, useState } from "react";
import RequestAppoinments from "./RequestAppointments";
import ScheduleApproved from "./ScheduleAppointments";
import { ITabProps, Tabs } from "../../common/Tab";

function DoctorAppointment() {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const getTab = () => {
    const tabs: ITabProps[] = [];
      tabs.push(
        {
          label: "Lịch khám bệnh hôm nay",
          index: 0,
          Component: <ScheduleApproved/>
        },
        {
          label: "Yêu cầu hẹn lịch khám",
          index: 1,
          Component: <RequestAppoinments/>
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

export default DoctorAppointment;