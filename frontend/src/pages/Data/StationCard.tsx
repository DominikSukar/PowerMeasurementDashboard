import { useState } from 'react';
import axios from 'axios';
import Chart from './Chart';
import { ChartData } from 'chart.js';

import {getCurrentDateTimeString, getTodayDateTimeString} from '../../scripts/dates'

interface Measurement {
  id: number;
  date: Date;
  measurement: string;
  circuit_id: string;
}

const StationCard = ({powerStation, measurements}: {powerStation: string, measurements: Measurement[]}) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [chartData, setChartData] = useState<ChartData<"line", any, any>|null>(null);
  
    function get_circuit_data(powerStation: string, circuit: string) {
      const date_to = getCurrentDateTimeString();
      const date_from = getTodayDateTimeString();
      axios.get('http://localhost:8000/get_circuit_data/?powerstation=' + powerStation + '&circuit=' + circuit + 
      '&date_from=' + date_from + '&date_to=' + date_to)
     .then((response) => {
          console.log(response.data);
          setIsOpen(true);
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
  
    return (
      <div>
        <Chart modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} data={chartData}></Chart>
        <div className="border rounded-lg shadow-md p-4 m-4 bg-white">
          <div className='font-semibold'>{powerStation}</div>
          <br></br>
          <div className="grid grid-cols-2" style={{ gridAutoFlow: 'row' }}>
            {measurements.map((measurement, index) => (
              <button type="button" key={index} className='p-2 m-1 border rounded-lg flex items-center justify-between' 
              onClick={()=>get_circuit_data(powerStation, measurement.circuit_id)}>
                <div className='text-xs'>{measurement.circuit_id}</div>
                <div className='text-xs'>{measurement.measurement}W</div>
              </button>
            ))}
          </div> 
        </div>
      </div>
    )
  }

export default StationCard;