const Button = ({text, onClick}: {text:string, onClick?: () => void}) => {
  
  return (
    <button className="bg-1 hover:bg-2 text-white font-bold rounded-lg py-2 px-4 m-2" onClick={onClick}>
        {text}
    </button>
  )
}

export default Button