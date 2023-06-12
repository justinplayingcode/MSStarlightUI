import * as React from 'react'
import Tabs, { ITabProps } from 'src/app/common/Tab';
import OnBoardingTab from './OnBoardingTab';

const TreatmentManagement = () => {
    const [selectedTab, setSelectedTab] = React.useState<number>(0);

    const getTab = () => {
      const tabs:ITabProps[] = [];
      tabs.push(
        {
          label: "Nội trú",
          index: 0,
          Component: <OnBoardingTab/>
        },
        {
          label: "Ngoại trú",
          index: 1,
          Component: <>Ngoại trú</>
        },
      );      
      return tabs;
    }


    return (
        <div className='wrapper-content'>
            <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={getTab()} />
        </div>
    )
}

export default TreatmentManagement;

