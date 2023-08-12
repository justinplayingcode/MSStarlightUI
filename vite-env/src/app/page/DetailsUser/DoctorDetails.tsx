import { DefaultButton, IDropdownOption, PrimaryButton, Stack } from '@fluentui/react';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "./index.scss"
import { useDispatch } from 'react-redux';
import { Dictionary } from '@reduxjs/toolkit';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { closeLoading, openLoading, showToastMessage } from '../../../redux/reducers';
import Api from '../../../api';
import { accountRole, toastType } from '../../../model/enum';
import { IInfomationGridItem, InfomationGridComponent, InputType } from '../../common/InfomationGrid';
import { doctorPosition, doctorRank, mappingDoctorPosition, mappingDoctorRank } from '../../../model/doctorModel';
import { Convert } from '../../../utils';
import { Avatar } from '../../common';
import { AvatarSize } from '../../common/Avatar/avatar';

const DoctorDetails = () => {
    const [editmode, setEditmode] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<Dictionary<string>>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { role } = useSelector((state: RootState) => state.user);
    const [currentItem, setCurrentItem] = useState<any>({});
    const [departmentList, setDepartmentList] = useState<IDropdownOption[]>([]);
    const [department, setDepartment] = useState<string>("");
    const [rank, setRank] = useState<string>();
    const [position, setPosition] = useState<string>();

    const { id: userId } = useParams();

    const getDepartment = () => {
        dispatch(openLoading());
        Api.departmentApi.getAllDepartment().then(data => {
          const list: IDropdownOption[] = [];
          data.data.map((item: any) => {
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
      getInfo();
    }, [])
    
    useEffect(() => {
      if(editmode) {
        getDepartment();
      }
    },[editmode])

    const getInfo = () => {
      dispatch(openLoading());
      Api.accountApi.getInfoDetail(userId).then(data => {
        if(data.status) {
          dispatch(showToastMessage({message: "Có lỗi xảy ra, hãy thử lại", type: toastType.error}));
          navigate(-1);
        } else {
          setCurrentItem(data.data);
          setRank(`${data.data?.rank}`);
          setPosition(`${data.data?.position}`);
          setDepartment(data.data?.departmentId)
        }
      }).catch(() => {
          dispatch(showToastMessage({message: "Có lỗi xảy ra, hãy thử lại", type: toastType.error}));
          navigate(-1);
        }).finally(() => dispatch(closeLoading()))
    }

    const information: IInfomationGridItem[] = [
        {
            label: 'Họ và tên',
            value: currentItem?.fullname,
            type: InputType.DisText,
        },
        {
          label: 'Khoa',
          value: editmode ? department : currentItem?.department,
          type: InputType.Dropdown,
          option: departmentList,
          onChange: (option: any) => {
              setErrorMessage(undefined)
              setDepartment(option.key as string)
          },
          errorMessage: errorMessage?.department
        },
        {
            label: 'Học vấn',
            value: editmode ? rank : mappingDoctorRank[rank as any],
            type: InputType.Dropdown,
            option: doctorRank,
            onChange: (option: any) => {
                setErrorMessage(undefined)
                setRank(option.key as string)
            },
            errorMessage: errorMessage?.doctorRank
        },
        {
            label: 'Chức vụ',
            value: editmode ? position : mappingDoctorPosition[position as any],
            type: InputType.Dropdown,
            option: doctorPosition,
            onChange: (option: any) => {
                setErrorMessage(undefined)
                setPosition(option.key as string)
            },
            errorMessage: errorMessage?.doctorPosition
        },
        {
            label: 'Giới tính',
            value: Convert.convertGender(currentItem?.gender),
            type: InputType.DisText,
        },
        {
            label: 'Ngày sinh',
            value: currentItem?.dateOfBirth,
            type: InputType.DisText
        },
        {
            label: 'Số điện thoại',
            value: currentItem?.phonenumber,
            type: InputType.DisText,
        },
        {
            label: 'Địa chỉ',
            value: currentItem?.address,
            type: InputType.DisText,
        },
        {
            label: 'Email',
            value: currentItem?.email,
            type: InputType.DisText,
        },
        {
            label: 'Căn cước công dân',
            value: currentItem?.identification,
            type: InputType.DisText
        },
    ]

    const renderViewInfo = () => {
        return (
            <>
                <Stack className='bottom-detail-info'>
                    <div className='bottom-detail-info-avatar'>
                      <Avatar size={AvatarSize.SuperLarge} avatar_scr={currentItem?.avatar} isRound={true} />
                      {
                        (!editmode && role === accountRole.Admin) &&
                        <DefaultButton text='Sửa' iconProps={{ iconName: 'Edit' }}
                            onClick={() => {
                                setEditmode(true);
                            }}
                        />
                    }
                    </div>
                    <Stack style={{ marginBottom: 10, fontWeight: 600 }}>Thông tin liên hệ</Stack>
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
        if(!data.status) {
          dispatch(showToastMessage({message: 'Cập nhật thông tin thành công', type: toastType.succes}));
          getInfo();
          setEditmode(false);
        } else {
          dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error}))
        }
      }).catch(() => dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error}))).finally(() => {
        dispatch(closeLoading());
      });
    };

    return (
        <div className='wrapper-table-content'>
            <Stack className='account-profile'>
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