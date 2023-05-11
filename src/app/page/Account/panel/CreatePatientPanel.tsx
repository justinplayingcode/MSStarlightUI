import { UniformPanel } from "src/app/common";
import { BtnType } from "src/model/enum";
import { IFooterPanel } from "src/model/interface";
import { CreateAccount, CreateAccountKey } from "../components/CreateAccount";
import { DatePicker, Dropdown, IDropdownOption, Label, Stack, TextField, mergeStyleSets } from "@fluentui/react";
import { useState } from "react";
import { Dictionary } from "@reduxjs/toolkit";
import { Validate } from "utils";

function CreatPatientPanel() {
  const [fullname, setFullname] = useState<string>();
  const [selectedGender, setSelectedtGender] = useState<string>();
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [address, setAddress] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [identifyNumber, setIdentifyNumber] = useState<string>();
  const [insuranceNumber, setInsuranceNumber] = useState<string>();
  const [selectedDepartment, setSelectedDepartment] = useState<string>();

  const [errorMessage, setErrorMessage] = useState<Dictionary<string>>();

  const styles = mergeStyleSets({
    root: { selectors: { '> *': { marginBottom: 15 } } },
    fullName: { marginBottom: 20 },
    genDate: { marginBottom: 20 },
    phoneNumber: { maxWidth: 150, marginBottom: 20 },
    email: { marginBottom: 20 },
  });

  const gender: IDropdownOption[] = [
    {
      key: 'male',
      text: 'Nam'
    },
    {
      key: 'female',
      text: 'Nữ'
    }
  ]

  const department: IDropdownOption[] = [
    {
      key: 'BV00KKB01',
      text: 'Khoa Khám chữa bệnh'
    }
  ]

  const onFormatDate = (date?: Date): string => {
    return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear());
  };

  const buttonFooter: IFooterPanel[] = [
    {
      text: 'Lưu',
      type: BtnType.Primary,
      disabled: false,
      onClick: () => clickSave() // sau se truyen ham post api create
    }
  ];

  const clickSave = () => {
    setErrorMessage(undefined);
    if(!fullname || fullname?.length === 0){
      setErrorMessage({fullname: 'Hãy điền tên'});
      return;
    }

    if(!Validate.validateFullName(fullname)){
      setErrorMessage({fullname: 'Tên bác sĩ không hợp lệ'});
      return;
    }

    if(!selectedGender?.length){
      setErrorMessage({gender: 'Hãy chọn giới tính'});
      return;
    }

    if(!dateOfBirth){
      setErrorMessage({dateOfBirth: 'Hãy chọn ngày sinh'});
      return;
    }

    if(!phoneNumber?.length){
      setErrorMessage({phoneNumber: 'Hãy nhập số điện thoại'});
      return;
    }
    if(!Validate.phoneNumber(phoneNumber)){
      setErrorMessage({phoneNumber: 'Số điện thoại không hợp lệ'});
      return;
    }

    if(identifyNumber?.length && !Validate.identification(identifyNumber)){
      setErrorMessage({identifyNumber: 'Số căn cước không hợp lệ'});
      return;
    }    

    if(!insuranceNumber?.length){
        setErrorMessage({insuranceNumber: 'Hãy điền số bảo hiểm'});
        return;
    }

    if(!Validate.insurance(insuranceNumber)){
        setErrorMessage({insuranceNumber: 'Số bảo hiểm không hợp lệ'});
        return;
    }

    if(!selectedDepartment?.length){
      setErrorMessage({department: 'Hãy chọn khoa'});
      return;
    }

    alert('done')
  }

  const renderInputField = () => {
    return (
      <>
        <TextField
          required
          label='Họ và tên'
          onChange={(e, val) => {
            setErrorMessage(undefined);
            setFullname(val);
          }}
          className={styles.fullName}
          errorMessage={errorMessage?.fullname}
        />
        <Stack horizontal horizontalAlign='space-between' className={styles.genDate}>
          <Dropdown
            required
            style={{width: 98}}
            label='Giới tính'
            options={gender}
            selectedKey={selectedGender}
            onChange={(e, option) => {
              setErrorMessage(undefined)
              setSelectedtGender(option.key as string)
            }} 
            errorMessage={errorMessage?.gender}
            />
          <Stack>
            <Label required>Ngày tháng năm sinh</Label>
            <DatePicker
              placeholder='Chọn ngày sinh'
              allowTextInput={false}
              formatDate={onFormatDate}
              value={dateOfBirth}
              onSelectDate={(date) => {
                setErrorMessage(undefined)
                setDateOfBirth(date);
              }}
            />
            <Stack style={{color: 'red'}}>{errorMessage?.dateOfBirth}</Stack>
          </Stack>
        </Stack>
        <TextField
          label='Địa chỉ'
          onChange={(ev, val) => {
            setAddress(val)
          }}
        />
        <TextField
          required
          label='Số điện thoại'
          onChange={(e, val) => {
            setErrorMessage(undefined);
            setPhoneNumber(val);
          }}
          className={styles.phoneNumber}
          errorMessage={errorMessage?.phoneNumber}
        />
        <TextField
          label='Email'
          onChange={(e, val) => {
            setEmail(val);
          }}
          className={styles.email}
        />
        <TextField
          label="Căn cước công dân"
          onChange={(e, val) => {
            setErrorMessage(undefined)
            setIdentifyNumber(val)
          }}
          errorMessage={errorMessage?.identifyNumber}
        />
        <TextField
            required
            label="Bảo hiểm y tế"
            onChange={(e, val) => {
                setErrorMessage(undefined)
                setInsuranceNumber(val)
            }}
            errorMessage={errorMessage?.insuranceNumber}
        />
        <Dropdown
          required
          label='Khoa'
          options={department}
          selectedKey={selectedDepartment}
          onChange={(ev, option) => {
            setErrorMessage(undefined)
            setSelectedDepartment(option.key as string)
          }}
          errorMessage={errorMessage?.department}
        />
      </>
    )
  }

  return (
    <UniformPanel
      panelTitle='Tạo tài khoản bệnh nhân'
      renderFooter={buttonFooter}
    >
      {/* content here */}
      <Stack className='form-input'>
        {renderInputField()}
      </Stack>
    </UniformPanel>
  );
}

export default CreatPatientPanel;