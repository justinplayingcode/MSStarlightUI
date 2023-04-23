import * as React from "react";
import "./index.scss";
import { Label, PrimaryButton, Stack, TextField } from "@fluentui/react";
import { Avatar, LabelComponent, TextFieldComponent } from "src/app/common";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AvatarSize } from "src/app/common/Avatar/avatar";

export const Login: React.FunctionComponent = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const clickSave = () => {
        if(!userName || !password){
            setErrorMessage("Please enter username/ password");
            return;
        }
        //wrong pwd or username check with api useEffect

    }

    React.useEffect(() => {

    },[])

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
