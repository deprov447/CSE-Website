function detailsfunc() {
    var person = {
        image: $("#image").val(),
        links: {
            instagram : $("#instagram").val(),
            twitter : $("#twitter").val(),
            facebook : $("#facebook").val(),
            linkedin : $("#linkedin").val(),
            github : $("#github").val(),
        }
    }
    
    $.ajax({
        url: '/formSubmit',
        type: 'post',
        headers: { "Authorization": localStorage.getItem('token') },
        contentType: 'application/json',
        success: function (data) {
            alert("Data saved!!!")
            location.href="/introduce"

        },
        error: function (xhr, ajaxOptions, thrownError) {
			alert(`Sorry you are not authorized`)
			
		},
        data: JSON.stringify(person)
    });

}