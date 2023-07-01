import { DefaultButton, PrimaryButton, Stack, TextField } from '@fluentui/react';
import "./index.scss"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dictionary } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { closeLoading, openLoading, showToastMessage } from 'src/redux/reducers';
import Api from 'api';
import { toastType } from 'src/model/enum';


const PasswordChange = () => {
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<Dictionary<string>>();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = () => {
        setErrorMessage(undefined);
        if(password === "" || !password){
            setErrorMessage({password: "Hãy nhập mật khẩu hiện tại"});
            return;
        }
        if(newPassword === "" || !newPassword){
            setErrorMessage({newPassword: "Hãy nhập mật khẩu hiện tại"});
            return;
        }
        if(confirm === "" || !confirm){
            setErrorMessage({confirm: "Hãy nhập mật khẩu hiện tại"});
            return;
        }


        if(newPassword !== confirm){
            setErrorMessage({confirm: "Mật khẩu không khớp"});
            return;
        }

        const body = {
          password: password,
          newpassword: newPassword
        }
        dispatch(openLoading());
        Api.authApi.changepassword(body).then(data => {
          const errorMessage = (data as any).message;
          let typeToast = toastType.error;
          if(!data.status) {
            navigate('/home');
            typeToast = toastType.succes;
          }
          dispatch(showToastMessage({message: errorMessage, type: typeToast}))
        }).catch(() => {
          dispatch(showToastMessage({message: "Có lỗi xảy ra, vui lòng liên hệ bộ phận hỗ trợ", type: toastType.error}))
        }).finally(() => dispatch(closeLoading()));
    }

    return (
        <div className='wrapper-table-content'>
            <Stack className='change-password'>
                <Stack className='change-password-header'>
                    Đổi mật khẩu
                </Stack>
                <Stack className='change-password-content'>
                    <Stack className='form-container'>
                        <TextField
                            label='Mật khẩu hiện tại'
                            value={password}
                            onChange={(e, val) => {
                                setErrorMessage(undefined);
                                setPassword(val || "")
                            }}
                            errorMessage={errorMessage?.password}
                            type='password'
                            canRevealPassword={true}
                        />
                        <TextField
                            label='Mật khẩu mới'
                            value={newPassword}
                            onChange={(e, val) => {
                                setErrorMessage(undefined);
                                setNewPassword(val || "")
                            }}
                            errorMessage={errorMessage?.newPassword}
                            type='password'
                            canRevealPassword={true}
                        />
                        <TextField
                            label='Xác nhận mật khẩu'
                            value={confirm}
                            onChange={(e, val) => {
                                setErrorMessage(undefined);
                                setConfirm(val || "")
                            }}
                            errorMessage={errorMessage?.confirm}
                            type='password'
                            canRevealPassword={true}
                        />
                        <Stack className='footer-button' horizontal tokens={{ childrenGap: 8 }}>
                            <DefaultButton
                                text='Hủy'
                                onClick={() => {
                                    navigate(-1)
                                }}
                            />
                            <PrimaryButton
                                text='Xác nhận'
                                onClick={() => {
                                    handleSubmit();
                                }}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </div>
    )
}

export default PasswordChange;