import { useState } from "react";
import "./index.scss"
import UniformListPost from "src/app/common/List";

const NewsPost = () => {

  return(
    <div className='news-content'>
      <UniformListPost/>
    </div>  
  )
}

export default NewsPost;