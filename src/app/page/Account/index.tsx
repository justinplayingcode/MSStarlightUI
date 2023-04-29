import { BaseButton, DefaultButton, Stack } from '@fluentui/react';
import { accountRole } from 'model';
import * as React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { DepartmentType } from 'src/model/enum';
import { RootState } from 'src/redux/store';
import { CreateAccount } from './components/CreateAccount';
import './index.scss'
import { useNavigate } from 'react-router-dom';

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
                            <DefaultButton text='Quản lí tài khoản bác sĩ' />
                        </>
                        : <>
                            <DefaultButton text='Thêm tài khoản bệnh nhân' />
                            <DefaultButton text='Quản lí tài khoản bệnh nhân'/>
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