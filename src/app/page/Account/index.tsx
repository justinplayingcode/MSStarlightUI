import { DefaultButton, Stack } from '@fluentui/react';
import './index.scss'
import { useNavigate } from 'react-router-dom';
import NavigateButton from 'src/app/common/navigateButton';
import image from 'image';

const Account = () => {
    const navigate = useNavigate();

    const renderSection = (isDoctor: boolean) => {
        return (
            <Stack className='section-container'>
                <Stack className='section-header-text'>
                    {isDoctor
                        ? <>Bác sĩ</>
                        : <>Bệnh nhân</>
                    }
                </Stack>
                <Stack className='section-btn'>
                    {isDoctor
                        ? <>
                            <DefaultButton text='Thêm tài khoản bác sĩ' onClick={() => navigate('/account/create-doctor')} />
                            <DefaultButton text='Quản lí tài khoản bác sĩ' onClick={() => navigate('/account/doctor-management')}/>
                        </>
                        : <>
                            {/* <DefaultButton text='Thêm tài khoản bệnh nhân' onClick={() => navigate('/account/create-patient')} /> */}
                            <DefaultButton text='Quản lí tài khoản bệnh nhân' onClick={() => navigate('/account/patient-management')}/>
                        </>
                    }
                </Stack>
            </Stack>
        )
    }

    return (
        <Stack className='account-management'>
            {renderSection(false)}           
            {renderSection(true)}
        </Stack>
    )
}

export default Account;