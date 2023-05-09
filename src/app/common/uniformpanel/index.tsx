import {Panel, Stack } from '@fluentui/react'
import './index.scss'
import { useSelector } from 'react-redux';
import { panelTypeConstant } from 'src/model/contant';
import { RootState } from 'src/redux/store';
import CreatDoctorPanel from 'src/app/page/Account/panel/CreateDoctorPanel';

export const MainPanel = () => {

    const { isOpen, panelType, isLoading } = useSelector((state:RootState) => state.panel)

    const renderPanelContent = () => {
        switch(panelType){
            case panelTypeConstant.PANEL_CREATE_DOCTOR:
                return <CreatDoctorPanel/>;
            default:
                return <></>
        }
    }

    return(
        <Panel
            className='main-panel'
            isOpen={isOpen}
            hasCloseButton={false}
        >
            {isLoading ? 'loading' : 
                <Stack className='panel-content'>
                    {renderPanelContent()}
                </Stack>
            }
        </Panel>
    )
}