import { Stack } from '@fluentui/react';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import './index.scss'
import { Avatar } from 'src/app/common';
import { AvatarSize } from 'src/app/common/Avatar/avatar';
import { Convert } from 'utils';
import { accountRole } from 'model';
import { IInfomationGridItem, InfomationGridComponent } from 'src/app/common/InfomationGrid';

const Profile = () => {

    const { role, username, info} = useSelector((state: RootState) => state.user);

    const getInfomationItems = () => {
        const items: IInfomationGridItem[] = [];
        items.push(
            {
                label: 'Họ và tên',
                value: info?.fullname
            },
            {
                label: 'Giới tính',
                value: Convert.convertGender(info?.gender)
            },
            {
                label: 'Ngày sinh',
                value: info?.dateOfBirth,
            },
            {
                label:'Số điện thoại',
                value: info?.phonenumber
            },
            {
                label: 'Địa chỉ',
                value: info?.address
            },
            {
                label: 'Email',
                value: info?.email
            },
            {
                label: 'Căn cước công dân',
                value: info?.identification
            },
            {
                label: 'Tên đăng nhập',
                value: username,
            }
        )

        if(role === accountRole.Patient){
            items.push(
                {
                    label: 'Bảo hiểm y tế',
                    value: info?.insurance
                },
                {
                    label: 'Trạng thái',
                    value: 'Đang nằm viện'
                },
            )
        };

        if(role === accountRole.Doctor){
            items.push(
                {
                    label: 'Khoa',
                    value: info?.department
                },
                {
                    label: 'Học vấn',
                    value: Convert.getDoctorRank(info?.rank)
                },
                {
                    label: 'Chức vụ',
                    value: Convert.getDoctorPosition(info?.position)
                }
            )
        }

        return items;
    }

    return(
        <div className='wrapper-table-content'>
            <Stack className='user-profile'>
                <Stack className='profile-header'>Hồ sơ người dùng</Stack>
                <Stack className="profile-info" tokens={{ childrenGap: 16 }}>
                    <Stack className='profile-basic-info'>
                        <Avatar size={AvatarSize.SuperLarge} avatar_scr={info?.avatar} isRound={true} />
                        <Stack>{Convert.getAccountRoleName(role)}</Stack>
                    </Stack>
                    <Stack className='profile-detail-info'>
                        <InfomationGridComponent
                            isDataLoaded={true}
                            items={getInfomationItems()}
                        />
                        {/* {role === accountRole.Patient && getHeiWeightInfo(info?.height, info?.weight)} */}
                        {/* {role === accountRole.Patient && getPatientStatus(info?.status) */}
                    </Stack>
                </Stack>
            </Stack>
        </div>
    )
}
export default Profile;