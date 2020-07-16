import React, { useEffect, useState } from "react";
import axios from "axios";
const getDistance = (p1, p2) => {
  return Math.abs((p1[1] - p2[1]) / (p1[0] - p2[0]));
};
const ordenaHospitales = (hospitales, coordenadas_usuario) => {
  hospitales.sort((h1, h2) => {
    const distance1 = getDistance(h1.fields.coordenadas, coordenadas_usuario);
    const distance2 = getDistance(h2.fields.coordenadas, coordenadas_usuario);
    h1.fields.distancia = distance1;
    h2.fields.distancia = distance2;
    return distance1 - distance2;
  });
  return hospitales;
};
export default function Test() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=capacidad-hospitalaria&q=&rows=100&sort=fecha&facet=fecha&facet=nombre_hospital&facet=institucion&facet=estatus_capacidad_hospitalaria&facet=estatus_capacidad_uci"
        );
        const coordenadas_usuario = [19.52, -99.1];
        const data = response.data;
        const hospitales = data.records;
        const hospitales_cercanos = ordenaHospitales(
          hospitales,
          coordenadas_usuario
        );

        let HospitalesMap = new Map();
        for (const record of hospitales_cercanos) {
          let nombreHospital = record.fields.nombre_hospital;
          let informacionHospital = record.fields;
          if (!HospitalesMap.get(nombreHospital)) {
            HospitalesMap.set(nombreHospital, informacionHospital);
          }
        }

        console.log(HospitalesMap);

        setData((prevState) => {
          let newState = { ...prevState };
          newState = { ...data.records[0] };
          return newState;
        });
        console.log("I am fetching the data");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div style={{ backgroundColor: "green" }}>
        <p>{data.datasetid}</p>
      </div>
    </>
  );
}
