$("#first").hide();

$.ajax({
  url: "/adminVerify",
  type: "GET",
  headers: { Authorization: localStorage.getItem("token") },
  success: function (data) {
    renderCorrespondent();
    showData(data);
  },
  error: function (xhr, ajaxOptions, thrownError) {
    alert(`User not signed-In`);
    location.href = "/";
  },
});

function showData(data) {
  if (data.admin) {
    $("#first").show();
  }
}

function renderCorrespondent(params = "") {
  $.ajax({
    url: `/QuizAns/data?roll=${params}`,
    type: "GET",
    headers: { Authorization: localStorage.getItem("token") },
    success: function (data) {
      if (data.data.ID != undefined) {
        stuName.innerHTML = data.data.ID;
        number = parseInt(data.data.ID.slice(5, 7));
        idIn.value = number;
        console.log(data.data);
      } else {
        stuName.innerHTML = "No correspondent";
      }
    },
  });
}

var number;
var maxValue = 100;

var idIn = document.querySelector("#id-in");
idIn.setAttribute("max", maxValue);
idIn.setAttribute("min", 0);
var prev = document.querySelector("#prev");
var next = document.querySelector("#next");
var stuName = document.querySelector("#stuName");

function changeEv(number) {
  console.log(number);
  idIn.value = number;
  renderCorrespondent(idIn.value.toString());
  // stuName.innerHTML = "b1200" + number;
  //Add other fields later
}

idIn.addEventListener("input", (event) => {
  number = event.target.value;
  changeEv(number);
  if (isNaN(number)) {
    alert("Input a number");
  }
});

prev.addEventListener("click", () => {
  if (number > 1) {
    number--;
    changeEv(number);
  }
});

next.addEventListener("click", () => {
  if (number < maxValue) {
    number++;
    changeEv(number);
  }
});

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 37:
      if (number > 1) {
        number--;
        changeEv(number);
        var tip = document.querySelector("#tip");
        tip.parentNode.removeChild(tip);
      }
      break;
    case 39:
      if (number < maxValue) {
        number++;
        changeEv(number);
        var tip = document.querySelector("#tip");
        tip.parentNode.removeChild(tip);
      }
      break;
  }
  var tip = document.querySelector("#tip");
  tip.parentNode.removeChild(tip);
};
