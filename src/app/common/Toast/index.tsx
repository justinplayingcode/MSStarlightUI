import { IToastProps, Toast } from "./ToastItem";

interface IToastsContainerProps {
  toasts: IToastProps[]
}


const ToastsContainer = ({ toasts }: IToastsContainerProps) => {
  return (
    <div className="toasts-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastsContainer;
