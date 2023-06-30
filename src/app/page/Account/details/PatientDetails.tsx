import React, { useEffect } from 'react'
import "./index.scss"
import { Stack, DefaultButton, PrimaryButton } from '@fluentui/react';
import { InfomationGridComponent } from 'src/app/common';
import { IInfomationGridItem, InputType } from 'src/app/common/InfomationGrid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { Convert } from 'utils';
import { closeLoading, openLoading } from 'src/redux/reducers';

const PatientDetails = () => {
    const dispatch = useDispatch();
    const { tableSelectedItem } = useSelector((state: RootState) => state.currentSelected);

    const account = tableSelectedItem[0];

    useEffect(() => {
        dispatch(openLoading());
        setTimeout(() => {
            //call api get patient data
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
            label: 'Bảo hiểm y tế',
            value: account?.insurance,
            type: InputType.DisText
        },
        // {
        //     label: 'Trạng thái',
        //     value: 'Đang nằm viện',
        //     type: InputType.DisText
        // },
    ]

    const renderViewInfo = () => {
        return (
            <>
                <Stack className='bottom-detail-info'>
                    <Stack style={{ marginBottom: 10, fontWeight: 600 }}>Thông tin chi tiết</Stack>
                    <InfomationGridComponent
                        isEdit={false}
                        isDataLoaded={true}
                        items={information || []}
                    />
                </Stack>
            </>
        )
    }

    return(
        <div className='wrapper-table-content'>
            <Stack className='account-profile'>
                <Stack className='profile-header'>
                    <Stack>Hồ sơ người dùng</Stack>
                </Stack>
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
