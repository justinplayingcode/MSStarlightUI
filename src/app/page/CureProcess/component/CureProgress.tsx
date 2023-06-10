import { Checkbox, DefaultButton, Dialog, DialogFooter, Dropdown, FontWeights, IButtonStyles, IIconProps, IconButton, Modal, PrimaryButton, Stack, TextField, getTheme, mergeStyleSets } from "@fluentui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.scss'
import { InfomationGridComponent } from "src/app/common";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { TestList } from "src/model/doctorModel";
import { TypeOfTest } from "src/model/enum";
import CustomPeoplePicker from "src/app/common/picker/custompeoplepicker";
import Picker from "src/app/common/picker";
import { TestingForm } from "./TestingForm";

interface IProgressProps{
    isOpen: boolean,
    onDismiss: () => void,
    isNormalProgress: boolean
}

const CureProgress = (props: IProgressProps) => {
    const dispatch = useDispatch();
    const {tableSelectedItem } = useSelector((state: RootState) => state.currentSelected)

    const navigate = useNavigate();

    const [isDialogClosed, setDialogClosed] = useState<boolean>(true);
    const [selectedTest, setSelectedTest] = useState<any[]>([]);


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

    const renderCommonInput = () => {
        return(
            <Stack className="common-input">
                <Stack style={{fontWeight: 600, marginBottom: 16}}>Chỉ số cơ bản</Stack>
                <Stack horizontal>
                    <Stack style={{width: '50%'}}>
                        <Stack horizontal verticalAlign="center">
                            <Stack className="input-label">Nhịp tim</Stack>
                            <TextField className="input-field"/>
                            <Stack>bpm</Stack>
                        </Stack>
                        <Stack horizontal verticalAlign="center">
                            <Stack className="input-label">Nhiệt độ</Stack>
                            <TextField className="input-field"/>
                            <Stack>&#8451;</Stack>
                        </Stack>
                        <Stack horizontal verticalAlign="center" >
                            <Stack className="input-label">Huyết áp: </Stack>
                            <Stack horizontal style={{alignItems: 'center'}}>
                                <TextField className="input-field"/>
                                <Stack>/</Stack>
                                <TextField className="input-field"/>
                            </Stack>
                        </Stack>                        
                    </Stack>
                    <Stack style={{width: '50%'}}>
                        <Stack horizontal verticalAlign="center">
                            <Stack className="input-label">Đường huyết</Stack>
                            <TextField className="input-field"/>
                            <Stack>mmHg</Stack>
                        </Stack>
                        <Stack horizontal verticalAlign="center">
                            <Stack className="input-label">Cân nặng</Stack>
                            <TextField className="input-field"/>
                            <Stack>Kg</Stack>
                        </Stack>
                        <Stack horizontal verticalAlign="center">
                            <Stack className="input-label">Chiều cao</Stack>
                            <TextField className="input-field"/>
                            <Stack>m</Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        )
    }

    const renderInputInfo = () => {
        return(
            <Stack>
                <Stack horizontal tokens={{childrenGap : 16}}>
                    <Stack style={{width: '50%' }}>
                        <TextField                            
                            label="Triệu chứng" 
                            multiline 
                            resizable={false} 
                            rows={6}
                        />
                    </Stack>
                    <Stack style={{width: '50%' }}>
                        <TextField 
                            label="Chẩn đoán" 
                            multiline 
                            resizable={false} 
                            rows={6}
                        />
                    </Stack>
                </Stack>
                <Picker/>
                <TextField 
                    label="Đơn thuốc" 
                    multiline 
                    resizable={false} 
                    rows={4}
                />
                {renderTestResult()}
                <TextField
                    label="Ghi chú"
                    multiline
                    resizable={false}
                    rows={6}
                />
            </Stack>
        )
    }

    const renderTestResult = () => {
        return(
            <>{false && (
                <TestingForm
                    isView={props.isNormalProgress}
                    testingList={testList}
                />
            )}</>
        )
    }

    const renderFooter = () => {
        return(
            <Stack className="modal-footer">
                <DefaultButton text="Xét nghiệm" onClick={() => setDialogClosed(false)}/>
                <PrimaryButton text="Hoàn thành"/>
            </Stack>
        )
    }

    const handleTestConfirm = () => {        
        setDialogClosed(true);
        props.onDismiss();
    }

    const handleChangeCheck = (key: TypeOfTest) => {
        let items = [...selectedTest];
        if(selectedTest.length === 0){
            items.push(key)
        } 
        else {
            const index = selectedTest.findIndex((item) => item == key);            
            if(index === -1){                
                items.push(key)
            }
            else {                
                items.splice(index, 1);                
            }
        }
        items.sort();
        setSelectedTest(items);
    }

    const renderTestList = () => {
        return(
            <>
            {
                TestList.map((item) => (
                    <Checkbox
                        key={item.key}
                        label={item.text}
                        onChange={(ev, checked) => {
                            handleChangeCheck(item.key);
                        }}
                    />
                ))
            }
            </>
        )
    }

    const testList = [
        {
            title: "Xét nghiệm máu",
            reason: "Nhóm máu O",
            detail: undefined,
        }
    ]

    return (
        <Modal
            className="modal-container"
            isOpen={props.isOpen}
            onDismiss={props.onDismiss}
            isBlocking={true}
            // containerClassName={contentStyles.container}
        >
            {
                props.isNormalProgress 
                ? 
                <Stack className="modal-content">
                    {renderHeader()}
                    <Stack className="modal-main-content">
                        {renderPatientInfo()}
                        {renderCommonInput()}
                        {renderInputInfo()}
                    </Stack>
                    {renderFooter()}

                    {/* Test dialog */}
                        <Dialog
                            hidden={isDialogClosed}
                            onDismiss={() => setDialogClosed(true)}
                            dialogContentProps={{ title: 'Chọn loại xét nghiệm' }}
                            maxWidth={'480px'}
                            minWidth={'480px'}
                            modalProps={{ isBlocking: true }}
                        >
                            {renderTestList()}
                            <DialogFooter>
                                <DefaultButton text='Hủy' onClick={() => setDialogClosed(true)} />
                                <PrimaryButton text='Xác nhận' onClick={() => handleTestConfirm()} />
                            </DialogFooter>
                        </Dialog>
                    </Stack>
                    : (
                        <Stack className="modal-content">
                            <Stack className="modal-main-content">
                                <TestingForm
                                    isView={props.isNormalProgress}
                                    testingList={testList}
                                    />
                            </Stack>
                            <Stack className="modal-footer">
                                <DefaultButton text="Hủy" onClick={() => setDialogClosed(false)}/>
                                <PrimaryButton text="Hoàn thành"/>
                            </Stack>
                        </Stack>
                    )
            }
        </Modal>
    )
}

export default CureProgress;