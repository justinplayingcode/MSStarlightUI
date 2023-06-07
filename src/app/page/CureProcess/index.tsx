import { Stack } from '@fluentui/react';
import * as React from 'react'
import { useState } from 'react';
import Tabs, { ITabProps, TabsProps } from 'src/app/common/Tab';
import NonBoardingTab from './NonBoardingTab';
import OnBoardingTab from './OnBoardingTab';
import TestingTab from './TestingTab';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { DepartmentType } from 'src/model/enum';

const CureProcess = () => {
    const { info } = useSelector((state: RootState) => state.user)
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const getTab = () => {
      const tabs:ITabProps[] = [];
      if(info?.departmentCode !== DepartmentType.canLamSang)
        tabs.push(
          {
            label: "Chờ khám bệnh",
            index: 0,
            Component: <NonBoardingTab/>
          },
        );      

      if(info?.departmentCode !== DepartmentType.tiepDon){
        tabs.push(
          {
            label: "Chờ xét nghiệm",
            index: 1,
            Component: <TestingTab/>
          },
          // {
          //   label: "Đang điều trị tại viện",
          //   index: 2,
          //   Component: <OnBoardingTab/>
          // },
        )
      }
      return tabs;
    }

    return (
        <div className='wrapper-table-content speciality-wrapper'>
            <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={getTab()} />
        </div>
    )
}

export default CureProcess;
