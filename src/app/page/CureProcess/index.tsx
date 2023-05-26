import { Stack } from '@fluentui/react';
import * as React from 'react'
import { useState } from 'react';
import Tabs, { ITabProps, TabsProps } from 'src/app/common/Tab';
import NonBoardingTab from './NonBoardingTab';
import OnBoardingTab from './OnBoardingTab';
import TestingTab from './TestingTab';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

const CureProcess = () => {
    const { info } = useSelector((state: RootState) => state.user)
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const getTab = () => {
      const tabs:ITabProps[] = [];
      tabs.push(
        {
          label: "Khám bệnh",
          index: 0,
          Component: <NonBoardingTab/>
        },
      )

      if(info?.department !== 'Khoa Tiếp Đón' && info?.department !== 'Khoa Cận Lâm Sàng'){
        tabs.push(
          {
            label: "Chờ xét nghiệm",
            index: 1,
            Component: <TestingTab/>
          },
          {
            label: "Đang điều trị tại viện",
            index: 2,
            Component: <OnBoardingTab/>
          },
        )
      }
      return tabs;
    }

    return (
        <div className='wrapper-content'>
            {/* <>Khám chữa bệnh
                <Stack>Danh sách bệnh nhân chờ khám</Stack>
                <Stack>Danh sách bệnh nhân đang điều trị</Stack>
            </>
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            <br /> */}
            <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={getTab()} />
        </div>
    )
}

export default CureProcess;
