const { AFRAME } = window;
AFRAME.registerComponent("init-position", {
  schema: {
    position: { type: "vec3", default: "0 0 0" },
  },
  init: function () {
    this.el.setAttribute("position", this.data.position);
  },
});
