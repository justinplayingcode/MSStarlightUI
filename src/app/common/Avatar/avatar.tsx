import * as React from "react";
import { Callout, DefaultButton, Stack, mergeStyleSets } from "@fluentui/react";
import './index.scss'
interface IAvatarProps {
    avatar_scr: string;
    size?: AvatarSize;
    hasCallout?: boolean
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
            return "100px"
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

    const defaultSize = "32px";
    const avatarStyle = getAvatarSize(props.size) || defaultSize;
    const defaultHasCallout = props.hasCallout || false

    const style: React.CSSProperties = {
        backgroundImage: `url(${props.avatar_scr})`,

        width: avatarStyle,
        height: avatarStyle,
    }

    const styles = mergeStyleSets({
        button: {
          width: 130,
        },
        callout: {
          
        },
        title: {
          marginBottom: 12,
        },
        link: {
          display: 'block',
          marginTop: 20,
        },
      });

    return (
        <Stack className="avatar-container">
            <Stack
                className="avatar"
                id={'callout-button'}
                onClick={() => setIsCalloutVisible(!isCalloutVisible)}
                style={style}
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
                    <DefaultButton text="Đăng xuất" onClick={(e) => alert('Đăng xuất')} />
                </Callout>
            )}
        </Stack>
    );
};

