import { useEffect, useState } from "react";
import { AreaChart } from "src/app/common/Chart/areaChart";

function OnBoardingChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [valuefisrt, setValuesfisrt] = useState<number[]>([]);
  const [valuesecond, setValuesecond] = useState<number[]>([]);


  useEffect(() => {
    setLabels(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    setValuesfisrt([500, 400, 560, 400, 300, 450, 700, 800, 1000, 650, 600, 500])
    setValuesecond([200, 600, 360, 300, 100, 550, 400, 500, 2000, 250, 500, 800])
  }, [])

  return ( 
      <AreaChart 
        labels={labels} 
        titleChart='Bệnh nhân nhập viện mỗi tháng' 
        valuefisrt={valuefisrt}
        valuesecond={valuesecond}
        legendfirst='Nội trú'
        legendsecond='Ngoại trú'
      />  
  );
}

export default OnBoardingChart;