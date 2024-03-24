import { useState, useEffect } from 'react';
import axios from 'axios';

import StationCard from './StationCard';

interface Measurement {
  id: number;
  date: Date;
  measurement: string;
  circuit_id: string;
}

interface PowerStation {
  [powerStationName: string]: Measurement[];
}

const Measurements = () => {
  const [data, setData] = useState<PowerStation|null>(null)

  useEffect(() => {
    const fetchData = async () => {
    axios.get('http://localhost:8000/get_latest_data/')
    .then(function (response) {
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [])
  

  return (
    <div>
      <div className='grid grid-cols-5'>
        {data && Object.entries(data).map(([powerStation, measurements]) => (
            <StationCard powerStation={powerStation} measurements={measurements}></StationCard>
        ))}
      </div>
    </div>
  )
}

export default Measurements