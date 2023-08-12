import * as React from 'react'
import PatientOutOnboarding from './components/PatientOutOnboarding';
import PatientInOnboarding from './components/PatientInOnboarding';
import { ITabProps, Tabs } from '../../common/Tab';

const PatientManagement = () => {
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

export default PatientManagement;

