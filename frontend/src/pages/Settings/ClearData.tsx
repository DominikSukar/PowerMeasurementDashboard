import {useContext} from "react"

import Button from "../../components/Button"
import TokenContext from '../../authProvider';

import axios from "axios"

export default function ClearData() {
  const {accessToken} = useContext(TokenContext)

  function RequestDataClearing() {
    axios.delete('http://localhost:8000/delete_data/', { headers: {"Authorization" : `Bearer ${accessToken}`} })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="flex justify-start ml-16 mt-8">
        <Button text="Clear Data" onClick={RequestDataClearing}></Button>
    </div>
  )
}
