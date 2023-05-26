import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import "./index.scss"
import { Convert } from 'utils';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IDoughnutChartProps {
  labels: any[];
  label: string;
  values: any[];
  legend: string;
  titleChart: string;
  textCenter: string;
}

export function DoughnutChart({...props}: IDoughnutChartProps) {

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // const colorss = Array.from({ length: props.values.length }, () => getRandomColor());
  const coiors = Convert.colorDonutChart.slice(0, props.values.length);

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.label,
        data: props.values,
        backgroundColor: coiors,
        borderColor: coiors,
        borderWidth: 1,
      },
    ]
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        title: {
          display: true,
          text: props.legend
        }
      },
      title: {
        display: true,
        text: props.titleChart,
      },
    },
  }

  const textCenter = {
    id: 'textCenter',
    beforeDraw: function(chart) {
      const ctx = chart.ctx, width = chart.width;
          ctx.restore();
          ctx.font = `16px sans-serif`;
          ctx.textBaseline = "middle";
          ctx.textAlign = 'center';
          const textX = chart.getDatasetMeta(0).data[0]?.x,
          textY = chart.getDatasetMeta(0).data[0]?.y;
          ctx.fillText(props.textCenter, textX, textY);
          ctx.save();
    } 
  }

  return (
    <div className='chart doughnutchart'>
      <Doughnut data={data} options={options} plugins={[textCenter]} />
    </div>
  )

}
