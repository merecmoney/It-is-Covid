import React, { useEffect, useState } from "react";
import CardContainer from "./components/CardContainer";
import Navbar from "./components/Navbar";
// Direcciones de los Hospitales de la CDMX
import dirrecciones from "./direcciones.json";
import axios from "axios";

const getCoords = () => {
  let coords = [0, 0];
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((pos) => {
      coords[0] = Number(pos.coords.latitude).toFixed(4);
      coords[1] = Number(pos.coords.longitude).toFixed(4);
    });
  } else {
    console.log("Not Available to locate your position");
  }
  return coords;
};
function App() {
  const [data, setData] = useState(new Map());
  const coords = getCoords();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching hospitals capability
        const response = await axios.get(
          "https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=capacidad-hospitalaria&q=&rows=100&sort=fecha&facet=fecha&facet=nombre_hospital&facet=institucion&facet=estatus_capacidad_hospitalaria&facet=estatus_capacidad_uci"
        );

        // Setting the hospitals data.

        const data = response.data;
        const hospitales = data.records;
        let petitions = [];
        for (const record of hospitales) {
          const lat = record.fields.coordenadas[0];
          const lng = record.fields.coordenadas[1];
          const duration_time = axios.get(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${lng},${lat};${coords[1]},${coords[0]}?geometries=geojson&access_token=pk.eyJ1IjoibWVyZWNtb25leSIsImEiOiJja2NzbWNsMHYxZ3AwMnBvYng4ZjBoMWZsIn0.zMLApohrEBIAv7g4hyajaQ`
          );
          petitions.push(duration_time);
        }
        const map_req = await axios.all(petitions);

        let HospitalesMap = new Map();
        for (let k = 0; k < hospitales.length; k++) {
          // objeto con los datos del hospital
          let record = hospitales[k];
          // nombre del Hospital
          const nombreHospital = record.fields.nombre_hospital;
          // obtener la dirección del Hospital dado su Nombre
          const dir = dirrecciones[nombreHospital];
          // objeto con los datos del Hospital, la distancia en KM del hospital
          // al punto dónde está el usuario, el tiempo desde dónde está el
          // usuario hasta el hospital y la dirección del hospital
          const informacionHospital = {
            ...record.fields,
            distance: map_req[k].data.routes[0].distance || 0,
            time: map_req[k].data.routes[0].duration || 0,
            direccion: dir,
          };
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
        console.log(error);
      }
    };
    if (coords[0] !== 0) {
      fetchData();
    }
  }, []);

  return (
    <>
      <Navbar />
      <CardContainer data={Array.from(data.values())} />
    </>
  );
}

export default App;
