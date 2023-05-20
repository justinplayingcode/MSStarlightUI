import {Panel, Stack } from '@fluentui/react'
import './index.scss'
import { useSelector } from 'react-redux';
import { panelTypeConstant } from 'src/model/contant';
import { RootState } from 'src/redux/store';
import CreatDoctorPanel from 'src/app/page/Account/panel/CreateDoctorPanel';
import CreatePatientPanel from 'src/app/page/Account/panel/CreatePatientPanel';
import { PanelType } from 'src/model/enum';
import CreateDiseasesPanel from 'src/app/page/Diseases/panels/CreateDiseasesPanel';
import CreateMedicationPanel from 'src/app/page/Medication/panels/CreateMedicationPanel';

export const MainPanel = () => {

    const { isOpen, panelType, isLoading } = useSelector((state:RootState) => state.panel)

    const renderPanelContent = () => {
        switch(panelType){
            case panelTypeConstant.PANEL_CREATE_DOCTOR:
                return <CreatDoctorPanel/>;
            case panelTypeConstant.PANEL_CREATE_PATIENT:
                return <CreatePatientPanel panelType={PanelType.Create}/>;
            case panelTypeConstant.PANEL_EDIT_PATIENT:
                return <CreatePatientPanel panelType={PanelType.Edit}/>;

            case panelTypeConstant.PANEL_CREATE_DISEASES:
                return <CreateDiseasesPanel panelType={PanelType.Create}/>;
            case panelTypeConstant.PANEL_EDIT_DISEASES:
                return <CreateDiseasesPanel panelType={PanelType.Edit}/>;

            case panelTypeConstant.PANEL_CREATE_MEDICATION:
                return <CreateMedicationPanel panelType={PanelType.Create}/>;
            case panelTypeConstant.PANEL_EDIT_MEDICATION:
                return <CreateMedicationPanel panelType={PanelType.Edit}/>;

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