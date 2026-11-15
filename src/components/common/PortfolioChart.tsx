import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useCrypto } from '../../context/crypto-context';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function PortfolioChart() {
  const { assets } = useCrypto()
  const ChartData = {
    labels: assets.map(a => a.name),
    datasets: [
      {
        label: '$',
        data: assets.map(a => a.totalAmount),
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgb(255, 105, 64)',
          'rgb(70, 255, 64)',
          'rgb(101, 193, 250)',
          'rgb(255, 64, 64)',
          'rgb(121, 64, 255)',
          'rgb(44, 59, 88)',
          'rgb(204, 255, 64)',
          'rgb(255, 64, 236)',
          'rgb(43, 38, 34)',
          'rgb(111, 111, 111)',
          'rgb(64, 255, 242)',
          'rgb(252, 255, 177)',
          'rgb(146, 146, 238)',
          'rgb(6, 83, 27)',
        ],
      },
    ],
  };
  return <div style={{ display: 'flex', marginBottom: '2rem', justifyContent: 'center', maxHeight: 400 }}>
    <Pie data={ChartData} />
  </div>
}