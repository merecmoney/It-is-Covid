import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Test() {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((pos) => {
            setCoords({
              lat: Number(pos.coords.latitude).toFixed(2),
              lng: Number(pos.coords.longitude).toFixed(2),
            });
          });
        } else {
          console.log("Not Available");
        }
        const rew = await axios.get(
          "https://api.mapbox.com/directions/v5/mapbox/driving/-99.192868,19.336675;-99.150500,19.406400?geometries=geojson&access_token=pk.eyJ1IjoibWVyZWNtb25leSIsImEiOiJja2NzbWNsMHYxZ3AwMnBvYng4ZjBoMWZsIn0.zMLApohrEBIAv7g4hyajaQ"
        );
        console.log("distance -> ", rew.data.routes[0].distance);
        console.log("duration -> ", rew.data.routes[0].duration);
      } catch (error) {
        console.log("ERROR RECUPERANDO DATOS");
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div style={{ backgroundColor: "green" }}>{coords.lng}</div>
    </>
  );
}
