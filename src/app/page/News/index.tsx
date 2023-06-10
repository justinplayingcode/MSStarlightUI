import { PrimaryButton } from "@fluentui/react";
import { useState } from "react";
import Stepper from "src/app/common/stepper";

const NewsPost = () => {
  // const labelArray = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']
  // const [currentStep, updateCurrentStep] = useState(1);

  // function updateStep(step) {
  //   updateCurrentStep(step);
  // }


  return(
    <div>
      <Stepper/>
    </div>  
  )
}

export default NewsPost;