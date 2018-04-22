const user = JSON.parse(localStorage.getItem('user'));
if(!user){
    window.location.href = '/login';
}
$("#shc-side-open").click(event => {
  event.preventDefault();
  const href = "/shopping-cart?uid="+user.uid;
  window.location = href;
});
