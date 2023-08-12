import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ILineChartProps {
  title: string;
  data: {value: number[]; labels: string; borderColor: string; backgroundColor: string}[],
  labels: string[]; 
}

export function LineChart({...props}: ILineChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  const datasets = (props.data || []).map(e => ({
    label: e.labels,
    data: e.value,
    borderColor: e.borderColor,
    backgroundColor: e.backgroundColor
  }));
  
  const data: ChartData<"line", number, unknown> = {
    labels: props.labels as any,
    datasets: datasets as any
  };
  return <div className='chart'><Line options={options} data={data} /></div>;
}