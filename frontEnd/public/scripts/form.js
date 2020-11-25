function detailsfunc() {
    var person = {
        name: $("#name").val(),
        image: $("#image").val(),
        hobbies: $("#hobbies").val()
    }
    console.log(person)
    $.ajax({
        url: '/formSubmit',
        type: 'post',
        headers: { "Authorization": localStorage.getItem('token') },
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            alert("Data saved!!!")
            window.location("/")

        },
        
        data: JSON.stringify(person)
    });

}