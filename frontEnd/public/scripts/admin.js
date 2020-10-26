$("#quiz").hide();
// $("#quizAns").hide();

if (window.localStorage.getItem("token") != null) {

    $.ajax({
        url: "/adminVerify",
        type: 'GET',
        headers: {"Authorization": localStorage.getItem('token')},
        success: function (data) {
            
            showData(data);
        },
      });
}

function showData(data) {
    console.log(data.admin)
    if(data.admin){
        $("#quizAns").show();
    }else{
        
        $("#quiz").show();
    }
}