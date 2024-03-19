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
      <div className='font-bold'>{powerStation}</div>
      <br></br>
        {measurements.map((measurement, index) => (
          <div key={index} className='flex justify-around'>
            <div className='text-xs'>{measurement.circuit_id}</div>
            <div className='text-xs'>{measurement.measurement}W</div>
          </div>
        ))}
    </div>
  )
}

const Measurements = () => {
  const [data, setData] = useState<PowerStation>({
    "Power station 1": [
      {
          "id": 60497,
          "date": new Date(2024, 3, 18, 10, 0, 0),
          "measurement": "5149",
          "circuit_id": "Circuit 1"
      },
      {
        "id": 60497,
        "date": new Date(2024, 3, 18, 10, 0, 0),
        "measurement": "5149",
        "circuit_id": "Circuit 2"
      },
    ],
  "Power station 2": [
      {
          "id": 60497,
          "date": new Date(2024, 3, 18, 10, 0, 0),
          "measurement": "3213",
          "circuit_id": "Circuit 1"
      },
      {
        "id": 60497,
        "date": new Date(2024, 3, 18, 10, 0, 0),
        "measurement": "42141",
        "circuit_id": "Circuit 2"
      },
    ],

  })

  useEffect(() => {
    axios.get('http://localhost:8000/get_latest_data/')
    .then(function (response) {
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }, [])
  

  return (
    <div>
      <div>Measurements</div>
      <div className='grid grid-cols-6'>
        {Object.entries(data).map(([powerStation, measurements]) => (
            <StationCard powerStation={powerStation} measurements={measurements}></StationCard>
        ))}
      </div>
    </div>
  )
}

export default Measurements