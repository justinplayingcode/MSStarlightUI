import { Link } from "@fluentui/react";
import { useNavigate } from "react-router-dom";

interface ILinkButtonProps {
  children?: JSX.Element | string | React.ReactNode;
  onClick?: () => void;
  className?: string;
  navigate?: string;
  style?: React.CSSProperties;
}

export const LinkButton = ({...props}: ILinkButtonProps) => {
  const navigate = useNavigate();
  return (
        <Link 
          style={props?.style}
          onClick={() => {
            if(props?.navigate) {
              navigate(`${props?.navigate}`)
            } else {
              props.onClick?.();
            }
          }} 
          underline 
          className={props.className}
        >
          {props.children}
        </Link>
  );
};