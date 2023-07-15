import * as React from "react";
import { Callout, DefaultButton, Icon, IconButton, Persona, PersonaInitialsColor, PersonaSize, Stack } from "@fluentui/react";
import './index.scss'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "src/redux/reducers";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/redux/store";
import { Convert } from "utils";
interface IAvatarProps {
    avatar_scr: string;
    size?: AvatarSize;
    hasCallout?: boolean;
    isRound?: boolean;
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
    const { info, role } = useSelector((state: RootState) => state.user)
    const [isCalloutVisible, setIsCalloutVisible] = React.useState<boolean>(false);
    const [isHover, setIsHover] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();


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

    const charater = info?.fullname.split(" ");
    const mainCharater = charater.pop().split("")[0].toUpperCase();
    const subCharater = charater.pop().split("")[0].toUpperCase();

    const style: React.CSSProperties = {
        backgroundImage: props.hasCallout ? "unset" : `url(${props.avatar_scr !== '' ? props.avatar_scr : defaultAvatar})`,
        borderRadius: props?.isRound ? '50%' : '6px',
        width: avatarStyle,
        height: avatarStyle,
        cursor: isHover && props.hasCallout ? 'pointer': 'auto',
        backgroundColor: props.hasCallout ? "#004E8C" : 'unset',
        justifyContent: "center",
        alignItems: "center"
    }

    const handleLogOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(userLogout());
    }

    const handleChangePW = () => {
      navigate('/home/change-password')
      setIsCalloutVisible(false);
    }

    const renderCallOut = ():JSX.Element => {
      return <div className="avatar-callout">
        <DefaultButton className="buttonAvatar" onClick={(e) => {setIsCalloutVisible(false); navigate('/home/profile')}}>
          <Persona
            text={info?.fullname}
            secondaryText={Convert.getAccountRoleName(role)}
            imageInitials={`${subCharater}${mainCharater}`}
            initialsColor={PersonaInitialsColor.darkBlue} 
            size={PersonaSize.size40} 
          />
        </DefaultButton>
        <DefaultButton className="buttonAction" onClick={handleChangePW}>
          <span>Đổi mật khẩu</span>
          <Icon iconName='Permissions' />
        </DefaultButton>
        <DefaultButton className="buttonAction" onClick={handleLogOut}>
          <span>Đăng xuất</span>
          <Icon iconName='SignOut' />
          </DefaultButton>
      </div>
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
            >{props.hasCallout && <div style={{fontSize: "17px", color: "#fff"}}>{subCharater}{mainCharater}</div>}
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
                >{renderCallOut()}</Callout>
            )}
        </Stack>
    );
};

