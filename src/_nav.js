import React from 'react';
import { CNavItem, useColorModes } from '@coreui/react';
import DashboardImage from '../src/assets/images/navIcons/dashboard.png';
import SalesImage from '../src/assets/images/navIcons/sales.png';
import StoresImage from '../src/assets/images/navIcons/stores.png';
import CampaignsImage from '../src/assets/images/navIcons/campaign.png';
import ProductImage from '../src/assets/images/navIcons/products.png';
import NotificationImage from '../src/assets/images/navIcons/notification.png';
import SettingsImage from '../src/assets/images/navIcons/settings.png';
import ThemeImage from '../src/assets/images/navIcons/theme.png';
import LightTheme from '../src/assets/images/navIcons/toggle-light.png';
import DarkTheme from '../src/assets/images/navIcons/toggle-dark.png';

const Nav = () => {
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');

  const navItems = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <img src={DashboardImage} className="nav-icon" alt="Dashboard" />,
    },
    {
      component: CNavItem,
      name: 'Sales',
      to: '/sales',
      icon: <img src={SalesImage} className="nav-icon" alt="Sales" />,
    },
    {
      component: CNavItem,
      name: 'Products',
      to: '/products',
      icon: <img src={ProductImage} className="nav-icon" alt="Products" />,
    },
    {
      component: CNavItem,
      name: 'Stores',
      to: '/stores',
      icon: <img src={StoresImage} className="nav-icon" alt="Stores" />,
    },
    {
      component: CNavItem,
      name: 'Campaign',
      to: '/campaign',
      icon: <img src={CampaignsImage} className="nav-icon" alt="Campaign" />,
    },
    {
      component: CNavItem,
      name: 'Notification',
      to: '/notification',
      icon: <img src={NotificationImage} className="nav-icon" alt="Notification" />,
    },
    {
      component: CNavItem,
      name: 'Settings',
      to: '/settings',
      icon: <img src={SettingsImage} className="nav-icon" alt="Settings" />,
    },
    {
      component: CNavItem,
      name: 'Theme',
      to: '#',
      icon:<img src={ThemeImage} className="nav-icon" alt="Theme" />,
      badge:  (
        <>
          {colorMode === 'dark' ? (
            <a class="nav-link" onClick={() => (setColorMode('light'))} >
            <img src={DarkTheme} className="nav-icon" alt="Dark Theme" />
            </a>
          ) : colorMode === 'light' ? (
            <a class="nav-link" onClick={() => (setColorMode('dark'))} >
            <img src={LightTheme} className="nav-icon" alt="Light Theme" />
            </a>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  return navItems;
};

export default Nav;
