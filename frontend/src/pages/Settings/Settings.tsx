import { useState } from 'react'

import Button from '../../components/Button'

import Datagrid from './Datagrid'
import AddingModal from './AddingModal'

const Settings = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div>
      <AddingModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}></AddingModal>
      <div className='m-16 px-10 py-5 rounded-ful bg-white'>
        <div className='flex justify-start'>
          <Button text="Add" onClick={() => setIsOpen(true)}></Button>
        </div>
        <Datagrid></Datagrid>
      </div>
    </div>
  )
}

export default Settings