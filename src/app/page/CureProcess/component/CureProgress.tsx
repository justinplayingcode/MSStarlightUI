import { DefaultButton, FontWeights, IButtonStyles, IIconProps, IconButton, Modal, PrimaryButton, Stack, TextField, getTheme, mergeStyleSets } from "@fluentui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.scss'
import { InfomationGridComponent } from "src/app/common";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

interface IProgressProps{
    isOpen: boolean,
    onDismiss: () => void,
}

const CureProgress = (props: IProgressProps) => {
    const [step, setStep] = useState<number>(0);

    const dispatch = useDispatch();
    const {tableSelectedItem } = useSelector((state: RootState) => state.currentSelected)

    const navigate = useNavigate();


    const cancelIcon: IIconProps = { iconName: 'Cancel' };
    const theme = getTheme();

    const iconButtonStyles: Partial<IButtonStyles> = {
        root: {
            color: theme.palette.neutralPrimary,
            marginLeft: 'auto',
            marginTop: '4px',
            marginRight: '2px',
        },
        rootHovered: {
            color: theme.palette.neutralDark,
        },
    };

    const renderHeader = () => {
        return (
            <div className="modal-header">
                <h2 className='header-text'>
                    Khám bệnh
                </h2>
                <IconButton
                    styles={iconButtonStyles}
                    iconProps={cancelIcon}
                    onClick={props.onDismiss}
                />
            </div>
        )
    }

    const renderPatientInfo = () => {
        const patientInfo = [
            {
                label: 'Họ và tên',
                value: tableSelectedItem[0]?.fullname,
            },
            {
                label: 'Giới tính',
                value: 'Nam',
            },
            {
                label: 'Ngày sinh',
                value: tableSelectedItem[0]?.dateOfBirth,
            },
            {
                label: 'Địa chỉ',
                value: tableSelectedItem[0]?.address
            }
        ]
        return(
            <>
                <Stack style={{fontWeight: 600}}> Thông tin bệnh nhân</Stack>
                <Stack horizontal>
                    <InfomationGridComponent
                            isEdit={false}
                            isDataLoaded={true}
                            items={patientInfo}
                        />
                </Stack>
            </>
        )
    }

    const renderInputInfo = () => {
        return(
            <Stack>
                <TextField 
                    label="Triệu chứng" 
                    multiline 
                    resizable={false} 
                    rows={8}
                />
                <TextField 
                    label="Chẩn đoán" 
                    multiline 
                    resizable={false} 
                    rows={8}
                />
                <TextField 
                    label="Đơn thuốc" 
                    multiline 
                    resizable={false} 
                    rows={8}
                />
            </Stack>
        )
    }

    const renderFooter = () => {
        return(
            <Stack className="modal-footer">
                <DefaultButton text="Xét nghiệm"/>
                <PrimaryButton text="Hoàn thành"/>
            </Stack>
        )
    }

    return (
        <Modal
            className="modal-container"
            isOpen={props.isOpen}
            onDismiss={props.onDismiss}
            isBlocking={true}
            // containerClassName={contentStyles.container}
        >
            <Stack className="modal-content">
                {renderHeader()}
                <Stack className="modal-main-content">
                    {renderPatientInfo()}
                    {renderInputInfo()}
                </Stack>
                {renderFooter()}
            </Stack>
        </Modal>
    )
}

export default CureProgress;