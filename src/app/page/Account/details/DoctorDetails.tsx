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
    const [editmode, setEditmode] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<Dictionary<string>>();
    const dispatch = useDispatch();
    const { tableSelectedItem } = useSelector((state: RootState) => state.currentSelected);
    const account = tableSelectedItem[0];

    const [departmentList, setDepartmentList] = useState<IDropdownOption[]>([]);
    const [department, setDepartment] = useState<string>("");
    const [rank, setRank] = useState<string>();
    const [position, setPosition] = useState<string>();

    const { id: userId } = useParams();

    const getDepartment = () => {
        dispatch(openLoading());
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
        }).finally(() => dispatch(closeLoading()))
    }
    
      useEffect(() => {
            getDepartment();
            getDepartment();
            setTimeout(() => {
                dispatch(closeLoading())
              }, 3000);
          
        getDepartment();
            setTimeout(() => {
                dispatch(closeLoading())
              }, 3000);
          
      },[])


    const information: IInfomationGridItem[] = [
        {
            label: 'Họ và tên',
            value: account?.fullname,
            type: InputType.DisText,
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
    ]

    const renderViewInfo = () => {
        return (
            <>
                <Stack className='bottom-detail-info'>
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
      const body = {
        userId: userId,
        position: position,
        rank: rank,
        departmentId: department
      }
      dispatch(openLoading());
      Api.accountApi.changeInfoDoctorByAdmin(body).then(data => {
        const errorMessage = (data as any).message;
        let typeToast = toastType.error;
        if(!data.status) {
          setEditmode(false);
        }
        dispatch(showToastMessage({message: errorMessage, type: typeToast}))
      }).catch(() => dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error}))).finally(() => {
        dispatch(closeLoading());
      });
    };

    return (
        <div className='wrapper-table-content'>
            <Stack className='account-profile'>
                <Stack className='profile-header'>
                    <Stack>Hồ sơ chi tiết</Stack>
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
                                <PrimaryButton text='Lưu' onClick={handleClickSave}
                                />
                                <DefaultButton text='Hủy' onClick={() => {
                                    setEditmode(false);
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