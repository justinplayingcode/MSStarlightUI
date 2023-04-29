import { DatePicker, DefaultButton, Dropdown, IDropdownOption, PrimaryButton, Stack, TextField } from '@fluentui/react'
import { accountRole } from 'model'
import * as React from 'react'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export enum CreateAccountKey{
    Doctor,
    Patient,
    Diseases,
    Pills
}
export interface ICreateAccountProps{
    keyType?: CreateAccountKey,
    onClickSave?: () => void,
    onClickCancel?: () => void,
}

export const CreateAccount = (props: ICreateAccountProps) => {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [address, setAddress] = useState<string>();
    const [selectedGender, setSelectedtGender] = useState<string>();
    const [dateOfBirth, setDateOfBirth] = useState<Date>();
    const [identifyNumber, setIdentifyNumber] = useState<string>();
    const [insuranceNumber, setInsuranceNumber] = useState<string>();
    const [selectedDepartment, setSelectedDepartment] = useState<string>();

    const gender:IDropdownOption[] = [
        {
            key:'male',
            text:'Nam'
        },
        {
            key:'female',
            text:'Nữ'
        }
    ]

    const department: IDropdownOption[] = [
        {
            key:'BV00KKB01',
            text: 'Khoa Khám chữa bệnh'
        }
    ]

    const onFormatDate = (date?: Date): string => {
        return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear());
      };

    const doctorForm = () => {
        return(
            <>
                <Stack className='left-field'>
                    <TextField
                        required
                        label='Họ và tên'
                        onChange={(e, val) => {
                            setFullname(val);
                        }}
                    />
                    <TextField
                        required
                        label='Address'
                        onChange={(ev, val) => {
                            setAddress(val)
                        }}

                    />
                    <TextField
                        required
                        label='Phone Number'
                        onChange={(e, val) => {
                            setPhoneNumber(val);
                        }}
                    />
                    <TextField
                        label='Số căn cước công dân'
                        onChange={(ev, val) => {
                            setIdentifyNumber(val)
                        }}
                    />
                    <TextField
                        label='Số BHXH'
                        onChange={(ev, val) => {
                            setInsuranceNumber(val)
                        }}
                    />
                </Stack>
                <Stack className='right-field'>
                    <Dropdown
                        required
                        label='Giới tính'
                        options={gender}
                        selectedKey={selectedGender}
                        onChange={(e, option) => {
                            setSelectedtGender(option.key as string)
                        }} />

                    <DatePicker
                        label='Ngày tháng năm sinh'
                        placeholder='Chọn ngày sinh'
                        allowTextInput={false}
                        formatDate={onFormatDate}
                        value={dateOfBirth}
                        onSelectDate={(date) => {
                            setDateOfBirth(date);
                        }}

                    />
                    <Dropdown
                        required
                        label='Khoa'
                        options={department}
                        selectedKey={selectedDepartment}
                        onChange={(ev, option) => {
                            setSelectedDepartment(option.key as string)
                        }}
                    />
                </Stack>
            </>                
        )
    }

    const patientForm = () => {
        return(
            <></>
        )
    }

    const diseasesForm = () => {
        return(
            <></>
        )
    }

    const pillsForm = () => {
        return (
            <></>
        )
    }

    const renderInputField = (key: CreateAccountKey) => {
        switch(key){
            case CreateAccountKey.Doctor:
                return doctorForm();
            case CreateAccountKey.Patient:
                return patientForm();
            case CreateAccountKey.Diseases:
                return diseasesForm();
            case CreateAccountKey.Pills:
                return pillsForm();
            default:
                return <></>
        }
    }
    const clickSave = (key: CreateAccountKey) => {
        switch(key){
            case CreateAccountKey.Doctor:
                {
                    console.log({
                        fullname: fullname,
                        number: phoneNumber,
                        address: address,
                        gender: selectedGender,
                        dateOfBirth: new Date(),
                        identifyNumber: identifyNumber,
                        insuranceNumber: insuranceNumber,
                        department: selectedDepartment
                    })
                }
            return;
        }
    }

    const renderFooter = () => {
        return(
            <Stack className='footer-container'>
            <DefaultButton text='Hủy'
                onClick={() => {
                    navigate(-1)
                    props.onClickCancel?.()
                }}
            />
            <PrimaryButton text='Lưu'
                onClick={() => {
                    navigate(-1);
                    clickSave(props.keyType)
                    props.onClickSave?.()
                }}
            />
            </Stack>
        )
    }
    return(
        <Stack className='create-container'>
            <Stack className='form-container'>
                {renderInputField(props.keyType)}
            </Stack>
            {renderFooter()}
        </Stack>
    )
}