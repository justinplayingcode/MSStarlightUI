import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface IAreaChartProps {
  labels: any[];
  valuefisrt: any[];
  valuesecond: any[];
  legendfirst: string;
  legendsecond: string;
  titleChart: string;
}

export function AreaChart({...props}: IAreaChartProps) {

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: props.titleChart,
      },
    },
  }

  const data = {
    labels: props.labels, 
    datasets: [
      {
        fill: true,
        label: props.legendfirst,
        data: props.valuefisrt,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        fill: true,
        label: props.legendsecond,
        data: props.valuesecond,
        borderColor: '#FF6384',
        backgroundColor: '#FFB1C1',
      },
    ],
  }

  return (
    <div className='chart'>
      <Line 
        options={options} 
        data={data} />
    </div>
  )
}
