var downloadURL;

$('#update').click(event => {
  event.preventDefault();
  const name = $('#name').val();
  const email = $('#email').val();
  const phone = $('#phone').val();
  const param = {
    uid: user.uid,
    name,
    email,
    phone,
    downloadURL
  };
  $.ajax({
    type: 'POST',
    data: JSON.stringify(param),
    contentType: 'application/json',
    url: '/updateProfile',
    success: (response) => {
      $('#user-name').html(name);
      $('#success-alert').removeClass('hidden');
      if(downloadURL){
        document.getElementById('profile-img').src = downloadURL;
        document.getElementById('edit-usr-img').src = downloadURL;
        $('#imageFile').val('');
      }
    }
  });
});

$('#imageFile').on('change', (e) => {
  // Get File
  const file = e.target.files[0];
  fileName = file.name;
  // Create a storage place for file
  const storageRef = storage.ref('images/'+file.name);
  // Upload file
  const task = storageRef.put(file).then(snapshot => {
    downloadURL = snapshot.downloadURL;
  }).catch(err => {
    console.log("Error in uploading file", err);
  });
});
