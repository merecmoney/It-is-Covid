import React from "react";
import "../index.css";

const Card = ({ hospital }) => {
  return (
    <div className='card'>
      <img src={hospital.image} alt='' />
      <div className='card-title'>
        <h2>{hospital.name}</h2>
        <i className='fas fa-map-marker-alt'></i>
      </div>
      <p>{hospital.address}</p>
      <div className='card-info'>
        <p className='distance'>{hospital.distance}</p>
        <p className='occupation'>{hospital.occupation}</p>
      </div>
    </div>
  );
};

export default Card;
