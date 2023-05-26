import { useEffect, useState } from "react";
import { BarChart } from "src/app/common/chart/barChart";

function PatientExaminedChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    setLabels(['January', 'February', 'March', 'April', 'May', 'June', 'July']);
    setValues([500, 400, 560, 400, 300, 450, 700])
  }, [])

  return (  
    <BarChart
      labels={labels} 
      titleChart='Số lượng bệnh nhân khám mỗi ngày' 
      values={values} 
      legend='Bệnh nhân'
    />
  );
}

export default PatientExaminedChart;