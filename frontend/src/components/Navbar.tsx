import { Link } from 'react-router-dom'

import Logo from './Logo'

import HomeIcon from '../assets/home.svg'
import SettingsIcon from '../assets/settings.svg'
import DataIcon from '../assets/database.svg'
import LogoutIcon from '../assets/logout.svg'

import Keycloak from 'keycloak-js'

const Nav = ({name, path, icon}:{name: string, path: string|null, icon:string}) => {
  if (path) {
    return (
      <Link to={path}>
      <button type="button" className="flex w-full py-2 bg-1 text-white hover:bg-2 transition-colors">
        <img src={icon} alt="Home logo" className='mr-2 ml-20'></img>
        <div>{ name }</div>
      </button>
    </Link>
    )} else {
      return (
        <button type="button" className="flex w-full py-2 bg-1 text-white hover:bg-2 transition-colors">
          <img src={icon} alt="Home logo" className='mr-2 ml-20'></img>
          <div>{ name }</div>
        </button>
      )
    }

}


const Navbar = ({keycloak}:{keycloak: Keycloak}) => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-1">
        <div className='flex flex-col'>
            <Logo></Logo>
            <Nav name={"Home"} icon={HomeIcon} path="/"></Nav>
            <Nav name={"Data"} icon={SettingsIcon} path="/measurements"></Nav>
            <Nav name={"Settings"} icon={DataIcon} path="/settings"></Nav>
            <button type="button" className='absolute bottom-0 left-0 right-0' onClick={() => keycloak.logout()}>
              <Nav name={"Logout"} icon={LogoutIcon} path={null}></Nav>
            </button>
        </div>
    </div>
  )
}

export default Navbar