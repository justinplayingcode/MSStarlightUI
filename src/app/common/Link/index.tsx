import { Link } from "@fluentui/react";

interface ILinkButtonProps {
  children?: JSX.Element | string | React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const LinkButton = ({...props}: ILinkButtonProps) => {
  return (
        <Link onClick={props.onClick} underline className={props.className}>
          {props.children}
        </Link>
  );
};