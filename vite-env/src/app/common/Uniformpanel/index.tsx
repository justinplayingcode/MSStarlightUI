import {Panel, Stack } from '@fluentui/react'
import './index.scss';
import { useSelector } from 'react-redux';
import LoadingPanel from './loadingPanel';
import { RootState } from '../../../redux/store';
import { panelTypeConstant } from '../../../model/contant';
import CreatDoctorPanel from '../../page/Account/panel/CreateDoctorPanel';
import { PanelType } from '../../../model/enum';
import CreatePatientPanel from '../../page/Account/panel/CreatePatientPanel';
import CreateDiseasesPanel from '../../page/Diseases/panels/CreateDiseasesPanel';
import CreateMedicationPanel from '../../page/Medication/panels/CreateMedicationPanel';

export const MainPanel = () => {

    const { isOpen, panelType, isLoading } = useSelector((state: RootState) => state.panel)

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
            style={{ zIndex: '998'}}
        >
                <Stack className='panel-content'>
                    {renderPanelContent()}
                    {isLoading && <LoadingPanel/>}
                </Stack>
            {/* } */}
        </Panel>
    )
}