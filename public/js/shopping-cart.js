const db = firebase.firestore();
const cartRef = db.collection('cart');

$("input[type=number]").on('input', (event) => {
  const id = "#" + event.target.id;
  const cartTotal = Number.parseInt($("#cart-total").html(), 10);
  const prevTotal = Number.parseInt($(id + "-total").html(), 10);
  const qty = $(id).val();
  const price = Number.parseInt($(id+"-price").html(), 10);
  const updatedCurTotal = qty*price;
  const newTotal = cartTotal - prevTotal + updatedCurTotal;
  $(id + "-total").html(updatedCurTotal);
  $("#cart-total").html(newTotal);
  cartRef
  .where('uid','==', user.uid)
  .where('id', '==', event.target.id)
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      cartRef.doc(doc.id).update({
        qty:qty
      })
    })
  })
  .catch(err => {
    console.log('Error updating documents', err);
  });
});

$('.remove').click(event => {
  const cartQty = Number.parseInt($('#cart-qty').html(), 10) - 1;
  $('#cart-qty').html(cartQty);
  const common = event.target.id.substring(0,event.target.id.length-6);
  const id = '#' + event.target.id.substring(0,event.target.id.length-6) + '-li';
  const cartTotal = Number.parseInt($('#cart-total').html(), 10);
  const prevTotal = Number.parseInt($('#' + common + '-total').html(), 10);
  const newTotal = cartTotal - prevTotal;
  if(newTotal == 0){
    $('#cart-message').parent().addClass("empty");
    $('#removable').remove();
  } else {
    $('#cart-total').html(newTotal);
    $(id).remove();
  }
  cartRef
  .where('uid','==', user.uid)
  .where('id', '==', common)
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      cartRef.doc(doc.id).delete().catch(error => {
          console.error("Error removing document: ", error);
        });
    })
  })
  .catch(err => {
    console.log('Error removing documents', err);
  });
});

$("#confirm-order").click(event => {
  event.preventDefault();
  if(user){
    const href = "/checkout?uid="+user.uid;
    window.location = href;
  }
});
