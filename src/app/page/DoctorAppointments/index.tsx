import { useEffect, useState } from "react";
import Tabs, { ITabProps } from "src/app/common/Tab";
import RequestAppoinments from "./RequestAppointments";

function DoctorAppointment() {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const getTab = () => {
    const tabs: ITabProps[] = [];
      tabs.push(
        {
          label: "Lịch hẹn hôm nay",
          index: 0,
          Component: <>danh sách lịch hẹn</>
        },
        {
          label: "Yêu cầu hẹn lịch",
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