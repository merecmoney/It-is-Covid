import React from "react";
import "../index.css";

const Card = ({ hospital, location}) => {
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

  const convertSeconds = (timeInSeconds) => {
    let h = Math.floor(timeInSeconds / 3600);
    let m = Math.floor((timeInSeconds % 3600) / 60);

    let stringH = "";
    if (h === 1) {
      stringH = "1 hora ";
    } else if (h > 1) {
      stringH = h + "horas ";
    }

    return stringH + m + " minutos";
  };

  return (
    <div className={hospital.over_map ? "over-map-card" : "card"}>
      <div
        className='img-hospital'
        style={{
          backgroundImage: `url(${hospital.image})`,
        }}
      ></div>
      <div className='card-title'>
        <h2>{hospital.name}</h2>
        <i className='fas fa-map-marker-alt'></i>
      </div>
      <p>{hospital.address}</p>
      <div className='card-info'>
        <p className='distance'>{convertSeconds(hospital.time)}</p>
        <p className={classColor}>{hospital.occupation}</p>
      </div>
    </div>
  );
};

export default Card;
