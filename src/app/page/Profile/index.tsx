import { DatePicker, DefaultButton, Dropdown, IDropdownOption, Label, PrimaryButton, Stack, TextField } from '@fluentui/react';
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
import { gender, onFormatDate } from 'src/model/userModel';
import { useDispatch } from 'react-redux';
import Api from 'api';
import { showToastMessage } from 'src/redux/reducers';
import { toastType } from 'src/model/enum';

const Profile = () => {
    const dispatch = useDispatch();
    const { role, username, info} = useSelector((state: RootState) => state.user);
    const [editmode, setEditmode] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] =useState<Dictionary<string>>();
    
    const [name, setName] = React.useState<string>(info?.fullname);
    const [selectedGender, setSelectedGender] = useState<string>(info?.gender?.toString());    
    const [dateOfBirth, setDateOfBirth] = useState<Date>(Convert.dmystringtoDate(info?.dateOfBirth));
    const [phonenumber, setPhonenumber] = useState<string>(info?.phonenumber);
    const [address, setAddress] = useState<string>(info?.address);
    const [email, setEmail] = useState<string>(info?.email);
    const [identification, setIdentification] = useState<string>(info?.identification);

    useEffect(() => {
        if(editmode){
            setName(info?.fullname);
            setSelectedGender(info?.gender?.toString());
            setDateOfBirth(Convert.dmystringtoDate(info?.dateOfBirth));
            setPhonenumber(info?.phonenumber);
            setAddress(info?.address)
            setEmail(info?.email)
            setIdentification(info?.identification)
        }
    },[editmode])

    const topInfomation: IInfomationGridItem[] = [
        {
            label: 'Họ và tên',
            value: name,
            type: InputType.Text,
            onChange: (val: string) => {
                setErrorMessage(undefined);
                setName(val)
            }
        },
        {
            label: 'Vai trò',
            value: info?.department,
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
                }
            },
            {
                label: 'Ngày sinh',
                value: Convert.datetommddyyyy(dateOfBirth),
                type: InputType.Date,
                onChange: (date: Date) => {
                    setErrorMessage(undefined)
                    setDateOfBirth(date);
                }
            },
            {
                label:'Số điện thoại',
                value: phonenumber,
                type: InputType.Text,
                onChange: (val: string) => {
                    setErrorMessage(undefined);
                    setPhonenumber(val)
                }
            },
            {
                label: 'Địa chỉ',
                value: address,
                type: InputType.Text,
                onChange: (val: string) => {
                    setErrorMessage(undefined);
                    setAddress(val)
                }
            },
            {
                label: 'Email',
                value: email,
                type: InputType.Text,
                onChange: (val: string) => {
                    setErrorMessage(undefined);
                    setEmail(val)
                }
            },
            {
                label: 'Căn cước công dân',
                value: identification,
                type: InputType.Text,
                onChange: (val: string) => {
                    setErrorMessage(undefined);
                    setIdentification(val)
                }
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
        Api.authApi.editPersonalInfo(reqbody).then(data => {
            if (!data.status) {
                dispatch(showToastMessage({ message: 'Sửa thông tin thành công', type: toastType.succes }))
            } else {
                dispatch(showToastMessage({ message: 'Sửa thông tin không thành công', type: toastType.error }))
            }
        }).catch(err => {
            const { message } = err.response.data;
            dispatch(showToastMessage({ message: message, type: toastType.error }))
        }).finally(() => setEditmode(false))
    }

    const handleChangeAvatar = () => {
        alert('change avatar')
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

    const renderEditInfo = () => {
        return(
            <>
                <Stack className='bottom-detail-info'>    
                    <Stack horizontal>
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
                            <Label>Ngày sinh</Label>
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
                        required
                        underlined 
                        label="Số điện thoại:" 
                        value={phonenumber}
                        onChange={(e, val) => {
                            setErrorMessage(undefined);
                            setPhonenumber(val)
                        }}
                        errorMessage={errorMessage?.phonenumber}
                    />
                    <TextField 
                        underlined 
                        label="Địa chỉ:"
                        value={address} 
                        onChange={(e, val) => {
                            setErrorMessage(undefined);
                            setAddress(val)
                        }}
                        errorMessage={errorMessage?.address}
                    />
                    <TextField 
                        underlined
                        label="Email:"
                        value={email}
                        onChange={(e, val) => {
                            setErrorMessage(undefined)
                            setEmail(val)
                        }} 
                        errorMessage={errorMessage?.email}
                    />
                    <TextField 
                        required
                        underlined 
                        label="Căn cước công dân:" 
                        value={identification}
                        onChange={(e, val) => {
                            setErrorMessage(undefined);
                            setIdentification(val)
                        }}
                        errorMessage={errorMessage?.identification}
                    />
                    <TextField
                        underlined
                        disabled
                        label="Khoa:" 
                        value={info?.department}
                    />
                    <TextField 
                        underlined 
                        disabled
                        label="Học vấn:" 
                        value={Convert.getDoctorRank(info?.rank)}
                    />
                    <TextField 
                        underlined 
                        disabled
                        label="Chức vụ:" 
                        value={Convert.getDoctorPosition(info?.position)}
                    />
                </Stack>
            </>
        )
    }

    return(
        <div className='wrapper-table-content'>
            <Stack className='user-profile'>
                <Stack className='profile-header'>
                    <Stack>Hồ sơ người dùng</Stack>
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
                        <DefaultButton text='Đổi ảnh đại diện' onClick={() => handleChangeAvatar()} />
                    </Stack>
                    <Stack className='profile-detail-info'>
                        <Stack className='detail-info-content'>
                            {
                                renderViewInfo()
                            }
                        </Stack>
                        {
                        editmode && 
                            <Stack className='footer-button' horizontal>
                                <PrimaryButton text='Lưu' onClick={() => {
                                    handleClickSave();
                                }}
                                />
                                <DefaultButton text='Hủy' onClick={() => {
                                    setEditmode(false)
                                }}
                                />
                            </Stack>                    
                        }
                    </Stack>
                </Stack>
            </Stack>
        </div>
    )
}
export default Profile;