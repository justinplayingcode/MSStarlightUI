import { UniformPanel } from "src/app/common";
import { BtnType, Gender, PanelType } from "src/model/enum";
import { IFooterPanel } from "src/model/interface";
import { CreateAccount, CreateAccountKey } from "../components/CreateAccount";
import { DatePicker, Dropdown, IDropdownOption, Label, Spinner, SpinnerSize, Stack, TextField, mergeStyleSets } from "@fluentui/react";
import { useEffect, useState } from "react";
import { Dictionary } from "@reduxjs/toolkit";
import { Validate } from "utils";
import Api from 'src/api'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";

interface ICreatePatientPanel{
    panelType?: PanelType
}

function CreatPatientPanel(props: ICreatePatientPanel) {

  const [fullname, setFullname] = useState<string>();
  const [selectedGender, setSelectedtGender] = useState<string>();
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [address, setAddress] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [identifyNumber, setIdentifyNumber] = useState<string>();
  const [insuranceNumber, setInsuranceNumber] = useState<string>();
  const [selectedDepartment, setSelectedDepartment] = useState<string>();
  const [userId, setUserId] = useState<string>();

  const [errorMessage, setErrorMessage] = useState<Dictionary<string>>();

  const [isLoading, setIsLoading] = useState<boolean>();
  const [departmentList, setDepartmentList] = useState<any[]>();

  const dispatch = useDispatch();
  const {currentId } = useSelector((state: RootState) => state.currentSelected);
  const [isDisable, setDisable] = useState<boolean>(false);

  const styles = mergeStyleSets({
    root: { selectors: { '> *': { marginBottom: 15 } } },
    fullName: { marginBottom: 20 },
    genDate: { marginBottom: 20 },
    phoneNumber: { maxWidth: 150, marginBottom: 20 },
    email: { marginBottom: 20 },
  });

  const gender: IDropdownOption[] = [
    {
      key: `${Gender.male}`,
      text: 'Nam'
    },
    {
      key: `${Gender.female}`,
      text: 'Nữ'
    }
  ]

  const getDepartment = () => {
    setIsLoading(true)
    Api.departmentApi.getAllDepartment().then(data => {
      const list: IDropdownOption[] = [];
      data.data.map((item) => {
        list.push({
          key: item._id,
          text: item.name,
        })
      })
      setDepartmentList(list);
    }).catch(err => {
        const { message } = err.response.data;
        // setErrorMessage(message)
    }).finally(() => setIsLoading(false))
  }

  const getPatientById = (id: string) => {
    setIsLoading(true);
    Api.cureProcessApi.getPatientById({userId: id}).then((data) =>{
      console.log(data.data)
      setFullname(data.data.fullName);
      setSelectedtGender(data.data.gender);
      setDateOfBirth(new Date(data.data.dateOfBirth))
      setAddress(data.data.address)
      setPhoneNumber(data.data.phonenumber);
      setEmail(data.data.email)
      setInsuranceNumber(data.data)
      setUserId(currentId)
      // setIdentifyNumber()
      // setSelectedDepartment
    }).catch(err => {
      const { message } = err.response.data;
      // setErrorMessage(message)
  }).finally(() => {
    // setDisable(true)
    setIsLoading(false)
  }
  
  )
  }

  useEffect(() => {
    if(props.panelType === PanelType.Edit){
      // console.log('edit type');
      // setUserId(currentId);
      getPatientById(currentId);     
    }
    getDepartment();
  },[])

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

    const reqbody ={
      fullname: fullname,
      address: address || '',
      gender: selectedGender || '',
      dateOfBirth: dateOfBirth.toString(),
      phonenumber: phoneNumber || '',
      department: selectedDepartment,
      email: email ||'',
      identification: identifyNumber || '',
      insurance: insuranceNumber || '',
      userId: userId || ''
    }

    Api.accountApi.createPatient(reqbody).then((data) => {
      console.log(data)
    }).catch(err => {
      const { message } = err.response.data;
      // setErrorMessage(message)
  }).finally(() => setIsLoading(false))
  }

  const renderInputField = () => {
    return (
      <>
        <TextField
          disabled={isDisable}
          required
          label='Họ và tên'
          value={fullname}
          onChange={(e, val) => {
            setErrorMessage(undefined);
            setFullname(val);
          }}
          className={styles.fullName}
          errorMessage={errorMessage?.fullname}
        />
        <Stack horizontal horizontalAlign='space-between' className={styles.genDate}>
          <Dropdown
            disabled={isDisable}
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
              disabled={isDisable}
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
          disabled={isDisable}
          label='Địa chỉ'
          onChange={(ev, val) => {
            setAddress(val)
          }}
        />
        <TextField
          disabled={isDisable}
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
          disabled={isDisable}
          label='Email'
          onChange={(e, val) => {
            setEmail(val);
          }}
          className={styles.email}
        />
        <TextField
          disabled={isDisable}
          label="Căn cước công dân"
          onChange={(e, val) => {
            setErrorMessage(undefined)
            setIdentifyNumber(val)
          }}
          errorMessage={errorMessage?.identifyNumber}
        />
        <TextField
            disabled={isDisable}
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
          label='Khoa chỉ định'
          options={departmentList}
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
      {
        isLoading ? <Spinner size={SpinnerSize.large} />
        :
      <Stack className='form-input'>
        {renderInputField()}
      </Stack>
      }
    </UniformPanel>
  );
}

export default CreatPatientPanel;