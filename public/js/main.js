const itemPrice = {
  "breakfast-1":10,
  "breakfast-2":5,
  "breakfast-3":7,
  "breakfast-4":8,
  "lunch-1":15,
  "lunch-2":12,
  "lunch-3":14,
  "lunch-4":20,
  "dinner-1":10,
  "dinner-2":15,
  "dinner-3":20,
  "dinner-4":15,
}

$(".fn-class").click(event => {
  event.preventDefault();
  const id = event.target.id;
  const qty = Number.parseInt($("#"+id+"-inp").val(), 10);
  const uid = user.uid;
  const price = itemPrice[id];
  const item = {
    uid,
    id,
    qty,
    price
  };
  $('#' + id).prop('disabled',true);
  $('#' + id).html("Added");
  $('#' + id + '-inp').prop('disabled',true);
  db.collection("cart").add(item).then(() => {
    const cartQty = Number.parseInt($('#cart-qty').html(), 10) + 1;
    $('#cart-qty').html(cartQty);
  }).catch(error => {
    console.error("Error adding cart item: ", error);
  });
});

window.onload = () => {
  if (localStorage.getItem("user") !== undefined) {
    const data = { uid: user.uid };
    $.ajax({
      type: 'GET',
      data: data,
      contentType: 'application/json',
      url: '/cartdata',
      success: (response) => {
        $('#cart-qty').html(response.data.length);
        for (let item of response.data) {
          const id = item.id;
          $('#' + id).prop('disabled',true);
          $('#' + id).html("Added");
          $('#' + id + '-inp').val(item.qty);
          $('#' + id + '-inp').prop('disabled',true);
        }
      }
    });
    $.ajax({
      type: 'GET',
      data: data,
      contentType: 'application/json',
      url: '/profile',
      success: (response) => {
        $('#user-name').html(response.data.name);
        const imagePath = 'images/'+ response.data.fileName;
        storage.ref().child(imagePath).getDownloadURL().then((url) => {
          var profile_img = document.getElementById('profile-img');
          profile_img.src = url;
        }).catch((error) => {
          // Handle any errors
          console.log(error);
        });
      }
    });
  }
}

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
            console.log(component.long_name);
          }
        }
      });
    });
  }
};

$(document).ready(() => {
    getLocation();
});
