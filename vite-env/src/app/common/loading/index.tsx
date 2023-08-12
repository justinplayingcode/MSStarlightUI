import "./index.scss"

const LoadingLogin = () => {
    return (
        <div id="loadingLogin"> 
            <span className="loader"></span>
        </div>
    )
}

const LoadingDot = () => {
    return (
        <div id="loadingDot">
          <div className="content" >
            <div className="text">Đang tải... </div>
            <div className="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
    )
}

const LoadingInComing = () => {
  return (
    <div id="loadingincoming">
      <div className="content">
        <div className="content-getdata-text" >Chúng tôi đang tiến hành đăng nhập cho bạn...</div>
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export  { LoadingLogin, LoadingDot, LoadingInComing };