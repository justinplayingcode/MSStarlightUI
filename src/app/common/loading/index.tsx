import "./index.scss"

const LoadingCirle = () => {
    return (
        <div id="loadingCirle"> 
            <svg>
                <circle cx="70" cy="70" r="70"></circle>
            </svg>
        </div>
    )
}

const LoadingDot = () => {
    return (
        <div id="loadingDot"> 
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
}

export  { LoadingCirle, LoadingDot };