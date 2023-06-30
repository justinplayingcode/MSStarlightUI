import { DefaultButton, IDropdownOption, PrimaryButton, Stack } from '@fluentui/react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import "./index.scss"
import { InfomationGridComponent } from 'src/app/common';
import { IInfomationGridItem, InputType } from 'src/app/common/InfomationGrid';
import { Convert } from 'utils';
import { useDispatch } from 'react-redux';
import Api from 'api';
import { closeLoading, openLoading, showToastMessage } from 'src/redux/reducers';
import { toastType } from 'src/model/enum';
import { Dictionary } from '@reduxjs/toolkit';
import { doctorPosition, doctorRank } from 'src/model/doctorModel';
import { useParams } from 'react-router-dom';

const DoctorDetails = () => {
    const { role, username, info } = useSelector((state: RootState) => state.user);
    const [editmode, setEditmode] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<Dictionary<string>>();
    const dispatch = useDispatch();
    const { tableSelectedItem } = useSelector((state: RootState) => state.currentSelected);

    const [departmentList, setDepartmentList] = useState<IDropdownOption[]>([]);
    const [department, setDepartment] = useState<string>("");
    const [rank, setRank] = useState<string>();
    const [position, setPosition] = useState<string>();

    const { id } = useParams();

    const getDepartment = () => {
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
            dispatch(showToastMessage({message: message, type: toastType.error}));
        })
      }
    
      useEffect(() => {
            dispatch(openLoading());
            getDepartment();
            setTimeout(() => {
                dispatch(closeLoading())
              }, 3000);
          
      },[])

    const account = tableSelectedItem[0];

    const information: IInfomationGridItem[] = [
        {
            label: 'Họ và tên',
            value: account?.fullname,
            type: InputType.DisText,
        },
        {
            label: 'Tên đăng nhập',
            value: username,
            type: InputType.DisText
        },
        {
            label: 'Giới tính',
            value: Convert.convertGender(account?.gender),
            type: InputType.DisText,
        },
        {
            label: 'Ngày sinh',
            value: account?.dateOfBirth,
            type: InputType.DisText
        },
        {
            label: 'Số điện thoại',
            value: account?.phonenumber,
            type: InputType.DisText,
        },
        {
            label: 'Địa chỉ',
            value: account?.address,
            type: InputType.DisText,
        },
        {
            label: 'Email',
            value: account?.email,
            type: InputType.DisText,
        },
        {
            label: 'Căn cước công dân',
            value: account?.identification,
            type: InputType.DisText
        },
        {
            label: 'Khoa',
            value: editmode ? department : account?.departmentName,
            type: InputType.Dropdown,
            option: departmentList,
            onChange: (option: IDropdownOption) => {
                setErrorMessage(undefined)
                setDepartment(option.key as string)
            },
            errorMessage: errorMessage?.department
        },
        {
            label: 'Học vấn',
            value: editmode ? rank : Convert.getDoctorRank(account?.rank),
            type: InputType.Dropdown,
            option: doctorRank,
            onChange: (option: IDropdownOption) => {
                setErrorMessage(undefined)
                setRank(option.key as string)
            },
            errorMessage: errorMessage?.doctorRank
        },
        {
            label: 'Chức vụ',
            value: editmode ? position : Convert.getDoctorPosition(account?.position),
            type: InputType.Dropdown,
            option: doctorPosition,
            onChange: (option: IDropdownOption) => {
                setErrorMessage(undefined)
                setPosition(option.key as string)
            },
            errorMessage: errorMessage?.doctorPosition
        }
    ]

    const renderViewInfo = () => {
        return (
            <>
                <Stack className='bottom-detail-info'>
                    <Stack style={{ marginBottom: 10, fontWeight: 600 }}>Thông tin chi tiết</Stack>
                    <InfomationGridComponent
                        isEdit={editmode}
                        isDataLoaded={true}
                        items={information || []}
                    />
                </Stack>
            </>
        )
    }

    const handleClickSave = () => {

    };

    const getInfomationInRedux = () => { }

    return (
        <div className='wrapper-table-content'>
            <Stack className='account-profile'>
                <Stack className='profile-header'>
                    <Stack>Hồ sơ người dùng</Stack>
                    {
                        !editmode &&
                        <DefaultButton text='Sửa' iconProps={{ iconName: 'Edit' }}
                            onClick={() => {
                                setEditmode(true);
                            }}
                        />
                    }
                </Stack>
                <Stack className="profile-info" tokens={{ childrenGap: 16 }}>
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
        </div>
    )
}

export default DoctorDetails;