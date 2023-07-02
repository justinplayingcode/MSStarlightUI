import { useEffect, useState } from 'react'
import "./index.scss"
import { Stack } from '@fluentui/react';
import { Avatar, InfomationGridComponent } from 'src/app/common';
import { IInfomationGridItem, InputType } from 'src/app/common/InfomationGrid';
import { useDispatch } from 'react-redux';
import { Convert } from 'utils';
import { closeLoading, openLoading, showToastMessage } from 'src/redux/reducers';
import { AvatarSize } from 'src/app/common/Avatar/avatar';
import { useNavigate, useParams } from 'react-router-dom';
import Api from 'api';
import { toastType } from 'src/model/enum';

const PatientDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentItem, setCurrentItem] = useState<any>({});
    const { id: userId } = useParams();

    const getInfo = () => {
      dispatch(openLoading());
      Api.accountApi.getInfoDetail(userId).then(data => {
        if(data.status) {
          dispatch(showToastMessage({message: "Có lỗi xảy ra, hãy thử lại", type: toastType.error}));
          navigate(-1);
        } else {
          setCurrentItem(data.data);
        }
      }).catch(() => {
          dispatch(showToastMessage({message: "Có lỗi xảy ra, hãy thử lại", type: toastType.error}));
          navigate(-1);
        }).finally(() => dispatch(closeLoading()))
    }

    useEffect(() => {
      getInfo();
    },[])

    const information: IInfomationGridItem[] = [
      {
          label: 'Họ và tên',
          value: currentItem?.fullname,
          type: InputType.DisText,
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
      {
          label: 'Bảo hiểm y tế',
          value: currentItem?.insurance,
          type: InputType.DisText
      },
    ]

    const displayValue = (value) => value === 0 ? "--" : value;

    const health: IInfomationGridItem[] = [
      {
        label: 'Chiều cao',
        value: `${displayValue(currentItem?.height)} cm`,
        type: InputType.DisText,
      },
      {
        label: 'Cân nặng',
        value: `${displayValue(currentItem?.weight)} kg`,
        type: InputType.DisText,
      },
      {
        label: 'Nhịp tim',
        value: `${displayValue(currentItem?.heartRate)} bpm`,
        type: InputType.DisText,
      },
      {
        label: 'Nhiệt độ cơ thể',
        value: `${displayValue(currentItem?.temperature)} °C`,
        type: InputType.DisText,
      },
      {
        label: 'Huyết áp',
        value: `${displayValue(currentItem?.bloodPressureSystolic)}/${displayValue(currentItem?.bloodPressureDiastolic)} mmHg`,
        type: InputType.DisText,
      },
      {
        label: 'Đường huyết',
        value: `${displayValue(currentItem?.glucose)} mg/dl`,
        type: InputType.DisText,
      },
    ]

    const renderViewInfo = () => {
        return (
            <>
                <Stack className='bottom-detail-info'>
                    <div className='bottom-detail-info-avatar'>
                      <Avatar size={AvatarSize.SuperLarge} avatar_scr={currentItem?.avatar} isRound={true} />
                    </div>
                    <Stack style={{ marginBottom: 10, fontWeight: 600 }}>Thông tin liên hệ</Stack>
                    <InfomationGridComponent
                        isEdit={false}
                        isDataLoaded={true}
                        items={information || []}
                    />
                    <Stack style={{ margin: "12px 0", fontWeight: 600 }}>Chỉ số sức khỏe ở lần khám gần nhất</Stack>
                    <InfomationGridComponent
                        isEdit={false}
                        isDataLoaded={true}
                        items={health || []}
                    />
                </Stack>
            </>
        )
    }

    return(
        <div className='wrapper-table-content'>
            <Stack className='account-profile'>
                <Stack className="profile-info" tokens={{ childrenGap: 16 }}>
                    <Stack className='profile-detail-info'>
                        <Stack className='detail-info-content'>
                            {renderViewInfo()}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </div>
    )
}

export default PatientDetails;
