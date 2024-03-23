const Card = ({bgColor, text, data}:{bgColor: string, text: string, data: string}) => {
  return (
    <div className={`border rounded-lg shadow-md p-4 m-4 h-32 w-72 ${bgColor}`}>
      <div className='text-lg font-semibold'>
        <div>{text}</div>
        <div>{data}</div>
      </div>  
    </div>
  )
}

const Home = () => {
  return (
    <div className="flex justify-around">
        <Card bgColor='bg-5' text={"Current power consumption"} data={"23212W"}></Card>
        <Card bgColor='bg-4'text={"Max consumption today"} data={"2312W"}></Card>
        <Card bgColor='bg-6'text={"Combined power consumption today"} data={"10"}></Card>
        <Card bgColor='bg-2'text={"Target since tomorrow"} data={"10%"}></Card>
    </div>
  )
}

export default Home