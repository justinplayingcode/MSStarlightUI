import { Stack } from '@fluentui/react';
import * as React from 'react'
import { useState } from 'react';
import Tabs, { ITabProps, TabsProps } from 'src/app/common/Tab';
import NonBoardingTab from './NonBoardingTab';
import OnBoardingTab from './OnBoardingTab';

const CureProcess = () => {
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const tabs: ITabProps[] = [
        {
          label: "Khám bệnh",
          index: 0,
          Component: <NonBoardingTab/>
        },
        {
          label: "Nằm viện",
          index: 1,
          Component: <OnBoardingTab/>
        }
      ];


    return (
        <div className='wrapper-content'>
            {/* <>Khám chữa bệnh
                <Stack>Danh sách bệnh nhân chờ khám</Stack>
                <Stack>Danh sách bệnh nhân đang điều trị</Stack>
            </>
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            <br /> */}
            <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
        </div>
    )
}

export default CureProcess;
