import * as React from 'react'
import Tabs, { ITabProps } from 'src/app/common/Tab';
import PatientOutOnboarding from './component/PatientOutOnboarding';
import PatientInOnboarding from './component/PatientInOnboarding';

const TreatmentManagement = () => {
    const [selectedTab, setSelectedTab] = React.useState<number>(0);

    const getTab = () => {
      const tabs:ITabProps[] = [];
      tabs.push(
        {
          label: "Nội trú",
          index: 0,
          Component: <PatientInOnboarding/>
        },
        {
          label: "Ngoại trú",
          index: 1,
          Component: <PatientOutOnboarding/>
        },
      );      
      return tabs;
    }


    return (
        <div className='wrapper-table-content speciality-wrapper'>
            <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={getTab()} />
        </div>
    )
}

export default TreatmentManagement;

