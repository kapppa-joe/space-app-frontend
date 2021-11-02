/*
 *  Custom script to load different 3d models upon query.
 */

const modelList = [
  { name: "sun", "gltf-model": "./assets/3d-models/Sun.glb" },
  { name: "mercury", "gltf-model": "./assets/3d-models/Mercury.glb" },
  {
    name: "venus",
    "gltf-model": "./assets/3d-models/Venus.glb",
    gammaFactor: 1.8,
  },
  { name: "earth", "gltf-model": "./assets/3d-models/Earth.glb" },
  { name: "moon", "gltf-model": "./assets/3d-models/Moon.glb" },
  {
    name: "mars",
    "gltf-model": "./assets/3d-models/Mars.glb",
    gammaFactor: 1.5,
  },
  { name: "jupiter", "gltf-model": "./assets/3d-models/Jupiter.glb" },
  {
    name: "saturn",
    "gltf-model": "./assets/3d-models/Saturn.glb",
    scaleFactor: 0.6,
  },
  { name: "uranus", "gltf-model": "./assets/3d-models/Uranus.glb" },
  { name: "neptune", "gltf-model": "./assets/3d-models/Neptune.glb" },
  { name: "pluto", "gltf-model": "./assets/3d-models/Pluto.glb" },
  {
    name: "curiosity_rover",
    "gltf-model": "./assets/3d-models/curiosity_rover.glb",
    scaleFactor: 1.5,
    gammaFactor: 2.5,
  },
  { name: "hubble", "gltf-model": "./assets/3d-models/hubble.glb" },
  {
    name: "iss",
    "gltf-model": "./assets/3d-models/ISS.glb",
    scaleFactor: 0.6,
  },
  { name: "voyager", "gltf-model": "./assets/3d-models/Voyager.glb" },
];

// the default model to be loaded when query is not received
const defaultModel = {
  name: "earth",
  "gltf-model": "./assets/3d-models/Earth.glb",
};

// AFRAME component for this
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
        if (key === "scaleFactor") {
          const scaleFactor = value;
          const currScale = this.el.getAttribute("scale");
          const newScale = Object.values(currScale)
            .map((scale) => scale * scaleFactor)
            .join(" ");
          this.el.setAttribute("scale", newScale);
        }
      }
    }
  },
});

AFRAME.registerComponent("adjust-color-model", {
  schema: {
    enabled: { default: true },
  },
  init: function () {
    const modelToLoad = getModel();
    this.el.renderer.gammaOutput = true;
    if (modelToLoad && modelToLoad.gammaFactor) {
      this.el.renderer.gammaFactor = modelToLoad.gammaFactor;
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
