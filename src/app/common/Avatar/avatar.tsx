import * as React from "react";
import { Callout, DefaultButton, Stack, mergeStyleSets } from "@fluentui/react";
import './index.scss'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "src/redux/reducers";
interface IAvatarProps {
    avatar_scr: string;
    size?: AvatarSize;
    hasCallout?: boolean;
    isRound?: boolean
}

export enum AvatarSize {
    Small,
    Medium,
    Large,
    SuperLarge
}

export const getAvatarSize = (size: AvatarSize | undefined) => {
    switch (size) {
        case AvatarSize.SuperLarge:
            return "150px"
        case AvatarSize.Large:
            return "40px";
        case AvatarSize.Medium:
            return "32px";
        case AvatarSize.Small:
            return "24px";
        default:
            return "";
    }
}

export const Avatar = (props: IAvatarProps) => {
    const [isCalloutVisible, setIsCalloutVisible] = React.useState<boolean>(false);
    const [isHover, setIsHover] = useState(false);
    const dispatch = useDispatch();


   const handleMouseEnter = () => {
      setIsHover(true);
   };

   const handleMouseLeave = () => {
      setIsHover(false);
   };

    const defaultSize = "32px";
    const defaultAvatar = 'https://res.cloudinary.com/dipiauw0v/image/upload/v1682100699/DATN/unisex_avatar.jpg'
    const avatarStyle = getAvatarSize(props.size) || defaultSize;
    const defaultHasCallout = props.hasCallout || false;

    const style: React.CSSProperties = {
        backgroundImage: `url(${props.avatar_scr !== '' ? props.avatar_scr : defaultAvatar})`,
        borderRadius: props?.isRound ? '50%' : '0',
        width: avatarStyle,
        height: avatarStyle,
        cursor: isHover && props.hasCallout ? 'pointer': 'auto'
    }

    const handleLogOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(userLogout());
    }

    return (
        <Stack className="avatar-container">
            <Stack
                className="avatar"
                id={'callout-button'}
                onClick={() => setIsCalloutVisible(!isCalloutVisible)}
                style={style}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            > 
            </Stack>
            {isCalloutVisible && defaultHasCallout && (
                <Callout
                    className={'callout'}
                    ariaLabelledBy={'callout-label'}
                    ariaDescribedBy={'callout-description'}
                    role="dialog"
                    gapSpace={8}
                    target={`#callout-button`}
                    onDismiss={() => setIsCalloutVisible(!isCalloutVisible)}
                >
                    <DefaultButton text="Thông tin tài khoản" onClick={(e) => alert('Thông tin tài khoản')} />
                    <DefaultButton text="Đổi mật khẩu" onClick={(e) => alert('Đổi mật khẩu')} />
                    <DefaultButton text="Đăng xuất" onClick={handleLogOut} />
                </Callout>
            )}
        </Stack>
    );
};

