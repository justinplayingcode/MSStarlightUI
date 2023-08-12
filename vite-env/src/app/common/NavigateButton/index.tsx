import { useNavigate } from "react-router-dom";
import "./index.scss"
import { DefaultButton } from "@fluentui/react";
import { tooltipPlainText } from "../../../utils/utils";

interface INavigateButtonProps {
  icon: string;
  navigateTo: string;
  title: string;
  description?: string;
}


const NavigateButton = ({...props}: INavigateButtonProps) => {
  const navigate = useNavigate()

  return (
    <DefaultButton 
      className="navigateButton" 
      onClick={() => navigate(props.navigateTo)}
    >
      <img className="navigateButton-icon" alt={props.title} src={props.icon}/>
      <div className="navigateButton-title">
        {props.title}
        <div className="navigateButton-title-sub">{tooltipPlainText(props.description!)}</div>
      </div>
    </DefaultButton>
  )
}

export default NavigateButton