import './index.scss'

const LoadingPanel = () => {
  return (
      <div id="loadingDotPanel"> 
          <p>Đang tải...</p>
          <div className='loading-panel'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
      </div>
  )
}

export default LoadingPanel