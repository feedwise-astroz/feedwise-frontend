import React from "react";
import "./MobileBottombar.scss";
import menu from "../../data/sidebar";
import MobileBottombarItem from "./MobileBottombarItem";

const MobileBottombar = () => {
  return(
    <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 py-2 flex items-center">
      <div className="flex justify-around w-full px-4"> {/* Use justify-around class for equal spacing */}
        {menu.map((item, index) => (
          <MobileBottombarItem key={index} item={item} />
        ))}
      </div>
      {/* Add other components or buttons if needed */}
    </div>
  );
};

export default MobileBottombar;
