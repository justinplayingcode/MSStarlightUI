import { DefaultButton, Dialog, DialogFooter, IDropdownOption, PrimaryButton, Stack } from '@fluentui/react';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import './index.scss'
import { Avatar } from 'src/app/common';
import { AvatarSize } from 'src/app/common/Avatar/avatar';
import { Convert, Validate } from 'utils';
import { accountRole } from 'model';
import { IInfomationGridItem, InfomationGridComponent, InputType } from 'src/app/common/InfomationGrid';
import { useEffect, useState } from 'react';
import { Dictionary } from '@reduxjs/toolkit';
import { gender } from 'src/model/userModel';
import { useDispatch } from 'react-redux';
import Api from 'api';
import { closeLoading, openLoading, setInfoUser, showToastMessage } from 'src/redux/reducers';
import { ApiStatus, toastType } from 'src/model/enum';
import FileUpload from 'src/app/common/FileUpload';

const Profile = () => {
    const dispatch = useDispatch();
    const { role, username, info } = useSelector((state: RootState) => state.user);
    const [editmode, setEditmode] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<Dictionary<string>>();
    
    const [name, setName] = React.useState<string>(info?.fullname);
    const [selectedGender, setSelectedGender] = useState<string>(info?.gender?.toString());    
    const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date);
    const [phonenumber, setPhonenumber] = useState<string>(info?.phonenumber);
    const [address, setAddress] = useState<string>(info?.address);
    const [email, setEmail] = useState<string>(info?.email);
    const [identification, setIdentification] = useState<string>(info?.identification);
    const [avatarFile, setAvatarFile] = useState<File[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openDefaultAvatar, setOpenDefaultAvatar] = useState<boolean>(false);

    useEffect(()=>{
        setDateOfBirth(Convert.dmystringtoDate(info?.dateOfBirth))
    },[])

    useEffect(() => {
        if(editmode){
          getInfomationInRedux()
        }
    },[editmode])

    const getInfomationInRedux = () => {
      setName(info?.fullname);
      setSelectedGender(info?.gender?.toString());
      setDateOfBirth(Convert.dmystringtoDate(info?.dateOfBirth));
      setPhonenumber(info?.phonenumber);
      setAddress(info?.address)
      setEmail(info?.email)
      setIdentification(info?.identification)
    }

    const topInfomation: IInfomationGridItem[] = [
        {
            label: 'Họ và tên',
            value: name,
            type: InputType.Text,
            onChange: (val: string) => {
                setErrorMessage(undefined);
                setName(val)
            },
            errorMessage: errorMessage?.name
        },
        {
            label: 'Vai trò',
            value: Convert.getAccountRoleName(role),
            type: InputType.DisText
        },
        {
            label: 'Tên đăng nhập',
            value: username,
            type: InputType.DisText
        }
    ]

    const getBottomInfomationItems = () => {
        const items: IInfomationGridItem[] = [];
        items.push(            
            {
                label: 'Giới tính',
                value: editmode ? selectedGender : Convert.convertGender(info?.gender),
                type: InputType.Dropdown,
                option: gender,
                onChange: (option: IDropdownOption) => {
                    setErrorMessage(undefined)
                    setSelectedGender(option.key as string)
                },
                errorMessage: errorMessage?.gender
            },
            {
                label: 'Ngày sinh',
                value: Convert.datetoddmmyyy(dateOfBirth),
                type: InputType.Date,
                onChange: (date: Date) => {
                    setErrorMessage(undefined)
                    setDateOfBirth(date);
                },
                errorMessage: errorMessage?.dateOfBirth
            },
            {
                label:'Số điện thoại',
                value: phonenumber,
                type: InputType.Text,
                onChange: (val: string) => {
                    setErrorMessage(undefined);
                    setPhonenumber(val)
                },
                errorMessage: errorMessage?.phonenumber
            },
            {
                label: 'Địa chỉ',
                value: address,
                type: InputType.Text,
                onChange: (val: string) => {
                    setErrorMessage(undefined);
                    setAddress(val)
                },
                errorMessage: errorMessage?.address
            },
            {
                label: 'Email',
                value: email,
                type: InputType.Text,
                onChange: (val: string) => {
                    setErrorMessage(undefined);
                    setEmail(val)
                },
                errorMessage: errorMessage?.email
            },
            {
                label: 'Căn cước công dân',
                value: identification,
                type: InputType.Text,
                onChange: (val: string) => {
                    setErrorMessage(undefined);
                    setIdentification(val)
                },
                errorMessage: errorMessage?.identification
            },
            
        )

        if(role === accountRole.Patient){
            items.push(
                {
                    label: 'Bảo hiểm y tế',
                    value: info?.insurance,
                    type: InputType.DisText
                },
                {
                    label: 'Trạng thái',
                    value: 'Đang nằm viện',
                    type: InputType.DisText
                },
            )
        };

        if(role === accountRole.Doctor){
            items.push(
                {
                    label: 'Khoa',
                    value: info?.department,
                    type: InputType.DisText
                },
                {
                    label: 'Học vấn',
                    value: Convert.getDoctorRank(info?.rank),
                    type: InputType.DisText
                },
                {
                    label: 'Chức vụ',
                    value: Convert.getDoctorPosition(info?.position),
                    type: InputType.DisText
                }
            )
        }

        return items;
    }

    const handleClickSave = () => {
        //validate
        setErrorMessage(undefined);

        if(!name || name?.length === 0){
            setErrorMessage({name: 'Hãy điền tên'});
            return;
        }

        if(!Validate.validateFullName){
            setErrorMessage({name: 'Tên không hợp lệ'});
            return;
        }

        if(!Validate.email){
            setErrorMessage({email: 'Email không hợp lệ'});
            return;
        }

        if(!gender || gender?.length === 0){
            setErrorMessage({gender: 'Hãy chọn giới tính'});
            return;
        }

        if(!phonenumber || phonenumber?.length === 0){
            setErrorMessage({phonenumber: 'Hãy điền số điện thoại'});
            return;
        }

        if(!Validate.phoneNumber){
            setErrorMessage({phonenumber: 'Số điện thoại không hợp lệ'});
            return;
        }

        if(!dateOfBirth){
            setErrorMessage({dateOfBirth: 'Hãy chọn ngày sinh'});
            return;
        }

        if(!identification || identification?.length === 0) {
            setErrorMessage({identification: 'Hãy điền số căn cước'});
            return;
        }

        if(!Validate.identification){
            setErrorMessage({identification: 'Số căn cước không hợp lệ'});
            return;
        }

        const reqbody = {
            fullname: name,
            email: email || '',
            gender: selectedGender,
            phonenumber: phonenumber,
            address: address || '',
            dateOfBirth: Convert.datetommddyyyy(dateOfBirth),
            identification: identification
        }
        dispatch(openLoading())
        Api.authApi.editPersonalInfo(reqbody).then(data => {
            if (!data.status) {
                dispatch(setInfoUser(data.data))
                dispatch(showToastMessage({ message: 'Sửa thông tin thành công', type: toastType.succes }))
            } else {
                dispatch(showToastMessage({ message: 'Sửa thông tin không thành công', type: toastType.error }))
            }
        }).catch(err => {
            const { message } = err.response.data;
            dispatch(showToastMessage({ message: message, type: toastType.error }))
        }).finally(() => {
          setEditmode(false);
          dispatch(closeLoading())
        })
    }

    const renderViewInfo = () => {
        return (
            <>
                <Stack className='top-detail-info'>
                    <InfomationGridComponent
                        isEdit={editmode}
                        isDataLoaded={true}
                        items={topInfomation}
                    />
                </Stack>
                <Stack className='bottom-detail-info'>
                    <Stack style={{ marginBottom: 10, fontWeight: 600 }}>Thông tin chi tiết</Stack>
                    <InfomationGridComponent
                        isEdit={editmode}
                        isDataLoaded={true}
                        items={getBottomInfomationItems()}
                    />
                </Stack>
            </>
        )
    }

    useEffect(() => {
        if(avatarFile.length){
            setOpenDialog(true);
        }
    },[avatarFile])

    const handleConfirmAvatar = () => {
      const formData = new FormData();
      formData.append('avatar', avatarFile[0]);
      dispatch(openLoading());
      Api.accountApi.editAvatar(formData).then(data => {
        if(data.status) {
          dispatch(showToastMessage({message: "Có lỗi xảy ra, hãy thử lại", type: toastType.error}));
        } else {
          dispatch(showToastMessage({message: "Cập nhật ảnh đại diện thành công", type: toastType.succes}));
          getInfoCurrentUser();
          setAvatarFile([]);
          setOpenDialog(false)
        }
      }).catch(() => {
        dispatch(showToastMessage({message: "Có lỗi xảy ra, hãy thử lại", type: toastType.error}));
      }).finally(() => dispatch(closeLoading()))
    }

    const getInfoCurrentUser = async () => {
      const res = await Api.authApi.getInfoCurrentUser();
      if(res.status === ApiStatus.succes) {
          dispatch(setInfoUser(res.data));
      }
      return res.status
    }

    const handleSetAvatarToDefault = () => {
      dispatch(openLoading());
      Api.accountApi.toDefaultAvatar().then(data => {
        if(data.status) {
          dispatch(showToastMessage({message: "Có lỗi xảy ra, hãy thử lại", type: toastType.error}));
        } else {
          dispatch(showToastMessage({message: "Đặt ảnh đại diện về mặc định", type: toastType.info}));
          getInfoCurrentUser();
          setOpenDefaultAvatar(false)
        }
      }).catch(() => {
        dispatch(showToastMessage({message: "Có lỗi xảy ra, hãy thử lại", type: toastType.error}));
      }).finally(() => dispatch(closeLoading()))
    }

    return(
        <div className='wrapper-table-content'>
            <Stack className='user-profile'>
                <Stack className='profile-header'>
                    <Stack>Thông tin cơ bản</Stack>
                    {
                    !editmode &&
                        <DefaultButton text='Sửa' iconProps={{iconName: 'Edit'}}
                            onClick={() => {
                                setEditmode(true);
                            }}
                        />
                    }                    
                </Stack>
                <Stack className="profile-info" tokens={{ childrenGap: 16 }}>
                    <Stack className='profile-basic-info' tokens={{ childrenGap: 8 }}>
                        <Avatar size={AvatarSize.SuperLarge} avatar_scr={info?.avatar} isRound={true} />
                        <Stack>{Convert.getAccountRoleName(role)}</Stack>
                        <Stack className='profile-change-password'>
                          <FileUpload 
                            files={avatarFile} 
                            isView={false} 
                            multiple={false}
                            text='Đổi ảnh đại diện'
                            accept="image/*"
                            addFiles={setAvatarFile}/>

                          <DefaultButton 
                            onClick={() => setOpenDefaultAvatar(true)}
                            className='btn-set-avatar-to-default'
                            >Đặt về mặc định</DefaultButton>
                        </Stack>
                    </Stack>
                    <Stack className='profile-detail-info'>
                        <Stack className='detail-info-content'>
                            {renderViewInfo()}
                        </Stack>
                        {
                        editmode && 
                            <Stack className='footer-button' horizontal>
                                <PrimaryButton text='Lưu' onClick={() => {
                                    handleClickSave();
                                }}
                                />
                                <DefaultButton text='Hủy' onClick={() => {
                                    setEditmode(false);
                                    getInfomationInRedux()
                                }}
                                />
                            </Stack>                    
                        }
                    </Stack>
                </Stack>
            </Stack>
            <Dialog
                hidden={!openDialog}
                onDismiss={() => setOpenDialog(false)}
                dialogContentProps={{title: 'Cập nhật ảnh đại diện'}}
                maxWidth={'480px'}
                minWidth={'480px'}
                modalProps={{isBlocking: true}}
            >
                <Stack>
                    {`Bạn có muốn sử dụng file: ${avatarFile[0]?.name || ""}`} 
                </Stack>
                <DialogFooter>
                    <DefaultButton text='Hủy'
                        onClick={() => {
                            setAvatarFile([]);
                            setOpenDialog(false)
                        }}
                    />
                    <PrimaryButton text='Xác nhận' 
                        onClick={handleConfirmAvatar}
                    />
                </DialogFooter>
            </Dialog>
            <Dialog
                hidden={!openDefaultAvatar}
                onDismiss={() => setOpenDefaultAvatar(false)}
                dialogContentProps={{title: 'Đặt ảnh đại diện về mặc định'}}
                maxWidth={'480px'}
                minWidth={'480px'}
                modalProps={{isBlocking: true}}
            >
                <Stack>Bạn có muốn đặt ảnh đại diện hiện tại về mặc định</Stack>
                <DialogFooter>
                    <DefaultButton text='Hủy'
                        onClick={() => {
                          setOpenDefaultAvatar(false)
                        }}
                    />
                    <PrimaryButton text='Xác nhận' 
                        onClick={handleSetAvatarToDefault}
                    />
                </DialogFooter>
            </Dialog>
        </div>
    )
}
export default Profile;