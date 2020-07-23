import React, { useEffect, useState } from "react";
import CardContainer from "./components/CardContainer";
import Navbar from "./components/Navbar";
// Direcciones de los Hospitales de la CDMX
import dirrecciones from "./direcciones.json";
import axios from "axios";
import useFullpageLoader from "./components/useFullpageLoader";

function App() {
  const [data, setData] = useState(new Map());
  const [coords, setCoords] = useState([0, 0]);
  const [loader, showLoader, hideLoader] = useFullpageLoader();

  useEffect(() => {
    var promise1 = new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        resolve({ lat, lon });
      });
    });
    promise1.then(function (value) {
      setCoords((prevState) => {
        let newState = prevState;
        newState = [Number(value.lat).toFixed(4), Number(value.lon).toFixed(4)];
        return newState;
      });
    });
  }, []);

  useEffect(() => {
    showLoader();
    const fetchData = async () => {
      try {
        // Fetching hospitals capability
        // console.log("antes cdmx");
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
        // console.log("antes");
        const map_req = await axios.all(petitions);
        // console.log("despues");

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
        hideLoader();

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
      console.log("not coordinates");
      fetchData();
    }
  }, [coords]);

  return (
    <div>
      <Navbar />
      <CardContainer
        data={Array.from(data.values()).sort((a, b) => {
          return a.time - b.time;
        })}

        location = {{
          lat: coords[0],
          log: coords[1]
        }}
      />
      {loader}
    </div>
  );
}

export default App;
