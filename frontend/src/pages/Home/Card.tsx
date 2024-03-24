
const Card = ({bgColor, text, data}:{bgColor: string, text: string, data: string|null}) => {
  return (
    <div className={`flex justify-center content-center flex-wrap border rounded-full shadow-lg p-4 m-4 h-32 w-72 ${bgColor}`}>
      <div className='text-lg font-semibold'>
        <div>{text}</div>
        <div>{data}</div>
      </div>  
    </div>
  )
}
export default Card