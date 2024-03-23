import LogoPng from '../assets/Logo.png'

const Logo = () => {
  return (
    <div className='p-5'>
      <picture>
        <source srcSet={LogoPng} type="image/png" />
        <img src={LogoPng} alt="Logo" />
      </picture>
    </div>
  )
}

export default Logo