import React from "react";
import "./index.scss"
import { Breadcrumb, IBreadcrumbItem, Icon, IconButton, SearchBox, Stack, Text } from "@fluentui/react";
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
    const { info } = useSelector((state: RootState) => state.user)

    return (
        <div id="uniform-header">
            <Stack className="header-info">
                <Stack className="header-text">
                    {/* <Text className="hospital-name">Bệnh viện huyện XXX </Text> */}
                    <SearchBox placeholder="Search" onSearch={newValue => console.log('value is ' + newValue)} />
                </Stack>
                <Stack className="header-icon-group" >
                    <IconButton className="header-icon" iconProps={{ iconName: 'Ringer' }} />
                    <IconButton className="header-icon" iconProps={{ iconName: 'Help' }} />
                    <Avatar
                        avatar_scr={info?.avatar}
                        size={AvatarSize.Large}
                        hasCallout={true}
                    />
                </Stack>
            </Stack>
        </div>
    );
}


export default UniformHeader;