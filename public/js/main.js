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

const itemName = {
  "breakfast-1":"Berry Jam Pancakes",
  "breakfast-2":"Eggs Royale",
  "breakfast-3":"Dosa Vada",
  "breakfast-4":"Belgian Waffle",
  "lunch-1":"Crispy Pork Chops",
  "lunch-2":"Enchiladas",
  "lunch-3":"Chicken Biryani",
  "lunch-4":"Sandwich",
  "dinner-1":"Noodles Soup",
  "dinner-2":"Chicken Satay",
  "dinner-3":"Dragon Chicken",
  "dinner-4":"Veg Chow Mein",
}

$(".fn-class").click(event => {
  event.preventDefault();
  $("#cart-list").addClass('surprise');
  const id = event.target.id;
  const qty = Number.parseInt($("#"+id+"-inp").val(), 10);
  const uid = user.uid;
  const price = itemPrice[id];
  const name = itemName[id];
  const item = {
    uid,
    id,
    qty,
    price,
    name
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
  setTimeout(() => $("#cart-list").removeClass('surprise'),2000);
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
        if(response.data.downloadURL){
          document.getElementById('profile-img').src = response.data.downloadURL;
          if ($( "#edit-usr-img").length) {
            document.getElementById('edit-usr-img').src = response.data.downloadURL;
          }
        } else {
          document.getElementById('profile-img').src = 'images/user-profile.jpg';
          if ($( "#edit-usr-img").length) {
            document.getElementById('edit-usr-img').src = 'images/user-profile.jpg';
          }
        }
      }
    });
  }
}
