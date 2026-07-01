// Safety check — don't crash if geometry not saved
if (listing.geometry && listing.geometry.coordinates) {
  const coordinates = listing.geometry.coordinates; // [lng, lat]

  const map = new maplibregl.Map({
    container: "map",
    // ✅ MapTiler tiles using your API key
    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${mapToken}`,
    center: coordinates,
    zoom: 9,
  });

  // ✅ Marker with popup
  new maplibregl.Marker({ color: "#FE424D" })
    .setLngLat(coordinates)
    .setPopup(
      new maplibregl.Popup({ offset: 25 }).setHTML(
        `<h6>${listing.title}</h6>
         <p>${listing.location}, ${listing.country}</p>`
      )
    )
    .addTo(map);

} else {
  document.getElementById("map").innerHTML =
    `<p class='text-muted text-center pt-4'>Map not available for this listing.</p>`;
}