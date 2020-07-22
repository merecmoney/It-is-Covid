import React, { Fragment } from "react";
import Card from "./Card";
import shortid from "shortid";

const CardContainer = ({ data }) => {
  const cards = [];

  if (data) {
    for (const hospital of data) {
      cards.push({
        name: hospital.nombre_hospital,
        distance: Number(hospital.distance / 1000).toFixed(2),
        occupation: hospital.estatus_capacidad_hospitalaria,
        address: hospital.direccion,
        time: hospital.time,
        image: "https://via.placeholder.com/150",
      });
    }
  } else {
    return <p>Loading</p>;
  }

  return (
    <Fragment>
      <h1 className="main-title">Tus hospitales mas cercanos</h1>
    <div className='card-grid'>
      {cards.map((card) => (
        <Card key={shortid.generate()} hospital={card} />
      ))}
    </div>
    </Fragment>
  );
};

export default CardContainer;
