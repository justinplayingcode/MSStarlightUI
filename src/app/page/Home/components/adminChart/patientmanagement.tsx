import { useEffect, useState } from "react";
import {DoughnutChart} from "src/app/common/chart/doughnutChart";

function PatientManagementChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  const total = () => {
    return values.reduce((sum, value) => sum + value, 0) 
  }

  useEffect(() => {
    setLabels(['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']);
    setValues([12, 19, 3, 5, 2, 3]);
  }, []);


  return ( 
    <>
      <DoughnutChart
        label={'# of Votes'}
        labels={labels} 
        titleChart='Số lượng bệnh nhân đang điều trị tại bệnh viện' 
        values={values}
        legend='Khoa viện'
        textCenter={`${total()} bệnh nhân`} // khong hieu sao khong tinh duoc total =)))
      />
    </>
  );
}

export default PatientManagementChart;