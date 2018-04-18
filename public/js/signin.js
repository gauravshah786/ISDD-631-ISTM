var db = firebase.firestore();

$('#login').click((event) => {
    event.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
      db.collection("users").where("uid", "==", user.uid).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            localStorage.setItem('user', JSON.stringify(doc.data()));
            window.location.href="/";
        });
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
  });
