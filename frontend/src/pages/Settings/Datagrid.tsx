import 'react-data-grid/lib/styles.css';
import { useState, useEffect } from 'react'
import axios from 'axios';

import DataGrid from 'react-data-grid';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'ip', name: 'IP' },
  { key: 'port', name: 'PORT' }
];

function Datagrid() {
	const [rows, setRows] = useState([
		{ id: 0, ip: 'localhost', port: '5000' },
		{ id: 1, ip: 'localhost', port: '5001' },
		]
	)

	useEffect(() => {
    const fetchData = async () => {
    axios.get('http://localhost:8000/get_devices/')
    .then(function (response) {
      setRows(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [])

  return <DataGrid columns={columns} rows={rows}/>
}

export default Datagrid;