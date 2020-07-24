import React from "react";
import Card from "./Card";
import "../index.css";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }
  state = {
    name: "Hospital más cercano",
    occupation: "Buena",
    address: "",
    time: 12,
    image: "",
    over_map: true,
  };
  updateHospital(hospital) {
    let scrImage = hospital.replace(new RegExp('"', "g"), "");
    scrImage = scrImage.replace(new RegExp(" ", "g"), "\\ ");
    scrImage = scrImage.replace(new RegExp("\\(", "g"), "\\(");
    scrImage = scrImage.replace(new RegExp("\\)", "g"), "\\)");
    this.setState((state) => {
      const newState = {
        ...state,
        name: hospital,
        image: `/images/${scrImage}.jpg`,
      };
      const hospital_object = this.props.data.get(hospital);
      newState.occupation = hospital_object.estatus_capacidad_uci;
      newState.address = hospital_object.direccion;
      newState.time = hospital_object.time;
      return newState;
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.props.first_hospital) {
      this.updateHospital(this.props.first_hospital);
    }
  }
  onMarkerClick(evt) {
    this.updateHospital(evt.name);
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{ ...this.props.center }}
          style={{ width: "100%", height: "90%" }}
        >
          <Marker
            title={"Aqui estas tu"}
            name={"Aqui estoy"}
            position={{ ...this.props.center }}
          />
          {Array.from(this.props.data.keys()).map((key) => (
            <Marker
              onClick={this.onMarkerClick}
              title={key}
              name={key}
              icon={{
                url: `./clinic-medical-${
                  this.props.data.get(key).estatus_capacidad_uci
                }.png`,
                scaledSize: new this.props.google.maps.Size(54, 54),
              }}
              style={{ color: "red", backgroundColor: "blue" }}
              position={{
                lat: this.props.data.get(key).coordenadas[0],
                lng: this.props.data.get(key).coordenadas[1],
              }}
            />
          ))}
        </Map>
        <Card hospital={this.state} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDTBQ3ElkgSu78OT5mAxkTGPR5O04454-k",
})(MapContainer);
