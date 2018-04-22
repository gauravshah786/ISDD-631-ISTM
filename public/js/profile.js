$("#edit-profile").click(event => {
  event.preventDefault();
  const href = "/edit-profile?uid="+user.uid;
  window.location = href;
});

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

window.onload = () => {
  if (localStorage.getItem("user") !== undefined) {
    const param = { uid: user.uid };
    $.ajax({
      type: 'GET',
      data: param,
      contentType: 'application/json',
      url: '/profile',
      success: (response) => {
        $('#user-name').html(response.data.name);
        document.getElementById('profile-img').src = response.data.downloadURL;
        if ($( "#edit-usr-img").length) {
          document.getElementById('edit-usr-img').src = response.data.downloadURL;
        }
      }
    });
  }
}
