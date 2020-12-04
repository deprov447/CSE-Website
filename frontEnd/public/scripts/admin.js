$("#quiz").hide();
$("#quizAns").hide();

if (window.localStorage.getItem("token") != null) {
  $("#signup").hide();
  $.ajax({
    url: "/adminVerify",
    type: "GET",
    headers: { Authorization: localStorage.getItem("token") },
    success: function (data) {
      showData(data);
      userName = data.user;
      displayName(userName);
    },
  });
} else {
  $("#logout").hide();
  $("#userName_display").hide();
}

function showData(data) {
  if (data.admin) {
    $("#quizAns").show();
  } else {
    $("#quiz").show();
  }
}

function displayName(userName) {
  document.getElementById("userName_display").innerHTML = userName;
}
