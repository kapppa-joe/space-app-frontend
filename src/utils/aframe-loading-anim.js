AFRAME.registerComponent("loading-anim", {
  schema: {
    enabled: { default: true },
  },
  init: function () {
    const loaderEl = document.querySelector("#aframe-loader");
    this.el.addEventListener("model-loaded", (e) => {
      loaderEl.remove();
    });
  },
});
