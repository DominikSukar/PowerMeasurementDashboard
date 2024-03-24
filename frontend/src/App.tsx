import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'
import Header from './components/Header'

import Home from './pages/Home'
import Measurements from './pages/Data'
import Settings from './pages/Settings'

import Keycloak from "keycloak-js";

import LoadingScreen from "./assets/LoadingScreen.jpg"


function App() {
  const [keycloak, setKeycloak] = useState<Keycloak|null>(null);
  
  useEffect(() => {
    let initOptions = {
      url: "http://localhost:8080",
      realm: "PMD",
      clientId: "frontend-1",
      onLoad: "login-required",
    };

    const kc = new Keycloak(initOptions);

    kc.init({onLoad: "login-required"}).then((authenticated) => {
      if (!authenticated) {
        window.location.reload();
      } else {
        setKeycloak(kc);
      }
    }).catch(error => {
      console.log(kc);
      console.error("Authentication Failed", error);
    });

    return () => {
      if (kc) {
        kc.logout();
      }
    };
  }, []);

  if (!keycloak) {
    return (<div className="overflow-hidden h-screen w-screen">
              <img className="object-cover object-center h-full w-full" src={LoadingScreen} alt="Loading Screen" />
            </div>
    )
  }

  return (
    <div>
      <BrowserRouter>
        <div>
          <Navbar keycloak={keycloak}></Navbar>
          <Header></Header>
          <div className='absolute left-64 top-12 bottom-0 right-0 bg-slate-200 overflow-auto'>
            <Routes>
              <Route path="/" Component={Home}></Route>
              <Route path="/measurements" Component={Measurements}></Route>
              <Route path="/settings" Component={Settings}></Route>
            </Routes>
          </div>
        </div>  
      </BrowserRouter>
    </div>
  )
}

export default App
