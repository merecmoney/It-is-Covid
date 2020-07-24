import React, { useState } from "react";
import "../index.css";

const Navbar = ({ onClick }) => {
  return (
    <div className='navbar'>
      <div id='hospital-menu' onClick={onClick} className='menu-blue'>
        <p id='hospital-menu'>
          <i id='hospital-menu' className='fas fa-hospital'></i> Hospitales
        </p>
      </div>
      <div id='mapa-menu' onClick={onClick} className='menu-white'>
        <p id='mapa-menu'>
          <i id='mapa-menu' className='fas fa-map-marked-alt'></i> Mapa
        </p>
      </div>
    </div>
  );
};

export default Navbar;
