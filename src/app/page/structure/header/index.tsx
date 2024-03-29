import "./index.scss"
import { IconButton, Stack, TooltipHost } from "@fluentui/react";
import { Avatar, AvatarSize } from "../../../common/Avatar/avatar";
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
          <div className="location">
            <Location/>
          </div>
          <div className="header-icon-group" >
            <TooltipHost
              content={"Process"}
              closeDelay={100}  
            >
              <IconButton className="header-icon" iconProps={{ iconName: 'ConfigurationSolid' }} />
            </TooltipHost>
            <TooltipHost
              content={"Help"}
              closeDelay={100}  
            >
              <IconButton className="header-icon" iconProps={{ iconName: 'HeadsetSolid' }} />
            </TooltipHost>
            <Avatar
                avatar_scr={info?.avatar}
                size={AvatarSize.Large}
                hasCallout={true}
            />
          </div>
        </div>
    );
}


export default UniformHeader;