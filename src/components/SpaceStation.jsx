import React, {useEffect, useState} from 'react';
import * as api from '../utils/SpaceStationApi'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Loading from './Loading';

const SpaceStation = () => {
    const [position, setPosition] = useState([]); 
    const [geoLocation, setGeoLocation] = useState({})
    const [isLoading, setIsLoading] = useState(true); 
    const [isError, setIsError] = useState(false); 


    useEffect(() => {

        setIsError(false); 
        setIsLoading(true); 

        api.getLocation()
        .then((location) => {
            setPosition([location.iss_position.latitude, location.iss_position.longitude]); 
            return api.getReverseGeocode(location.iss_position.latitude, location.iss_position.longitude) 
        })
        .then((geocode) => {
            setGeoLocation(geocode); 
        })
        .catch((error) => {
            setIsError(true)
        })
        .finally(() => {
            setIsLoading(false); 
        })
    }, []);

    if (isError) {
        return  (
            <p>Sorry we can't locate the Space Station right now. <br />Please try again later</p>
        )
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (position.length === 2 && geoLocation) {
        return (
            <>
            <section className="spaceStationMap">
                 <MapContainer className="MapContainer" center={position} zoom={0} scrollWheelZoom={false}>
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                    <Popup>
                        The Space Station is currently orbiting over {geoLocation}
                    </Popup>
                    </Marker>
                </MapContainer>
            </section> 
            <section className="spaceStationLiveFeed">
                <iframe title="liveFeed" width="480" height="270" src="https://ustream.tv/embed/17074538" scrolling="no" allowFullScreen webkitallowfullscreen="true" frameBorder="0"></iframe>
                <p>If the video is dark - not to worry, it's probably night time amongst the stars! Try again later to see it in daylight </p>
            </section>
            </>
        )
    }
}

export default SpaceStation;