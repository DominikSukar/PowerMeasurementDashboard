import React, {useState} from 'react';
import '@nokia-csf-uxr/nokia-design-system-tokens/css/_variables.css';
import AdvancedTheme from '@nokia-csf-uxr/ccfk/AdvancedTheme';

import { useLocation , Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

import App, {
  AppHeader,
  AppContent,
  AppContentWrapper,
  AppBody
} from '@nokia-csf-uxr/ccfk/App'

import AppBanner, {
  AppBannerLogo,
  AppBannerName,
} from "@nokia-csf-uxr/ccfk/AppBanner";

import SideDrawer from "@nokia-csf-uxr/ccfk/SideDrawer";
import {
  SideDrawerList,
  SideDrawerItem,
} from "@nokia-csf-uxr/ccfk/SideDrawer";

import DatabaseIcon from "@nokia-csf-uxr/ccfk-assets/latest/DataIcon"
import AdminSettingsIcon from "@nokia-csf-uxr/ccfk-assets/latest/SettingsIcon"
import JobsIcon from "@nokia-csf-uxr/ccfk-assets/latest/NetworkElementVirtualIcon"

import Jobs from "./components/jobs/index"
import UTEMaster from "./components/utemaster/index"
import AdminSettings from "./components/adminsettings/index"
import {ToastContainer} from "react-toastify";

const SimplifiedApp = () => {
  const SIDE_DRAWER_PROPS = (path) => {
    let selected = false

    if (path === useLocation().pathname) {
      selected = true
    }
    return {
      selected: selected
    }
  }

  return (
    <AdvancedTheme advancedTheme="CCFK FreeForm - Light">
      <App rtl={false} disableAnimation={false}>
        <AppHeader>
          <AppBanner>
            <AppBannerLogo/>
            <AppBannerName>Project CUTE</AppBannerName>
          </AppBanner>
        </AppHeader>
        <ToastContainer className="toastify"/>
        <AppBody>
          <SideDrawer>
            <SideDrawerList>
              <SideDrawerItem groupHeader label="Automation"></SideDrawerItem>
              <Link to="/">
                <SideDrawerItem label="Jobs" icon={<JobsIcon/>} {...SIDE_DRAWER_PROPS("/")}/>
              </Link>
              <SideDrawerItem groupHeader label="Configuration"></SideDrawerItem>
              <Link to="/utemaster">
                <SideDrawerItem label="UTE Master"
                                icon={<DatabaseIcon/>} {...SIDE_DRAWER_PROPS("/utemaster")}></SideDrawerItem>
              </Link>
              <Link to="/adminsettings">
                <SideDrawerItem label="Admin settings"
                                icon={<AdminSettingsIcon/>} {...SIDE_DRAWER_PROPS("/adminsettings")}></SideDrawerItem>
              </Link>
            </SideDrawerList>
          </SideDrawer>
          <AppContentWrapper>
            <AppContent>
              <Routes>
                <Route path="/" element={<Jobs/>}></Route>
                <Route path="/utemaster" element={<UTEMaster/>}></Route>
                <Route path="/adminsettings" element={<AdminSettings/>}></Route>
              </Routes>
            </AppContent>
          </AppContentWrapper>
        </AppBody>
      </App>
    </AdvancedTheme>
  )
};

export default SimplifiedApp