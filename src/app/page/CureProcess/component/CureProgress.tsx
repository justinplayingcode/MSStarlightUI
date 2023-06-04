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

interface IProgressProps{
    isOpen: boolean,
    onDismiss: () => void,
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
            <>Common info</>
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
                    rows={4}
                />
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
            <>Test result</>
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
        console.log(selectedTest);
        
        // setDialogClosed(true);
        // props.onDismiss();
    }

    const handleChangeCheck = (key: TypeOfTest) => {
        let items = [];
        if(selectedTest.length === 0){
            items.push(key)
        } 
        else {
            const index = selectedTest.findIndex((item) => item == key);        
            console.log(index);
            
            if(index === -1){
                console.log('not found');
                
                items.push(key)
            }
            else {
                items = [...selectedTest.splice(index, 1)];
            }
        }        
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
                    {renderCommonInput()}
                    {renderInputInfo()}
                </Stack>
                {renderFooter()}

                {/* Test dialog */}
                <Dialog
                    hidden={isDialogClosed}
                    onDismiss={() => setDialogClosed(true)}
                    dialogContentProps={{title: 'Chọn loại xét nghiệm'}}
                    maxWidth={'480px'}
                    minWidth={'480px'}
                    modalProps={{isBlocking: true}}
                >
                    {renderTestList()}
                    <DialogFooter>
                        <DefaultButton text='Hủy' onClick={()=> setDialogClosed(true)}/>
                        <PrimaryButton text='Xác nhận' onClick={() => handleTestConfirm()}/>
                    </DialogFooter>
                </Dialog>
            </Stack>
        </Modal>
    )
}

export default CureProgress;