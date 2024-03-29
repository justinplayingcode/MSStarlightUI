import { Toast, UniformPanel } from "src/app/common";
import { BtnType, DoctorRank, Gender, DoctorPosition, toastType } from "src/model/enum";
import { IFooterPanel } from "src/model/interface";
import { DatePicker, Dropdown, IDropdownOption, Label, Spinner, SpinnerSize, Stack, TextField, mergeStyleSets } from "@fluentui/react";
import { useEffect, useState } from "react";
import { Dictionary } from "@reduxjs/toolkit";
import { Convert, Validate } from "utils";
import Api from '../../../../api'
import SuccessDialog from "./Dialog";
import { useDispatch } from "react-redux";
import { closePanel, closePanelLoading, openPanelLoading, showToastMessage, tableRefresh } from "src/redux/reducers";
import { gender, onFormatDate } from "src/model/userModel";
import { doctorPosition, doctorRank } from "src/model/doctorModel";

function CreatDoctorPanel() {
  const [fullname, setFullname] = useState<string>();
  const [selectedGender, setSelectedGender] = useState<string>();
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [address, setAddress] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [identifyNumber, setIdentifyNumber] = useState<string>();
  const [selectedDepartment, setSelectedDepartment] = useState<string>();
  const [rank, setRank] = useState<string>();
  const [position, setPosition] = useState<string>();

  const [errorMessage, setErrorMessage] = useState<Dictionary<string>>();

  const [departmentList, setDepartmentList] = useState<any[]>();

  const [isDialogClosed, setIsDialogClosed] = useState<boolean>(true);
  const [newAccount, setNewAccount] = useState<any>();

  const dispatch = useDispatch();

  const styles = mergeStyleSets({
    root: { selectors: { '> *': { marginBottom: 15 } } },
    fullName: { marginBottom: 20 },
    genDate: { marginBottom: 20 },
    phoneNumber: { maxWidth: 150, marginBottom: 20 },
    email: { marginBottom: 20 },
  });  

  const getDepartment = () => {
    dispatch(openPanelLoading())
    Api.departmentApi.getAllDepartment().then(data => {
      const list: IDropdownOption[] = [];
      data.data.map((item) => {
        list.push({
          key: item._id,
          text: item.departmentName,
        })
      })
      setDepartmentList(list);
    }).catch(err => {
        const { message } = err.response.data;
        // setErrorMessage(message)
        dispatch(showToastMessage({message: message, type: toastType.error}));
    }).finally(() => dispatch(closePanelLoading()))
  }

  useEffect(() => {
      getDepartment();
  },[])
  
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

    if(!selectedDepartment?.length){
      setErrorMessage({department: 'Hãy chọn khoa'});
      return;
    }

    if(!position?.length){
      setErrorMessage({doctorPosition: 'Hãy chọn chức vụ'});
      return;
    }

    if(!rank?.length){
      setErrorMessage({doctorRank: 'Hãy chọn học vấn'});
      return;
    }

    const reqbody = {
      fullname: fullname,
      gender: selectedGender,
      dateOfBirth: Convert.datetommddyyyy(dateOfBirth),
      address: address || '',
      phonenumber: phoneNumber,
      email: email,
      identification: identifyNumber || '',
      departmentId: selectedDepartment || '',
      position: position,
      rank: rank,
    }
    
    dispatch(openPanelLoading())
    Api.accountApi.createDoctor(reqbody).then(data => {
      if(!data.status){
        //show dialog
        setNewAccount({
          fullname: data.data.fullname,
          username: data.data.username,
          password: data.data.password
        });
        setIsDialogClosed(false);
      } else
      {
        dispatch(closePanelLoading());
        dispatch(showToastMessage({message: 'Tạo không thành công', type: toastType.error}));
      }
    }).catch(err => {
        const { message } = err.response.data;
        dispatch(closePanelLoading());
        dispatch(showToastMessage({message: message, type: toastType.error}))
    })
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
              setSelectedGender(option.key as string)
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
          required
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
        <Dropdown
          required
          label='Khoa'
          options={departmentList}
          selectedKey={selectedDepartment}
          onChange={(ev, option) => {
            setErrorMessage(undefined)
            setSelectedDepartment(option.key as string)
          }}
          errorMessage={errorMessage?.department}
        />
        <Dropdown
          required
          label='Chức vụ'
          options={doctorPosition}
          selectedKey={position}
          onChange={(ev, option) => {
            setErrorMessage(undefined)
            setPosition(option.key as string)
          }}
          errorMessage={errorMessage?.doctorPosition}
        />
        <Dropdown
          required
          label='Học vấn'
          options={doctorRank}
          selectedKey={rank}
          onChange={(ev, option) => {
            setErrorMessage(undefined)
            setRank(option.key as string)
          }}
          errorMessage={errorMessage?.doctorRank}
        />
      </>
    )
  }

  return (
    <>
    <UniformPanel
      panelTitle='Tạo tài khoản bác sĩ'
      renderFooter={buttonFooter}
    >
      {/* content here */}
      {
        // isLoading ? <Spinner size={SpinnerSize.large} />
        //   : 
          <Stack className='form-input'>
            {renderInputField()}
          </Stack>
      }
    </UniformPanel>
    <SuccessDialog 
      isDialogClosed={isDialogClosed} 
      account={newAccount}
      closeDialog={() => {
        setIsDialogClosed(true);
        dispatch(closePanel());
        dispatch(tableRefresh());
      }}
    />
    </>
  );
}

export default CreatDoctorPanel;