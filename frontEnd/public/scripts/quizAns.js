$("#first").hide();



$.ajax({
    url: "/adminVerify",
    type: 'GET',
    headers: { "Authorization": localStorage.getItem('token') },
    success: function (data) {

        showData(data);
    },
});


function showData(data) {
    console.log(data.admin)
    if (data.admin) {
        $("#first").show();
    } 
}