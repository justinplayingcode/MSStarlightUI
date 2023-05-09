import { DefaultButton, IPanelProps, Panel, PrimaryButton, Stack } from '@fluentui/react'
import * as React from 'react'
import { useDispatch } from 'react-redux';
import './index.scss'
import { useSelector } from 'react-redux';
import { PanelContentKey } from 'src/model/contant';
import { CreateAccount, CreateAccountKey } from 'src/app/page/Account/components/CreateAccount';

export interface IUniformPanelProps{
    isOpen?: boolean;
    content?: JSX.Element;
    contentKey?: string;
    headerText?: string;
    saveText?: string;
    onClickSave?: () => void;
    cancelText?: string;
}


export const UniformPanel = (props: IUniformPanelProps) => {
    const dispatch = useDispatch();
    // const [isOpen, setIsOpen] = React.useState<boolean>(false);
    // const {keyPanel} = useSelector()
    const keyPanel = PanelContentKey.PANEL_CREATE_DOCTOR;

    const renderPanelContent = () => {
        switch(keyPanel){
            case PanelContentKey.PANEL_CREATE_DOCTOR:
                return <CreateAccount keyType={CreateAccountKey.Doctor}/>;
            default:
                return <></>
        }
    }

    const onRenderFooter = () => {
        return(
            <Stack className='footer-content'>
                <DefaultButton text={props?.cancelText || 'Hủy'}
                    onClick={() => {
                        //dispatch close and reset
                    }}
                />
                <PrimaryButton text={props?.saveText ||'Lưu'}
                    onClick={() => {
                        //dispatch close
                        props?.onClickSave();
                    }}    
                />
            </Stack>
        )
    }

    return(
        <Panel
            isOpen={props.isOpen || true}
            headerText={props.headerText}
            isFooterAtBottom={true}
            onRenderFooterContent={onRenderFooter}
        >
            <Stack className='panel-content'>
                {renderPanelContent()}
            </Stack>
        </Panel>
    )
}