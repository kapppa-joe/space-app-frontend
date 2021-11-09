const filelist = [
  { name: "sun", path: "Sun.glb" },
  { name: "mercury", path: "Mercury.glb" },
  { name: "venus", path: "Venus.glb" },
  { name: "earth", path: "Earth.glb" },
  { name: "iss", path: "ISS.glb" },
  { name: "hubble", path: "hubble.glb" },
  { name: "moon", path: "Moon.glb" },
  { name: "mars", path: "Mars.glb" },
  { name: "curiosity_rover", path: "curiosity_rover.glb" },
  { name: "jupiter", path: "Jupiter.glb" },
  { name: "saturn", path: "Saturn.glb" },
  { name: "uranus", path: "Uranus.glb" },
  { name: "neptune", path: "Neptune.glb" },
  { name: "pluto", path: "Pluto.glb" },
  { name: "voyager", path: "Voyager.glb" },
];

const pathDir = process.env.PUBLIC_URL + "/assets/3d-models/";

const Models = {};
filelist.forEach(({ name, path }) => (Models[name] = { path: pathDir + path }));
export default Models;
