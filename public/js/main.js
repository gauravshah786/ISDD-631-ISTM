var user = JSON.parse(localStorage.getItem('user'));
if(user.name !== undefined){
    $("#user-name").html("Welcome, " + user.name);
}
