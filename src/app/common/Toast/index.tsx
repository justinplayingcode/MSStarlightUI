import { IconButton } from "@fluentui/react";
import "./index.scss";
import Image from "image";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useDispatch } from "react-redux";
import { closeToastMessage } from "src/redux/reducers";
import { toastType } from "../../../model/enum";

export interface IToastProps{
    message: string;
    type: any;
    isShow: boolean;
}

const toastTypes = {
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
    timerID.current = setTimeout(() => {handleDismiss()}, 4000);
    return () => {clearTimeout(timerID.current)}}, []);

  return (
    <div className="toast" style={{backgroundColor: backgroundColor}}>
      <img alt='' src={icon} className='toast-icon' />
      <p className="toast-message">{message}</p>
      <IconButton iconProps={{ iconName: 'Cancel' }} title="cancel" ariaLabel="cancel" onClick={handleDismiss} className="toast-cancel" />
    </div>
  )
}
