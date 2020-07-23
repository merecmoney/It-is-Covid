import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './marker.svg'
import Button from '@material-ui/core/Button';



function MapContainer({ locations = [], center = { lat: 19.360884, lng: -99.1495166 }, history = true, numLocations = 0, points = [] }) {
    const [state, setState] = useState({ showBadge: new Array(numLocations).fill(0).map(() => false) });

    const handleClick = (event) => {
        setState((prevState) => {
            const newState = { ...prevState };
            newState.showBadge = newState.showBadge.map((val, ix) => {
                if (ix == event.target.id) {
                    return true
                } else {
                    return false
                }
            })
            return newState;
        })
    };
    const handleClose = () => {
        setState((prevState) => {
            const newState = { ...prevState };
            newState.showBadge = newState.showBadge.map(() => false)
            return newState;
        })
    };

    return (
        <div className="Map" >
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDUMQQPU_1PuZdrqKFrRzFlYs-4W6WGrpo" }}
                defaultCenter={{ lat: center.lat, lng: center.lng }}
                defaultZoom={18}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >
                {locations.map((location, ix) => {
                    const date = new Date(location.date);
                    if (ix === (locations.length - 1)) {
                        return (
                            <div lat={location.lat} lng={location.lng}>
                                <img id={ix} onClick={handleClick} src={Marker} style={{ position: 'absolute', width: '24px', cursor: 'pointer', borderRadius: '20px', color: 'red' }} />

                                {state.showBadge[ix] && <div className='Card'
                                    style={{ zIndex: 100, backgroundColor: 'rgb(131,199,181)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', fontSize: '16px', color: 'white', borderRadius: '20px', width: '300px', height: '200px', margin: '20px', position: 'absolute' }} >
                                    <p>Latitud: {location.lat.toFixed(5)}</p>
                                    <p>Longitud: {location.lng.toFixed(5)}</p>
                                    <p>{date.toUTCString().substring(0, 26)}</p>
                                    <Button variant="contained" style={{ backgroundColor: 'white', color: 'rgb(131,199,181)', }} onClick={handleClose}>close</Button>
                                </div>}
                            </div>)
                    } else {
                        if (history) {
                            return (
                                <div lat={location.lat} lng={location.lng}>
                                    <img id={ix} onClick={handleClick} src={Marker} style={{ position: 'absolute', width: '16px', cursor: 'pointer', borderRadius: '20px', opacity: 0.2, color: 'red' }} />
                                    {state.showBadge[ix] && <div className='Card'
                                        style={{ zIndex: 100, backgroundColor: 'rgb(131,199,181)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', fontSize: '16px', color: 'white', borderRadius: '20px', width: '300px', height: '200px', margin: '20px', position: 'absolute' }}>
                                        <p>Latitud: {location.lat.toFixed(5)}</p>
                                        <p>Longitud: {location.lng.toFixed(5)}</p>
                                        <p>{date.toUTCString().substring(0, 26)}</p>
                                        <Button variant="contained" style={{ backgroundColor: 'white', color: 'rgb(131,199,181)', }} onClick={handleClose}>close</Button>
                                    </div>}
                                </div>)
                        }
                    }

                })}
            </GoogleMapReact>

        </div >
    );
}


export default MapContainer;
