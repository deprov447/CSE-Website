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
    if (data.admin) {
        $("#first").show();
    } 
}

var number=1;
var maxValue=20

var idIn = document.querySelector("#id-in")
idIn.setAttribute("max",maxValue)
idIn.setAttribute("min",1)
var prev = document.querySelector("#prev")
var next = document.querySelector("#next")
var stuName = document.querySelector("#stuName")

function changeEv(number){
    idIn.value=number;
    stuName.innerHTML=number;
    //Add other fields later
}

idIn.addEventListener("input",(event)=>{
    number=event.target.value;
    if(isNaN(number)){
        alert("Input a number")
    }
    else
        changeEv(number);
})

prev.addEventListener("click",()=>{
    if(number>1){
        number--;
        changeEv(number);
    }
})

next.addEventListener("click",()=>{
    if(number<maxValue){
        number++;
        changeEv(number);
    }
})

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            if(number>1){
                number--;
                changeEv(number);
            }
            break;
        case 39:
            if(number<maxValue){
                number++;
                changeEv(number);
            }
            break;
    }
};