import * as React from "react";
import "./index.scss";
import { IconButton, Label, PrimaryButton, Stack, TextField } from "@fluentui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openLoading, closeLoading, setRole, setUsername } from "src/redux/reducers";
import Api from "src/api";

import Image from "image"
import { ApiStatus } from "model";
import image from "image";
import { LoadingCirle } from "src/app/common/loading";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

export const Login: React.FunctionComponent = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const loading = useSelector<RootState>(state => state.loading.isLoading)

    const dispatch = useDispatch();
    const history = useNavigate()

    const clickSave = async () => {
        if(!userName || !password){
            setErrorMessage("Please enter username/ password");
            return;
        }
        const reqbody = {
            username: userName,
            password: password
        }
        dispatch(openLoading());
        Api.authApi.login(reqbody).then(data => {
            const {accessToken, refreshToken, role, username } = data.data.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("username", username);
            dispatch(setRole(role));
            dispatch(setUsername(username));
            history("/");
        }).catch(err => {
            const { message } = err.response.data;
            setErrorMessage(message)
        }).finally(() => dispatch(closeLoading()))
    }

    return (
        <>
            {loading ? <LoadingCirle /> : <React.Fragment />}
            <Stack
                className="login-container"
                horizontalAlign="center"
                verticalAlign="center"
            >
                <Stack className="login-form-header">
                    <Stack className="form-header-content">
                        <Stack className="img-div">
                            <img alt='' src={image.logo}/>
                            <Stack className="header-text">Bệnh viện huyện XXX</Stack>
                        </Stack>
                        <IconButton className="header-icon" iconProps={{ iconName: 'Help' }} />
                    </Stack>
                    <Stack className="header-ribbon">

                    </Stack>
                </Stack>
                <Stack className="login-form-container">
                    <Stack className="form-container">
                        <Stack horizontalAlign="center" className="logo" >
                            Login
                        </Stack>
                        <TextField
                            label="Tên đăng nhập"
                            value={userName}
                            onChange={(e, val) => {
                                setErrorMessage("")
                                if (val!) {
                                    const name = val!.trim();
                                    setUserName(name);
                                }
                                else setUserName("")
                            }}
                        />
                        <TextField
                            label="Mật khẩu"
                            type="password"
                            canRevealPassword={true}
                            value={password}
                            onChange={(e, val) => {
                                setErrorMessage("")
                                if (val!) {
                                    if (val.length < 6) {
                                        setErrorMessage('Mật khẩu có độ dài tối thiểu 6 kí tự')
                                    }
                                    const pwd = val!.trim();
                                    setPassword(pwd);
                                } else setPassword("");
                            }}
                        />
                        <Stack className="error-message">{errorMessage}</Stack>
                        <PrimaryButton className="log-in-btn" text="Đăng nhập" onClick={clickSave} />
                        <Stack horizontalAlign="end" >
                            {/* display link to forgot password panel */}
                            <Link to={""} style={{ textDecoration: "none", color: 'rgb(0, 120, 212)'}}>Quên mật khẩu?</Link>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </>

    )
}
