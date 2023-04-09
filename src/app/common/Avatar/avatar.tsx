import * as React from "react";
import { Stack } from "@fluentui/react";
interface IAvatarProps {
	avatar_scr: string;
	size?: AvatarSize;
}

export enum AvatarSize{
    Small,
    Medium,
    Large,
    SuperLarge
}

export const getAvatarSize = (size: AvatarSize | undefined) => {
    switch(size){
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
	const defaultSize = "32px";
	const avatarStyle = getAvatarSize(props.size) || defaultSize;
    
    const style: React.CSSProperties = {
        backgroundImage: `url(${props.avatar_scr})`,

        width: avatarStyle,
        height: avatarStyle,

        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        
        borderRadius: '50%',
    }

	return (
		<Stack className="avatar-container" style={style}> </Stack>
	);
};
