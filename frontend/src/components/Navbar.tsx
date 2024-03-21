import React, { useState, Dispatch } from 'react'
import { Link, useLocation  } from 'react-router-dom'

import Logo from './Logo'

import HomeIcon from '../assets/home.svg'
import SettingsIcon from '../assets/settings.svg'
import DataIcon from '../assets/database.svg'
import LogoutIcon from '../assets/logout.svg'

const Nav = ({name, path, currentPath, changeCurrentPath, icon}:{name: string, path: string, currentPath: string, changeCurrentPath: Dispatch<React.SetStateAction<string>>, icon:string}) => {
    return (
            <Link to={path}>
                <button type="button" className="flex w-full py-2 bg-1 text-white hover:bg-2 transition-colors"
                onClick={()=>changeCurrentPath(name)}>
                  <img src={icon} alt="Home logo" className='mr-2 ml-20'></img>
                  <div>{ name }</div>
                </button>
            </Link>
        )
}


const Navbar = () => {
  const [currentPath, changeCurrentPath] = useState<string>("/")

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-1">
        <div className='flex flex-col'>
            <Logo></Logo>
            <Nav name={"Home"} currentPath={currentPath} changeCurrentPath={changeCurrentPath} icon={HomeIcon} path="/"></Nav>
            <Nav name={"Data"} currentPath={currentPath} changeCurrentPath={changeCurrentPath} icon={SettingsIcon} path="/measurements"></Nav>
            <Nav name={"Settings"} currentPath={currentPath} changeCurrentPath={changeCurrentPath} icon={DataIcon} path="/settings"></Nav>
            <Nav name={"Logout"} currentPath={currentPath} changeCurrentPath={changeCurrentPath} icon={LogoutIcon} path="/"></Nav>
        </div>
    </div>
  )
}

export default Navbar