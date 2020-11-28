function detailsfunc() {
    var person = {
        name: $("#name").val(),
        image: $("#image").val(),
        hobbies: $("#hobbies").val()
    }
    
    $.ajax({
        url: '/formSubmit',
        type: 'post',
        headers: { "Authorization": localStorage.getItem('token') },
        cache:false,
        dataType: 'json',
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