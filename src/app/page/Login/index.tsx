import * as React from "react";
import "./index.scss";
import { DefaultButton, IconButton, PrimaryButton, Stack, TextField } from "@fluentui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openLoading, closeLoading, setRole, setUsername } from "src/redux/reducers";
import Api from "src/api";
import image from "image";
import { LoadingCirle } from "src/app/common/loading";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

export const Login: React.FunctionComponent = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const loading = useSelector<RootState>(state => state.loading.isLoading)
    const buttonRef = React.useRef(null);
    const dispatch = useDispatch();
    const history = useNavigate()

    const clickSave = async () => {
        if(!userName || !password){
            setErrorMessage("Hãy nhập tên đăng nhập/mật khẩu");
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

    const handleKeyDown = (e) => {
      if(e.key === 'Enter') {
        buttonRef.current.click();
      }
    }

    return (
        <>
            {loading ? <LoadingCirle /> : <React.Fragment />}
            <Stack
                className="login-container"
                horizontalAlign="center"
                verticalAlign="center"
                onKeyDown={handleKeyDown}
            >
                {/* <Stack className="login-form-header">
                    <Stack className="form-header-content">
                        <Stack className="img-div">
                            <img alt='' src={image.logo}/>
                            <Stack className="header-text">Bệnh viện huyện XXX</Stack>
                        </Stack>
                        <IconButton className="header-icon" iconProps={{ iconName: 'Help' }} />
                    </Stack>
                    <Stack className="header-ribbon">

                    </Stack>
                </Stack> */}
                <Stack className="login-form-container">
                    <Stack className="form-container">
                        {/* <img alt='' src={image.logo}/> */}
                        <Stack horizontalAlign="center" className="logo" >
                            Đăng nhập
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
                        <button className="log-in-btn" onClick={clickSave} ref={buttonRef}>Đăng nhập</button>
                        <Stack horizontalAlign="end" >
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </>

    )
}
