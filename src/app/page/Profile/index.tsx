import { Stack } from '@fluentui/react';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import './index.scss'
import { Avatar } from 'src/app/common';
import { AvatarSize } from 'src/app/common/Avatar/avatar';
import { Convert } from 'utils';
import { accountRole } from 'model';

const Profile = () => {

    const { role, info} = useSelector((state: RootState) => state.user)

    return(
        <div className='wrapper-table-content'>
            <Stack className='user-profile'>
                <Stack className='profile-header'>Hồ sơ người dùng</Stack>
                <Stack className="profile-info" tokens={{ childrenGap: 16 }}>
                    <Stack className='profile-basic-info'>
                        {/* <img alt='' src={info?.avatar}/> */}
                        <Avatar size={AvatarSize.SuperLarge} avatar_scr={info?.avatar} isRound={true} />
                        <Stack>{Convert.getAccountRoleName(role)}</Stack>
                    </Stack>
                    <Stack className='profile-detail-info'>
                        <Stack className="info-name">Họ và tên: {info?.fullname}</Stack>
                        {info?.onboarding && <>Trạng thái: Đang nằm viện</>}
                        <Stack>Ngày sinh: {info?.dateOfBirth}</Stack>
                        {role === accountRole.Doctor && <>{info?.department}</>}
                        {/* {role === accountRole.Patient && getHeiWeightInfo(info?.height, info?.weight)} */}
                        {/* {role === accountRole.Patient ? getPatientStatus(info?.status) : <></>} */}
                    </Stack>
                </Stack>
            </Stack>
        </div>
    )
}
export default Profile;