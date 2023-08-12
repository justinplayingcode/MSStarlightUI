import { IconButton } from "@fluentui/react";
import "./index.scss";
import Image from "../../../assets/image";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toastType } from "../../../model/enum";
import { RootState } from "../../../redux/store";
import { closeToastMessage } from "../../../redux/reducers";

export interface IToastProps{
    message: string;
    type: any;
    isShow: boolean;
}

const toastTypes: any = {
  [toastType.succes]: {
    icon: Image.success,
    backgroundColor: '#DFF6DD'
  },
  [toastType.warning]: {
    icon: Image.warning,
    backgroundColor: '#FFF4CE'
  },
  [toastType.info]: {
    icon: Image.info,
    backgroundColor: '#bee5ff'
  },
  [toastType.error]: {
    icon: Image.error,
    backgroundColor: '#FDE7E9'
  }
};

export const Toast = () => {
  const { message, type } = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();
  const { icon, backgroundColor } = toastTypes[type];

  const timerID = useRef(null);
  const handleDismiss = () => dispatch(closeToastMessage());
  useEffect(() => {
    (timerID.current as any) = setTimeout(() => {handleDismiss()}, 4000);
    return () => {clearTimeout(timerID.current as any)}}, []);

  return (
    <div className="toast" style={{backgroundColor: backgroundColor}}>
      <img alt='' src={icon} className='toast-icon' />
      <p className="toast-message">{message}</p>
      <IconButton iconProps={{ iconName: 'Cancel' }} title="cancel" ariaLabel="cancel" onClick={handleDismiss} className="toast-cancel" />
    </div>
  )
}
