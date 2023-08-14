import * as React from "react";
import "./index.scss";
import { Stack, TextField } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openLoading, closeLoading, setRole, setUsername } from "src/redux/reducers";
import Api from "src/api";
import { LoadingLogin } from "src/app/common/loading";
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
            history("/home");
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
            {loading ? <LoadingLogin /> : <React.Fragment />}
            <Stack
                className="login-container"
                horizontalAlign="center"
                verticalAlign="center"
                onKeyDown={handleKeyDown}
                style={{background: "url(https://res.cloudinary.com/justinpham311/image/upload/v1689872100/benhvien/2_ax63na.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}
            >
                <div id="overlay-login"></div>
                <div id="header-login">
                  <p>Starlight Hospital Management</p>
                  <p>Hệ thống quản lý khám chữa bệnh bệnh viện Starlight</p>
                </div>
                <Stack className="login-form-container">
                    <Stack className="form-container">
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
