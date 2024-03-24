import {useEffect, useState} from 'react'
import axios from 'axios'

import Card from './Card'
import Chart from './Chart'

const Home = () => {
  const [data, setData] = useState({
    current_power_consumption: null,
    max_consumption_today: null,
    combined_power_consumption_today: null,
    target_since_yesterday: null,
  })

  useEffect(() => {

  const fetchData = async () => {
    axios.get('http://localhost:8000/get_dashboard_data/')
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
    <>
      <div className="flex justify-around">
          <Card bgColor='bg-5' text={"Current power consumption"} data={data.current_power_consumption}></Card>
          <Card bgColor='bg-4'text={"Max consumption today"} data={data.max_consumption_today}></Card>
          <Card bgColor='bg-6'text={"Combined power consumption today"} data={data.combined_power_consumption_today}></Card>
          <Card bgColor='bg-2'text={"Target since yesterday"} data={data.target_since_yesterday}></Card>
      </div>
      <Chart></Chart>
    </>
  )
}

export default Home