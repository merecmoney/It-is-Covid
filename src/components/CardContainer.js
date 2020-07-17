import React, { useEffect } from "react";
import Card from "./Card";
import shortid from 'shortid';


const CardContainer = ({ data }) => {
  const cards = [];

  if (data) {
    for (const hospital of data) {
      cards.push(
          {
            name : hospital.nombre_hospital,
            distance: 159,
            occupation: hospital.estatus_capacidad_hospitalaria,
            address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et massa non.",
            image: "https://via.placeholder.com/150"
          }
      );
    }
  } else {
    return <p>Loading</p>;
  }

  return (<div className="card-grid">
    {
      cards.map(card => ( <
        Card key = {
          shortid.generate()
        }
        hospital = {
          card
        }
        />
      ))
    }
    </div>);
};

export default CardContainer;
