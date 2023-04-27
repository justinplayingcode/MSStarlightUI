import { BaseButton, DefaultButton, Stack } from '@fluentui/react';
import { accountRole } from 'model';
import * as React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { DepartmentType } from 'src/model/enum';
import { RootState } from 'src/redux/store';

const Account = () => {
    const dispatch = useDispatch();
    const {role } = useSelector((state: RootState) => state.user)
    const [selectedMenu, setSelectedmenu] = useState<number>(0);

    const renderMenu = (selectedMenu: number) => {
        switch(selectedMenu){
            case 1:
                return<>1</>
            case 2:
                return<>2</>
            case 3:
                return<>3</>
            case 4: 
                return<>4</>
            default:
                return<></>
        }
    }

    const getButton = (role: accountRole) => {
        const list = [];
        list.push(
        {
            text: 'Thêm tài khoản bệnh nhân',
            onclick: () => setSelectedmenu(1)
        },
        {
            //tiếp đón bệnh nhân nên có hay không
            text: 'Quản lí tài khoản bệnh nhân',
            onclick: () => setSelectedmenu(2)
        });
        if(role === accountRole.Admin){
            list.push(
            {
                text: 'Thêm tài khoản bác sĩ',
                onclick: () => setSelectedmenu(3)
            },
            {
                text: 'Quản lí tài khoản bác sĩ',
                onclick: () => setSelectedmenu(4)
            });
        }
        return list;
    }

    return (
        <Stack>Account Management
            {/* <BaseButton text='Click' onClick={notify}/> */}
            <Stack>Bsi ở khoa tiếp đón, thì có thể thêm

            {
                getButton(role).map((item, index) => {
                    return(
                        <DefaultButton key={index} text={item.text} onClick={item.onclick}/>
                    )
                })
            }
            </Stack>
            <Stack>
                <DefaultButton text='reset' onClick={() => setSelectedmenu(0)}/>
                {renderMenu(selectedMenu)}
            </Stack>
        </Stack>
    )
}

export default Account;