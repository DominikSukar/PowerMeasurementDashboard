import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useState, useEffect } from 'react';

import {
  Chart as ChartJS,
  ChartData,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Todays consumption over time',
    },
  },
};

const Chart = () => {
    const [data, setChartData] = useState<ChartData<"line", any, any>|null>(null)
    useEffect(() => {
        const get_data = async () => {
            axios.get('http://localhost:8000/get_todays_consumption/')
           .then((response) => {
                console.log(response.data);
                let labels = (response.data as { date: string }[]).map(item => item.date);
                let values: number[] = (response.data as {value: string}[]).map(item => Number(item.value));
                let data: ChartData<"line", any, any> = {
                  labels: labels,
                  datasets: [
                    {
                      label: "Data",
                      data: values,
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                  ]
                };
                console.log("Data:", data)
                setChartData(data);
              })
           .catch((error) => {
                console.log(error);
              });
          }
        get_data()
        const interval = setInterval(get_data, 10000);
        return () => clearInterval(interval);
      }, [])

  return (
    <>
        {data ? (
        <div className='flex justify-center content-center flex-wrap border rounded-lg p-5 m-10 shadow-lg bg-white'>
            <div className='flex w-full h-152 p-10'>   
                <Line data={data} options={options} />
            </div> 
        </div>
        ): <></>}
    </>
  )
}

export default Chart