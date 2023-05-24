import { useEffect, useState } from "react";
import {DoughnutChart} from "src/app/common/chart/doughnutChart";

function DoctorManagementChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [sum, setSum] = useState<number>(0);
  const total = (arr) => {
    let temp = 0;
    for (let i of arr) {
      temp = temp + i;
    }
    return temp
  }

  useEffect(() => {
    setLabels(['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']);
    setValues([12, 19, 3, 5, 2, 3]);
  }, [])

  useEffect(() => {
    setSum(total(values));
  }, [values])



  return ( 
    <>
      <DoughnutChart
        label={'# of Votes'}
        labels={labels} 
        titleChart='Số lượng bác sĩ đang làm việc' 
        values={values} 
        legend='Khoa viện'
        textCenter={`${sum} bác sĩ`}
      />
    </>
  );
}

export default DoctorManagementChart;