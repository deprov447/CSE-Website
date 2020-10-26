$("#logout").click(function() {
    $.ajax({
        url: "/users/logout",
        type: 'POST',
        headers: {"Authorization": localStorage.getItem('token')},
        success: function (data) {
            window.localStorage.removeItem("token")
            alert("successfully logged out")
            location.href="/"
        },
      });
})