import { useState, useEffect } from 'react';
import axios from 'axios';

interface Measurement {
  id: number;
  date: Date;
  measurement: string;
  circuit_id: string;
}

interface PowerStation {
  [powerStationName: string]: Measurement[];
}

const StationCard = ({powerStation, measurements}: {powerStation: string, measurements: Measurement}) => {
  return (
    <div className="border rounded-lg shadow-md p-4 m-4 bg-white">
      <div className='font-semibold'>{powerStation}</div>
      <br></br>
      <div className="grid grid-cols-2" style={{ gridAutoFlow: 'row' }}>
        {measurements.map((measurement, index) => (
          <button type="button" key={index} className='p-2 m-1 border rounded-lg flex items-center justify-between'>
            <div className='text-xs'>{measurement.circuit_id}</div>
            <div className='text-xs'>{measurement.measurement}W</div>
          </button>
        ))}
      </div> 
    </div>
  )
}

const Measurements = () => {
  const [data, setData] = useState<PowerStation>([])

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://localhost:8000/get_latest_data/')
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
    }, 1000);
    return () => clearInterval(interval);

  }, [])
  

  return (
    <div>
      <div className='grid grid-cols-5'>
        {Object.entries(data).map(([powerStation, measurements]) => (
            <StationCard powerStation={powerStation} measurements={measurements}></StationCard>
        ))}
      </div>
    </div>
  )
}

export default Measurements