import React from "react";
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
        image: "https://via.placeholder.com/150",
      });
    }
  } else {
    return <p>Loading</p>;
  }

  return (
    <div className='card-grid'>
      {cards.map((card) => (
        <Card key={shortid.generate()} hospital={card} />
      ))}
    </div>
  );
};

export default CardContainer;
