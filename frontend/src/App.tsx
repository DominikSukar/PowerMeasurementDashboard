import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Header from './components/Header'
import Measurements from './components/Measurements'

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
    return (<div style={{width: "100vw", height: "100vh", maxWidth: "100%", overflow: "hidden"}}>
              <img src={LoadingScreen} alt="Loading Screen" style={{width: "100%", height: "100%", objectFit: "cover"}}></img>
           </div>
    )
  }

  return (
    <div>
      <BrowserRouter>
        <div>
          <Navbar keycloak={keycloak}></Navbar>
          <Header></Header>
          <div className='absolute left-64 top-12 bottom-0 right-0 bg-slate-100 overflow-auto'>
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
