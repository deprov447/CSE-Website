$("#quiz").hide();
$("#quizAns").hide();

if (window.localStorage.getItem("token") != null) {
    $("#signup").hide();
    $.ajax({
        url: "/adminVerify",
        type: 'GET',
        headers: {"Authorization": localStorage.getItem('token')},
        success: function (data) {
            
            showData(data);
        },
      });
}else{
    $("#logout").hide()
}

function showData(data) {
    
    if(data.admin){
        $("#quizAns").show();
    }else{
        
        $("#quiz").show();
    }
}