const user = JSON.parse(localStorage.getItem('user'));
$("#logout").click(event => {
  event.preventDefault();
  firebase.auth().signOut().then(() => {
    window.location.href="/";
  }).catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
      alert(errorMessage);
    });
});

$("#shc-side-open").click(event => {
  event.preventDefault();
  if(user){
    const href = "/shopping-cart?uid="+user.uid;
    window.location = href;
  } else {
    alert("Please login to view cart");
  }
});
