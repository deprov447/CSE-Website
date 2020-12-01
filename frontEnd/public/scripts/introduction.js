$(".hover").mouseleave(function () {
  $(this).removeClass("hover");
});

$("#formLink").hide();
$(document).ready(function () {
  if (window.localStorage.getItem("token") != null) {
    $.ajax({
      url: "/adminVerify",
      type: "GET",
      headers: { Authorization: localStorage.getItem("token") },
      success: function (data) {
        showData(data);
      },
      error: function (xhr, ajaxOptions, thrownError) {},
    });
  }
});

function showData(data) {
  if (!data.admin) {
    $("#formLink").show();
  }
}
