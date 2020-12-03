$(document).ready(function () {
  function toggleSidebar() {
    $(".button").toggleClass("active");
    $("main").toggleClass("move-to-left");
    $(".sidebar-item").toggleClass("active");
  }

  $(".button").on("click tap", function () {
    toggleSidebar();
  });

  $(document).keyup(function (e) {
    if (e.keyCode === 27) {
      toggleSidebar();
    }
  });

  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);

  $("<link/>", {
    rel: "stylesheet",
    type: "text/css",
    href: "https://sweet-modal.adepto.as/css/jquery.sweet-modal.min.css",
  }).appendTo("head");

  var xDown = null;
  var yDown = null;

  function getTouches(evt) {
    return (
      evt.touches || // browser API
      evt.originalEvent.touches
    ); // jQuery
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        toggleSidebar();
      } else {
        toggleSidebar();
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }
});
