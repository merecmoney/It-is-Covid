import React, { Fragment } from "react";
import Card from "./Card";
import shortid from "shortid";

const CardContainer = ({ data , location}) => {
  const cards = [];

  if (data) {
    for (const hospital of data) {

      let scrImage = hospital.nombre_hospital.replace(new RegExp("\"", "g"), "");
      scrImage = scrImage.replace(new RegExp(" ", "g"), "\\ ");
      scrImage = scrImage.replace(new RegExp("\\(", "g"), "\\(");
      scrImage = scrImage.replace(new RegExp("\\)", "g"), "\\)");

      cards.push({
        name: hospital.nombre_hospital,
        distance: Number(hospital.distance / 1000).toFixed(2),
        occupation: hospital.estatus_capacidad_hospitalaria,
        address: hospital.direccion,
        time: hospital.time,
        image: `/images/${scrImage}.jpg`,
      });
    }
  } else {
    return <p>Loading</p>;
  }



  // console.log(cards);
  return (
    <Fragment>
      <h1 className="main-title">Tus hospitales mas cercanos</h1>

    <div className='card-grid'>
      {cards.map((card) => (
        <Card
          key={shortid.generate()}
          hospital={card}
          location={location}
        />
      ))}
    </div>
    </Fragment>
  );
};

export default CardContainer;
