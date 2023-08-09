import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "src/redux/reducers";
import Api from "api";
import { DoughnutChart } from "src/app/common/ChartComponents/doughnutChart";
import { BarChart } from "src/app/common/ChartComponents/barChart";
import { AreaChart } from "src/app/common/ChartComponents/areaChart";

const total = (arr) => {
    let temp = 0;
    for (let i of arr) {
      temp = temp + i;
    }
    return temp
}
const valuesForDoughnutChart = (data) => {
  data.sort((a, b) => b.total - a.total);
  const remainingTotal = data.slice(9).reduce((sum, item) => sum + item.total, 0);
  return [
    ...data.slice(0, 9),
    {
        departmentName: "Các khoa còn lại",
        total: remainingTotal
    }
];
}

function AdminHome() {
  const dispatch = useDispatch();

  const [labelsOnBoardingChart, setLabelsOnBoardingChart] = useState<string[]>([]);
  const [valuesOnBoardingInChart, setValuesOnBoardingInChart] = useState<number[]>([]);
  const [valuesOnBoardingOutChart, setValuesOnBoardingOutChart] = useState<number[]>([]);
  //
  const [labelsPatientExaminedChart, setLabelsPatientExaminedChart] = useState<string[]>([]);
  const [valuesPatientExaminedChart, setValuesPatientExaminedChart] = useState<number[]>([]);
  //
  const [labelsDoctorManagementChart, setLabelsDoctorManagementChart] = useState<string[]>([]);
  const [valuesDoctorManagementChart, setValuesDoctorManagementChart] = useState<number[]>([]);
  //
  const [labelsPatientManagementChart, setLabelsPatientManagementChart] = useState<string[]>([]);
  const [valuesPatientManagementChart, setValuesPatientManagementChart] = useState<number[]>([]);

  useEffect(() => {
    const DoctorChart = Api.statisticApi.doctorInDepartment();
    const PatientChart = Api.statisticApi.patientInDepartment();
    const historyChart = Api.statisticApi.historieslast7day();
    const onboarding = Api.statisticApi.onboardinginmonth();
    dispatch(openLoading());
    Promise.all([DoctorChart, PatientChart, historyChart, onboarding])
      .then(data => {
        const labels1: string[] = [], values1: number[] = [];
        Array.from(valuesForDoughnutChart(data[0]?.data)).forEach(e => {
          labels1.push((e as any)?.departmentName);
          values1.push((e as any)?.total);
        })
        setLabelsDoctorManagementChart(labels1);
        setValuesDoctorManagementChart(values1);
        //
        const labels2: string[] = [], values2: number[] = [];
        Array.from(valuesForDoughnutChart(data[1]?.data)).forEach(e => {
          labels2.push((e as any)?.departmentName);
          values2.push((e as any)?.total);
        })
        setLabelsPatientManagementChart(labels2);
        setValuesPatientManagementChart(values2);
        //
        const labels3: string[] = [], values3: number[] = [];
        Array.from(data[2]?.data?.reverse()).forEach(e => {
          labels3.push((e as any)?.date);
          values3.push((e as any)?.appointmentCount);
        })
        setLabelsPatientExaminedChart(labels3);
        setValuesPatientExaminedChart(values3);
        //
        const labels4: string[] = [], values41: number[] = [], values42: number[] = [];
        Array.from(data[3]?.data?.reverse()).forEach(e => {
          labels4.push((e as any)?.month);
          values41.push((e as any)?.inCount);
          values42.push((e as any)?.outCount);
        })
        setLabelsOnBoardingChart(labels4);
        setValuesOnBoardingInChart(values41);
        setValuesOnBoardingOutChart(values42);
      })
      .catch()
      .finally(() => dispatch(closeLoading()));
  }, [])

  return (  
    <>
      <div className="chart-container-wrapper chart-container">
        <BarChart
          labels={labelsPatientExaminedChart} 
          titleChart='Số lượng bệnh nhân khám mỗi ngày' 
          values={valuesPatientExaminedChart} 
          legend='Bệnh nhân'
        />
      </div>
      <div className="chart-container-wrapper chart-container">
        <AreaChart 
          labels={labelsOnBoardingChart} 
          titleChart='Bệnh nhân nhập viện mỗi tháng' 
          valuefisrt={valuesOnBoardingInChart}
          valuesecond={valuesOnBoardingOutChart}
          legendfirst='Nội trú'
          legendsecond='Ngoại trú'
        /> 
      </div>
      <div className="chart-container-wrapper chart-container">
        <DoughnutChart
          label={'Số bác sĩ'}
          labels={labelsDoctorManagementChart} 
          titleChart='Số lượng bác sĩ đang công tác tại bệnh viện' 
          values={valuesDoctorManagementChart} 
          legend='Khoa viện'
          textCenter={`${total(valuesDoctorManagementChart)} bác sĩ`}
        />
      </div>
      <div className="chart-container-wrapper chart-container">
      <DoughnutChart
          label={'Số bệnh nhân'}
          labels={labelsPatientManagementChart} 
          titleChart='Số lượng bệnh nhân đang điều trị tại bệnh viện' 
          values={valuesPatientManagementChart} 
          legend='Khoa viện'
          textCenter={`${total(valuesPatientManagementChart)} bệnh nhân`}
        />
      </div>
      </>
  );
}

export default AdminHome;