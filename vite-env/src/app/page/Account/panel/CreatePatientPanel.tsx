import { DatePicker, Dropdown, IDropdownOption, Label, Stack, TextField, mergeStyleSets } from "@fluentui/react";
import { useEffect, useState } from "react";
import { Dictionary } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import SuccessDialog from "./Dialog";
import { BtnType, DepartmentType, PanelType, TypeAppointmentSchedule, toastType } from "../../../../model/enum";
import { RootState } from "../../../../redux/store";
import { closePanel, closePanelLoading, openPanelLoading, showToastMessage, tableRefresh } from "../../../../redux/reducers";
import Api from "../../../../api";
import { Convert, Validate } from "../../../../utils";
import { IFooterPanel } from "../../../../model/interface";
import { gender } from "../../../../model/userModel";
import { UniformPanel } from "../../../common";

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
  const [selectedType, setSelectedType] = useState<number>(-1);
  const [userId, setUserId] = useState<string>();
  const [symtom, setSymtom] = useState<string>();

  const [errorMessage, setErrorMessage] = useState<Dictionary<string>>();

  const [departmentList, setDepartmentList] = useState<any[]>();

  const dispatch = useDispatch();
  const {currentId } = useSelector((state: RootState) => state.currentSelected);
  const [isDisable, setDisable] = useState<boolean>(false);

  const [isDialogClosed, setIsDialogClosed] = useState<boolean>(true);
  const [newAccount, setNewAccount] = useState<any>();

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
      data.data.map((item: any) => {
        if(item.departmentCode !== DepartmentType.tiepDon && item.departmentCode !== DepartmentType.canLamSang){
          list.push({
            key: item._id,
            text: item.departmentName,
          })
        }
      }) 
      setDepartmentList(list);
    }).catch(err => {
        const { message } = err.response.data;
          dispatch(showToastMessage({message: message, type: toastType.error}));
    }).finally(() => dispatch(closePanelLoading()))
  }

  const mappingTypeAppointment = [
    {
      key: TypeAppointmentSchedule.khamTheoBHYT,
      text: 'Khám theo BHYT'
    },
    {
      key: TypeAppointmentSchedule.khamThuong,
      text: 'Khám thường'
    }
  ]

  const getPatientById = (id: string) => {
    dispatch(openPanelLoading())
    Api.cureProcessApi.getPatientById({userId: id}).then((data) =>{
      setFullname(data.data.fullname);      
      setSelectedtGender(data.data.gender.toString());
      setDateOfBirth(Convert.dmystringtoDate(data.data.dateOfBirth))
      setAddress(data.data.address)
      setPhoneNumber(data.data.phonenumber);
      setEmail(data.data.email)
      setInsuranceNumber(data.data.insurance)
      setUserId(currentId)
      setIdentifyNumber(data.data?.identification)
    }).catch(err => {
      const { message } = err.response.data;
      dispatch(showToastMessage({message: message, type: toastType.error}));
  }).finally(() => {
    setDisable(true)
    dispatch(closePanelLoading())
  })
  }

  useEffect(() => {
    if(props.panelType === PanelType.Edit){
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
    if(selectedType === -1){
      setErrorMessage({type: 'Hãy chọn loại khám'});
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
      dateOfBirth:  Convert.datetommddyyyy(dateOfBirth),
      phonenumber: phoneNumber || '',
      departmentId: selectedDepartment,
      email: email ||'',
      identification: identifyNumber || '',
      insurance: insuranceNumber || '',
      userId: userId || '',
      initialSymptom: symtom || "",
      typeAppointment: selectedType
    }
    dispatch(openPanelLoading());
    Api.accountApi.createPatient(reqbody).then((data) => {
      if(!data.status){
        if(reqbody.userId === "") {
          setNewAccount({
            fullname: data.data.fullname,
            username: data.data.username,
            password: data.data.password
          });
          setIsDialogClosed(false);
        } else {
          dispatch(closePanel());
        }
        dispatch(showToastMessage({message: 'Đăng ký khám bệnh thành công', type: toastType.succes}));
      } else {
        dispatch(showToastMessage({message: 'Tạo không thành công', type: toastType.error}));
        dispatch(closePanel());
      }
    }).catch(err => {
      const { message } = err.response.data;
      dispatch(showToastMessage({message: message, type: toastType.error}))
    }).finally(() =>{ dispatch(closePanelLoading()); dispatch(tableRefresh())})
  }

  const renderInputField = () => {
    return (
      <>
        <TextField
          disabled={isDisable}
          required
          label='Họ và tên'
          value={fullname}
          onChange={(_, val) => {
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
            onChange={(_, option) => {
              setErrorMessage(undefined)
              setSelectedtGender(option!.key as string)
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
              onSelectDate={(date: any) => {
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
          value={address}
          onChange={(_, val) => {
            setAddress(val)
          }}
        />
        <TextField
          disabled={isDisable}
          required
          label='Số điện thoại'
          value={phoneNumber}
          onChange={(_, val) => {
            setErrorMessage(undefined);
            setPhoneNumber(val);
          }}
          className={styles.phoneNumber}
          errorMessage={errorMessage?.phoneNumber}
        />
        <TextField
          disabled={isDisable}
          label='Email'
          value={email}
          onChange={(_, val) => {
            setEmail(val);
          }}
          className={styles.email}
        />
        <TextField
          disabled={isDisable}
          label="Căn cước công dân"
          value={identifyNumber}
          onChange={(_, val) => {
            setErrorMessage(undefined)
            setIdentifyNumber(val)
          }}
          errorMessage={errorMessage?.identifyNumber}
        />
        <TextField
            disabled={isDisable}
            required
            label="Bảo hiểm y tế"
            value={insuranceNumber}
            onChange={(_, val) => {
                setErrorMessage(undefined)
                setInsuranceNumber(val)
            }}
            errorMessage={errorMessage?.insuranceNumber}
        />
        <TextField
          label="Triệu chứng"
          value={symtom}
          onChange={(_, value) => {
            setSymtom(value)
          }}
        />
        <Dropdown 
          required
          label="Loại khám" 
          options={mappingTypeAppointment}
          selectedKey={selectedType}
          onChange={(_, option: any) => {
            setErrorMessage(undefined)
            setSelectedType(option.key as number)
          }}
          errorMessage={errorMessage?.type}
        />
        <Dropdown
          required
          label='Khoa chỉ định'
          options={departmentList as any}
          selectedKey={selectedDepartment}
          onChange={(_, option: any) => {
            setErrorMessage(undefined)
            setSelectedDepartment(option.key as string)
          }}
          errorMessage={errorMessage?.department}
        />
      </>
    )
  }

  return (
    <>
      <UniformPanel
        panelTitle='Tạo tài khoản bệnh nhân'
        renderFooter={buttonFooter}
      >
        {/* content here */}
        <Stack className='form-input'>
          {renderInputField()}
        </Stack>

      </UniformPanel>
      <SuccessDialog
        isDialogClosed={isDialogClosed}
        account={newAccount}
        closeDialog={() => {
          setIsDialogClosed(true);
          dispatch(tableRefresh())
          dispatch(closePanel());
        }}
      />
    </>
  );
}

export default CreatPatientPanel;