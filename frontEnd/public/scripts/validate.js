$("#btn").click(function () {

    $.ajax({
        type: "GET",
        url: `${window.location.pathname}/users`,
        data: "user",
        cache: false,
        success: function (data) {
            window.localStorage.setItem("token",data)
            window.location.href="/"
        },
		error: function (xhr, ajaxOptions, thrownError) {
            alert(`User sign up failed ${xhr.responseText}`)

        },
        
    });
})

console.log(window.location.pathname)