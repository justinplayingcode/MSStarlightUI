import * as React from "react";
import "./index.scss";
import { Label, PrimaryButton, Stack, TextField } from "@fluentui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openLoading, closeLoading, setRole, setUserId } from "src/redux/reducers";
import authApi from "src/api/auth";
import { ApiStatus } from "model";

export const Login: React.FunctionComponent = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const dispatch = useDispatch();
    const history = useNavigate()

    const clickSave = async () => {
        if(!userName || !password){
            setErrorMessage("Please enter username/ password");
            return;
        }
        //wrong pwd or username check with api useEffect
        const reqbody = {
            username: userName,
            password: password
        }
        dispatch(openLoading());
        authApi.login(reqbody).then(data => {
            const {accessToken, refreshToken, role, userId } = data.data.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            dispatch(setRole(role));
            dispatch(setUserId(userId));
            history("/");
        }).catch(err => {
            const { message } = err.response.data;
            setErrorMessage(message)
        }).finally(() => dispatch(closeLoading()))
    }

    return (
        <Stack
            className="login-container"
            horizontalAlign="center"
            verticalAlign="center"
        >
            <Stack className="login-form-container">
                <Stack className="form-container">
                    <Stack horizontalAlign="center" >
                        <Label className="welcome-text">Chào Mừng</Label>
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
                        <Link to={""} style={{ textDecoration: "none", color: "#fff" }}>Quên mật khẩu?</Link>
                    </Stack>
                </Stack>
                <img className="form-image" alt="" src="https://res.cloudinary.com/dipiauw0v/image/upload/v1682179593/DATN/welcome-logo.png"/>
            </Stack>
        </Stack>

    )
}
