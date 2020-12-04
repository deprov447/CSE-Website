function detailsfunc() {
  var person = {
    image: $("#image").attr("src"),
    links: {
      favLink: $("#favLink").val(),
    },
    desc:$("#desc").val(),
  };

  $.ajax({
    url: "/formSubmit",
    type: "post",
    headers: { Authorization: localStorage.getItem("token") },
    contentType: "application/json",
    success: function (data) {
      $.sweetModal({
        content: 'Data Saved',
        icon: $.sweetModal.ICON_SUCCESS,
        width: '30%',
        classes: ['error']
      });
      location.href = "/introduce";
    },
    error: function (xhr, ajaxOptions, thrownError) {
      $.sweetModal({
        content: 'You are not authorized',
        icon: $.sweetModal.ICON_WARNING,
        width: '30%',
        classes: ['error']
      })
    },
    data: JSON.stringify(person),
  });
}
