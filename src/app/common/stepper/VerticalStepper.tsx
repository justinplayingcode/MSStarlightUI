import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import "./index.scss"

interface IVerticalLinearStepperProps {
  steps: any[]
  handleNextAction?: () => void;
  handleSubmit: () => void;
  handleReset?: () => void;
}

export default function VerticalLinearStepper({...props}: IVerticalLinearStepperProps) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    !!props.handleNextAction && props.handleNextAction();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    !!props.handleReset && props.handleReset();
  };

  return (
    <div className='stepper-container'>
      <Box sx={{ maxWidth: "100%" }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {props.steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                    <Typography variant="caption">{`Bước ${index+1}`}</Typography>
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.content}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      disabled={step.disableNextStep}
                    >
                      {index === props.steps.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Quay lại
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === props.steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Tất cả các bước đã hoàn thành</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Đặt lại
            </Button>
            <Button variant="contained" onClick={props.handleSubmit} sx={{ mt: 1, mr: 1 }}>Lưu</Button>
          </Paper>
        )}
      </Box>
    </div>
  );
}