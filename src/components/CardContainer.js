import React, { useEffect } from "react";
import Card from "./Card";

const CardContainer = ({ data }) => {
  useEffect(() => {
    renderHospitals(data);
  }, [data]);

  const renderHospitals = (data) => {
    if (data) {
      const cards = [];
      for (const hospital of data) {
        cards.push();
      }
    } else {
      return <p>Loading</p>;
    }
  };

  return <></>;
};

export default CardContainer;
