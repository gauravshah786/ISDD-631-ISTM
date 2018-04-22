const getLocation = () => {
  //Getting current location's co-ordinates
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      // get Location from lat and long
      const googleKey = "AIzaSyDT5C67yEp1K0Ccn9mFv0eT3OLoghcyodM";
      const googleURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
      const reverseGeocodingURL = googleURL + lat + "," + long + "&key=" + googleKey;

      $.getJSON(reverseGeocodingURL, reverseLocJSON => {
        for (let i = 0; i < reverseLocJSON.results[0].address_components.length; i++) {
          const component = reverseLocJSON.results[0].address_components[i];
          if(component.types[0] == "locality") {
            $("#pick-location").html(component.long_name);
            const today = new Date();
            const time = today.getHours() + 1;
            $("#time").html(time + ":00");
            const randomNumber = Math.ceil(Math.random()*5);
            const path = "images/offer_" + randomNumber + ".jpg";
            document.getElementById("offer-img").src = path;
          }
        }
      });
    });
  }
};

$(document).ready(() => {
    getLocation();
});
