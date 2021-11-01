const markers = document.querySelectorAll("a-marker");

markers.forEach((markerEl) => {
  markerEl.addEventListener("markerFound", (e) => {
    window.parent.postMessage({
      msg: "marker found",
      from: "iframe",
    });
  });
  markerEl.addEventListener("markerLost", (e) => {
    window.parent.postMessage({
      msg: "marker lost",
      from: "iframe",
    });
  });
});
