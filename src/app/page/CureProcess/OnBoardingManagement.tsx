import * as React from 'react'
import { useSelector } from 'react-redux';
import Tabs, { ITabProps } from 'src/app/common/Tab';
import { DepartmentType } from 'src/model/enum';
import { RootState } from 'src/redux/store';
import NonBoardingTab from './NonBoardingTab';
import TestingTab from './TestingTab';
import OnBoardingTab from './OnBoardingTab';

const OnBoardingManagement = () => {
    const { info } = useSelector((state: RootState) => state.user)
    const [selectedTab, setSelectedTab] = React.useState<number>(0);

    const getTab = () => {
      const tabs:ITabProps[] = [];
      if(info?.departmentCode !== DepartmentType.canLamSang)
        tabs.push(
            {
                label: "Nội trú",
                index: 1,
                Component: <OnBoardingTab/>
              },
              {
                label: "Ngoại trú",
                index: 2,
                Component: <>Ngoại trú</>
            },
        );      

        tabs.push(
            
            {
                label: "Thăm khám",
                index: 3,
                Component: <>Thăm khám</>
            },

        )
      return tabs;
    }


    return (
        <div className='wrapper-content'>
            <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={getTab()} />
        </div>
    )
}

export default OnBoardingManagement;

