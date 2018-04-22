$('#register').click((event) => {
  event.preventDefault();
  const name = $('#name').val();
  const email = $('#email').val();
  const password = $('#password').val();
  const confirmpwd = $('#confirmpwd').val();
  if (password != confirmpwd) {
    alert('Passwords do not match');
    return;
  }
  // Sign up with email and pass.
  else {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
      const tempUser = {
          name: name,
          email: email,
          uid: user.uid,
          downloadURL: 'images/user-profile.jpg'
      };
      db.collection("users").add(tempUser).then(()=> {
          localStorage.setItem('user', JSON.stringify(tempUser));
          window.location.href="/";
      }).catch(error => {
        console.error("Error adding document: ", error);
      });
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
    });
  }
});
