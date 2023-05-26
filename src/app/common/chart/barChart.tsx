import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IBarChartProps {
  labels: any[];
  values: any[];
  legend: string;
  titleChart: string;
}

export function BarChart({...props}: IBarChartProps) {

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
  };

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.legend,
        data: props.values,
        backgroundColor: '#007FFF',
      }
    ],
  };

  return (
    <div className='chart'>
      <Bar options={options} data={data} />
    </div>
  )
}
