import Modal from 'react-modal'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ChartData,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const Chart = ({modalIsOpen, setIsOpen, data}:{modalIsOpen:boolean; setIsOpen:Function, data:ChartData<"line", any, any>|null}) => {
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        style={{content:{
          padding: "10px",
          margin: "5% 10%",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",

        }}}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className='flex content-center 2xl:h-152 xl:h-96'>
          {data ? (<Line data={data} options={options} />):
          (<div>No data</div>)}
        </div>
      </Modal>
    </>
  )
}

export default Chart