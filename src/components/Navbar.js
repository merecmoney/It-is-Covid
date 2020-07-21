import React from "react";
import "../index.css";

const Navbar = () => {
  return (
    <div className='navbar'>
      <div id='hospital-menu' className='menu-blue'>
        <p>
          <i className='fas fa-hospital'></i> Hospitales
        </p>
      </div>
      <div id='mapa-menu' className='menu-white'>
        <p>
          <i className='fas fa-map-marked-alt'></i> Mapa
        </p>
      </div>
    </div>
  );
};

export default Navbar;
