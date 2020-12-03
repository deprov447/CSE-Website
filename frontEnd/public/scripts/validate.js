$(document).ready(function () {
  setInterval(() => {
    $.ajax({
      type: "GET",
      url: `${window.location.pathname}/users`,
      data: "user",
      cache: false,
      success: function (data) {
        window.localStorage.setItem("token", data);
        window.location.href = "/";
      },
      error: function (xhr, ajaxOptions, thrownError) {
        $.sweetModal({
          content: `User sign up failed, ${xhr.responseText}`,
          icon: $.sweetModal.ICON_ERROR,
          width: '30%',
          classes: ['error']
        });
      },
    });
  }, 6000);
});

console.log(window.location.pathname);
