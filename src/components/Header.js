import React from "react";
import "../index.css";

const Hea = ({ hospital }) => {
  let classColor;
  switch (hospital.occupation) {
    case "Buena":
      classColor = "buena";
      break;
    case "Media":
      classColor = "media";
      break;
    case "Crítica":
      classColor = "critica";
      break;
    default:
      break;
  }

  return (
    <div className='card'>
      <div className='img-hospital'></div>
      <div className='card-title'>
        <h2>{hospital.name}</h2>
        <i className='fas fa-map-marker-alt'></i>
      </div>
      <p>{hospital.address}</p>
      <div className='card-info'>
        <p className='distance'>{hospital.distance + " Km"}</p>
        <p className={classColor}>{hospital.occupation}</p>
      </div>
    </div>
  );
};

export default Card;
