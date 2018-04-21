const user = JSON.parse(localStorage.getItem('user'));
if(!user){
    window.location.href = '/login';
} else {
  $("#logout").click(event => {
    event.preventDefault();
    firebase.auth().signOut().then(() => {
      window.location.href="/login";
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
        alert(errorMessage);
      });
  });

  $("#shc-side-open").click(event => {
    event.preventDefault();
      const href = "/shopping-cart?uid="+user.uid;
      window.location = href;
  });
}
