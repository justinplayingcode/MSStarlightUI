import { useEffect, useState } from "react";
import { AreaChart } from "src/app/common/chart/areaChart";

function OnBoardingChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);


  useEffect(() => {
    setLabels(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    setValues([500, 400, 560, 400, 300, 450, 700, 800, 1000, 650, 600, 500])
  }, [])

  return ( 
      <AreaChart 
        labels={labels} 
        titleChart='Onborading Patient Per Month' 
        values={values} 
        legend='Patient Total'
      />  
  );
}

export default OnBoardingChart;