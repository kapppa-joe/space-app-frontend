const modelList = [
  { name: "sun", "gltf-model": "./assets/3d-models/Sun.glb" },
  { name: "mercury", "gltf-model": "./assets/3d-models/Mercury.glb" },
  { name: "venus", "gltf-model": "./assets/3d-models/Venus.glb" },
  { name: "earth", "gltf-model": "./assets/3d-models/Earth.glb" },
  { name: "mars", "gltf-model": "./assets/3d-models/Mars.glb" },
  { name: "jupiter", "gltf-model": "./assets/3d-models/Jupiter.glb" },
  { name: "saturn", "gltf-model": "./assets/3d-models/Saturn.glb" },
  { name: "uranus", "gltf-model": "./assets/3d-models/Uranus.glb" },
  { name: "neptune", "gltf-model": "./assets/3d-models/Neptune.glb" },
  { name: "pluto", "gltf-model": "./assets/3d-models/Pluto.glb" },
  {
    name: "curiosity_rover",
    "gltf-model": "./assets/3d-models/curiosity_rover.glb",
  },
  { name: "hubble", "gltf-model": "./assets/3d-models/hubble.glb" },
  { name: "iss", "gltf-model": "./assets/3d-models/ISS.glb" },
  { name: "voyager", "gltf-model": "./assets/3d-models/Voyager.glb" },
];

const defaultModel = {
  name: "earth",
  "gltf-model": "./assets/3d-models/Earth.glb",
};

AFRAME.registerComponent("dynamic-load-model", {
  schema: {
    enabled: { default: true },
  },

  init: function () {
    const modelToLoad = getModel();
    if (modelToLoad) {
      for (const [key, value] of Object.entries(modelToLoad)) {
        if (key !== "name") {
          this.el.setAttribute(key, value);
        }
      }
    }
  },
});

function getModel() {
  const urlParams = new URLSearchParams(window.location.search);
  const modelName = urlParams.get("model");
  if (!modelName) {
    console.log("can't determine which model to load");
    return defaultModel;
  }
  return modelList.find((model) => model.name === modelName);
}
