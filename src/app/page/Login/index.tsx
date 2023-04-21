import * as React from "react";
import "./index.scss";
import { PrimaryButton, Stack } from "@fluentui/react";
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
                <Stack horizontalAlign="center" >
                    <Avatar
                        avatar_scr="https://res.cloudinary.com/dipiauw0v/image/upload/v1681015649/DATN/avatar_dexs0y.png"
                        size={AvatarSize.SuperLarge}
                    />
                    <LabelComponent content={"Chào Mừng"} />
                </Stack>
                <TextFieldComponent
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
                <TextFieldComponent
                    label="Mật khẩu"
                    type="password"
                    canRevealPassword={true}
                    value={password}
                    onChange={(e, val) => {
                        setErrorMessage("")
                        if (val!) {
                            const pwd = val!.trim();
                            setPassword(pwd);
                        } else setPassword("");
                    }}
                />
                <Stack className="error-message">{errorMessage}</Stack>
                <PrimaryButton text="Đăng nhập" onClick={clickSave}/>
                <Stack horizontalAlign="end" >
                    {/* display link to forgot password panel */}
                    <Link to={""} style={{ textDecoration: "none", color: "rgb(0, 120, 212)" }}>Quên mật khẩu?</Link>
                </Stack>
            </Stack>
        </Stack>

    )
}
