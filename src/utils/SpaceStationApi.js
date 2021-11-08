import axios from "axios";

const spaceStationApi = axios.create({
  baseURL: "http://api.open-notify.org/iss-now.json",
});

const reverseGeocodeApi = axios.create({
  baseURL: "https://api.bigdatacloud.net/data/reverse-geocode-client",
});

export const getLocation = () => {
  return spaceStationApi.get("/").then(({ data }) => {
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
