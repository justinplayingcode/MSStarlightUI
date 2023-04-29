import * as React from 'react'

export interface IToastProps{
    id: number;
    title: string;
    description: string;
    backgroundColor: string;
}

interface ToastProps{
    toastList: IToastProps[]
}

export const Toast = (props: ToastProps) => {
    return(
        <>
            {props.toastList.map((toast, index) => {
                <div
                    key={index}
                    style={{backgroundColor: toast.backgroundColor}}
                >
                    <button>X</button>
                    <div>
                        <p>{toast.title}</p>
                        <p>{toast.description}</p>
                    </div>
                </div>
            })}
        </>
    )
}
