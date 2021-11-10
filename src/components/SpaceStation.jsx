import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../utils/SpaceStationApi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Loading from "./Loading";

const SpaceStation = () => {
  const [position, setPosition] = useState([]);
  const [geoLocation, setGeoLocation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    api
      .getLocation()
      .then((location) => {
        setPosition([location.latitude, location.longitude]);
        return api.getReverseGeocode(location.latitude, location.longitude);
      })
      .then((geocode) => {
        setGeoLocation(geocode);
      })
      .catch((error) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isError) {
    return (
      <p>
        Sorry we can't locate the Space Station right now. <br />
        Please try again later
      </p>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (position.length === 2 && geoLocation) {
    return (
      <div className="iss-live">
        <div className="iss-back-container">
          <Link to="/space/iss">
            <button className="button" id="iss-back-button">
              Back to ISS
            </button>
          </Link>
        </div>
        <h3>ISS Live Location</h3>
        <div className="onboarding-text-container">
          <p>The ISS is currently orbiting over {geoLocation}</p>
          <section className="spaceStationMap">
            <MapContainer
              className="MapContainer"
              center={position}
              zoom={1}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>{geoLocation}</Popup>
              </Marker>
            </MapContainer>
          </section>
        </div>
        <div className="onboarding-text-container">
          <p>Click the video to see a live feed from the ISS</p>
          <section className="spaceStationLiveFeed">
            <iframe
              title="liveFeed"
              width="350"
              height="180"
              src="https://ustream.tv/embed/17074538"
              scrolling="no"
              allowFullScreen
              webkitallowfullscreen="true"
              frameBorder="0"
            ></iframe>
            <p>
              If the video is dark - not to worry, it's probably night time
              amongst the stars! Try again later to see it in daylight{" "}
            </p>
          </section>
        </div>
        <div className="blank-box"></div>
      </div>
    );
  }
};

export default SpaceStation;
