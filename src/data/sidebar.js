import { RiUserLine } from 'react-icons/ri';
import { MdOutlineInventory, MdInsertChartOutlined, MdOutlineSettings } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";

import { ReactComponent as DashboardIcon } from '../assets/dashboard-icons/Assessment.svg';
import { ReactComponent as NotificationsIcon } from '../assets/dashboard-icons/Notifications.svg';
import { ReactComponent as InventoryIcon } from '../assets/dashboard-icons/Inventory.svg';
import { ReactComponent as AccountIcon } from '../assets/dashboard-icons/Settings.svg';

const menu = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Notifications",
    path: "/notification",
    icon: <NotificationsIcon />,
  }, 
  {
    title: "Inventory List",
    path: "/inventory",
    icon: <InventoryIcon />,
  },
  {
    title: "Account",
    path: "/profile",
    icon: <AccountIcon />,
  },
];

export default menu;
