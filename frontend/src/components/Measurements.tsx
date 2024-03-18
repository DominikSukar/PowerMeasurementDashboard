import React from 'react'
import { useState } from 'react';

interface Measurement {
  name: string;
  date: Date;
  value: number;
}
interface powerStation {
  name: string;
  summarizedMeasurements: number;
  measurements: Measurement[];
}

const StationCard = ({station}: {station: powerStation}) => {
  return (
    <div className="border rounded-lg shadow-md p-4 m-4 bg-white">
      <div className='text-lg font-bold'>{station.name}</div>
      <div>Power sum: {station.summarizedMeasurements} [W]</div>
      <br></br>
        {station.measurements.map((measurement, index) => (
          <div key={index} className='flex justify-around'>
            <div>{measurement.name}</div>
            <div>{measurement.value} [W]</div>
          </div>
        ))}
    </div>
  )
}

const Measurements = () => {
  const [data, setData] = useState<powerStation[]>([
    {
      name: "Power Station 1",
      summarizedMeasurements: 51+65,
      measurements: [
        {
          name: "Circuit 1",
          date: new Date(2024, 3, 18, 10, 0, 0),
          value: 51,
        },
        {
          name: "Circuit 2",
          date: new Date(2024, 3, 18, 10, 0, 0),
          value: 65,
        },
      ],
    },
    {
      name: "Power Station 2",
      summarizedMeasurements: 43+123,
      measurements: [
        {
          name: "Circuit 1",
          date: new Date(2024, 3, 18, 10, 0, 0),
          value: 43,
        },
        {
          name: "Circuit 2",
          date: new Date(2024, 3, 18, 10, 0, 0),
          value: 123,
        },
      ],
    }
  ])
  return (
    <div>
      <div>Measurements</div>
      <div className='flex'>
        {data.map((station, index) => (
          <div key={index}>
            <StationCard station={station}></StationCard>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Measurements