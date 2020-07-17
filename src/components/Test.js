import React, { useEffect, useState } from "react";
import axios from "axios";
import CardContainer from "./CardContainer";
const getDistance = (p1, p2) => {
  return Math.sqrt((p1[1] - p2[1]) ** 2 + (p1[0] - p2[0]) ** 2);
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
  const [data, setData] = useState(new Map());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=capacidad-hospitalaria&q=&rows=100&sort=fecha&facet=fecha&facet=nombre_hospital&facet=institucion&facet=estatus_capacidad_hospitalaria&facet=estatus_capacidad_uci"
        );
        // Clave para llamar API
        // AIzaSyDUMQQPU_1PuZdrqKFrRzFlYs-4W6WGrpo
        //origin=41.43206,-81.38992
        const coordenadas_usuario = [19.52, -99.1];
        // COORDENADAS CENTRO MEDICO 19.4064° N, 99.1550° W
        //https://maps.googleapis.com/maps/api/directions/json?origin=&destination=&key=AIzaSyDUMQQPU_1PuZdrqKFrRzFlYs-4W6WGrpo

        // const distanciaGoogleMaps = await axios.get(
        //   `https://maps.googleapis.com/maps/api/directions/json?origin=${
        //     coordenadas_usuario[0]
        //   },${
        //     coordenadas_usuario[1]
        //   }&destination=${19.4064},${99.155}&key=AIzaSyDUMQQPU_1PuZdrqKFrRzFlYs-4W6WGrpo`
        // );
        // // const address = await axios.get(
        // //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${19.4064},${99.155}&key=AIzaSyDUMQQPU_1PuZdrqKFrRzFlYs-4W6WGrpo`
        // // );
        // console.log(distanciaGoogleMaps);

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

        setData((prevState) => {
          let newState = prevState;
          newState = HospitalesMap;
          return newState;
        });
      } catch (error) {
        console.log("ERROR RECUPERANDO DATOS");
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div style={{ backgroundColor: "green" }}>
        <CardContainer data={data} />
      </div>
    </>
  );
}
