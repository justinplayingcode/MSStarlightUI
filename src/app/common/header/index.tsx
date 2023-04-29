import React from "react";
import "./index.scss"
import { Breadcrumb, IBreadcrumbItem, Icon, IconButton, Stack, Text } from "@fluentui/react";
import { IconComponent } from "../Icon";
import { Avatar, AvatarSize } from "../Avatar/avatar";
import { pageConstant } from "model";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { Location } from "../layout/location";

interface UniformHeaderProps {
    page?: number
}

const UniformHeader = (props: UniformHeaderProps) => {
    const { avatar, info } = useSelector((state: RootState) => state.user)

    return (
        <div id="uniform-header">
            <Stack className="header-info">
                <Stack className="header-text">
                    <Text className="hospital-name">Bệnh viện huyện XXX </Text>
                </Stack>
                <Stack className="header-icon-group" >
                    <IconButton className="header-icon" iconProps={{ iconName: 'Ringer' }} />
                    <IconButton className="header-icon" iconProps={{ iconName: 'Help' }} />
                    <Avatar
                        avatar_scr={avatar}
                        size={AvatarSize.Large}
                        hasCallout={true}
                    />
                </Stack>
            </Stack>
            <Location/>
        </div>
    );
}


export default UniformHeader;