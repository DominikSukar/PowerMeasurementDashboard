import { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'

import Button from '../../components/Button'


const AddingModal = ({modalIsOpen, setIsOpen}:{modalIsOpen:boolean; setIsOpen:Function}) => {
  const [formData, setFormData] = useState({
    ip: '',
    port: ''
  });

  const [ipProvided, setIpProvided] = useState(true);
  const [portProvided, setPortProvided] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.ip.trim() === '') {
      setIpProvided(false);
    }
    if (formData.port.trim() === '') {
      setPortProvided(false);
    }
    if (ipProvided && portProvided) {
      axios.post('http://localhost:8000/post_devices/', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
        <Modal
          isOpen={modalIsOpen}
          style={{content:{
            padding: "10px",
            margin: "12% 38%",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",

          }}}
          onRequestClose={closeModal}
        >              
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="ip" className="block text-gray-700 text-sm font-bold mb-2">IP:</label>
              <input
                type="text"
                id="ip"
                name="ip"
                value={formData.ip}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter IP address"
              />
              {!ipProvided && formData.ip.trim() === '' && (
                <p className="text-red-500 text-xs italic">IP is required</p>
              )}
            </div>
          <div className="mb-4">
            <label htmlFor="port" className="block text-gray-700 text-sm font-bold mb-2">Port:</label>
            <input
              type="text"
              id="port"
              name="port"
              value={formData.port}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter port number"
              />
              {!portProvided && formData.port.trim() === '' && (
                <p className="text-red-500 text-xs italic">Port is required</p>
              )}
            </div>
            <div className="flex justify-end">
              <Button text="Submit" onClick={() => console.log(formData)}/>
            </div>
          </form>
      </Modal>
    </>
  )
}

export default AddingModal