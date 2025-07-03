import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

function TemperatureChart() {
  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const [unit, setUnit] = useState('');
  const [latestTemp, setLatestTemp] = useState(null);

  const chartRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(process.env.REACT_APP_API_URL)
        .then(res => {
          const { temperature, unit, timestamp } = res.data;
          const time = new Date(timestamp).toLocaleTimeString();

          setUnit(unit);
          setLatestTemp(temperature);
          setLabels(prev => [...prev.slice(-9), time]);
          setDataPoints(prev => [...prev.slice(-9), temperature]);
        })
        .catch(err => console.error('Error fetching temperature:', err));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: `Temperature (${unit})`,
        data: dataPoints,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Real-Time Temperature Data',
        font: { size: 18 }
      }
    }
  };

  return (
    <div style={{ height: "400px", width: "100%", padding: '1rem' }}>
      <Line ref={chartRef} data={chartData} options={chartOptions} />
      <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "18px" }}>
        🌡️ Latest Temperature: <strong>{latestTemp} {unit}</strong>
      </div>
    </div>
  );
}

export default TemperatureChart;
