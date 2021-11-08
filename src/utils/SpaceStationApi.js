import axios from "axios";

const spaceStationApi = axios.create({
  baseURL: "https://api.wheretheiss.at/v1/satellites/25544",
});

const reverseGeocodeApi = axios.create({
  baseURL: "https://api.bigdatacloud.net/data/reverse-geocode-client",
});

export const getLocation = () => {
  return spaceStationApi.get("/").then(({ data }) => {
    console.log(data);
    return data;
  });
};

export const getReverseGeocode = (latitude, longitude) => {
  return reverseGeocodeApi
    .get("/", { params: { latitude, longitude, localityLanguage: "en" } })
    .then(({ data }) => {
      if (data.countryName) {
        return data.countryName;
      }
      return data.localityInfo.informative[0].name;
    });
};
