import { IconButton } from "@fluentui/react";
import "./index.scss";
import Image from "image";
import { useEffect, useRef } from "react";

export interface IToastProps{
    id: number;
    message: string;
    type: any;
}

const toastTypes = {
  success: {
    icon: Image.success,
    progressBarClass: "success",
  },
  warning: {
    icon: Image.warning,
    progressBarClass: "warning",
  },
  info: {
    icon: Image.info,
    progressBarClass: "info",
  },
  error: {
    icon: Image.error,
    progressBarClass: "error",
  },
};

export const Toast = ({ message, type, id }: IToastProps) => {
  const { icon, progressBarClass } = toastTypes[type];

  const timerID = useRef(null);
  // const toast = useToast()

  const handleDismiss = () => {
    // toast.remove(id);
  };

  useEffect(() => {
    timerID.current = setTimeout(() => {
      handleDismiss();
    }, 4000);

    return () => {
      clearTimeout(timerID.current);
    };
  }, []);

  return (
    <div className="toast">
      <img alt='' src={icon} className='toast-icon' />
      <p className="toast-message">{message}</p>
      <IconButton iconProps={{ iconName: 'Cancel' }} title="cancel" ariaLabel="cancel" onClick={handleDismiss} />
      <div className="toast-progress">
        <div className={`toast-progress-bar ${progressBarClass}`}></div>
      </div>
    </div>
  )
}
