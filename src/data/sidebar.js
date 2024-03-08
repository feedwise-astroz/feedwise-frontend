import { RiNotificationLine, RiUserLine } from 'react-icons/ri';
import { MdOutlineInventory } from "react-icons/md";
import { MdInsertChartOutlined } from "react-icons/md";


const menu = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: MdInsertChartOutlined,
  },
  {
    title: "Notifications",
    path: "/notification",
    icon: RiNotificationLine,
  }, 
  {
    title: "Inventory List",
    path: "/inventory",
    icon: MdOutlineInventory,
  },
  {
    title: "Account",
    path: "/profile",
    icon: RiUserLine,
  },
];

export default menu;
