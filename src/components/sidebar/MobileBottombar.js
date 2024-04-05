import React from "react";
import "./MobileBottombar.scss";
import menu from "../../data/sidebar";
import MobileBottombarItem from "./MobileBottombarItem";

const MobileBottombar = () => {
  return(
    <div className="sm:hidden fixed bottom-0 left-0 w-full py-2 flex items-center mobile-bottom">
      <div className="flex justify-around w-full px-4"> 
        {menu.map((item, index) => (
          <MobileBottombarItem key={index} item={item} />
        ))}
      </div>
     
    </div>
  );
};

export default MobileBottombar;
