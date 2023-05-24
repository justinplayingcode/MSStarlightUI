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
  values: any[];
  legend: string;
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
        label: props.legend,
        data: props.values,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
