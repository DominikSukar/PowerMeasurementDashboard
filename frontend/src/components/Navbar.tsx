import React, { useState, Dispatch } from 'react'
import { Link, useLocation  } from 'react-router-dom'

import Logo from './Logo'

const Nav = ({name, path, currentPath, changeCurrentPath}:{name: string, path: string, currentPath: string, changeCurrentPath: Dispatch<React.SetStateAction<string>>}) => {
  let active: boolean = false;
  if (currentPath === path) {
    active = true;
  }
  const router = useLocation();
    return (
            <Link to={path}>
                <button type="button" className="w-full py-2 bg-1 text-white hover:bg-2 transition-colors"
                onClick={()=>changeCurrentPath(name)}>{ name }
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
            <Nav name={"Home"} currentPath={currentPath} changeCurrentPath={changeCurrentPath} path="/"></Nav>
            <Nav name={"Measurements"} currentPath={currentPath} changeCurrentPath={changeCurrentPath} path="/measurements"></Nav>
            <Nav name={"Management"} currentPath={currentPath} changeCurrentPath={changeCurrentPath} path="/management"></Nav>
        </div>
    </div>
  )
}

export default Navbar