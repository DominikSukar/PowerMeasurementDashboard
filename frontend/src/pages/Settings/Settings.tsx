import { useState } from 'react'

import Button from '../../components/Button'

import Datagrid from './Datagrid'
import AddingModal from './AddingModal'
import ClearData from './ClearData'

const Settings = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div>
      <ClearData></ClearData>
      <AddingModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}></AddingModal>
      <div className='m-16 mt-8 px-10 py-5 rounded-ful bg-white'>
        <div className='flex justify-start'>
          <Button text="Add" onClick={() => setIsOpen(true)}></Button>
        </div>
        <Datagrid></Datagrid>
      </div>
    </div>
  )
}

export default Settings