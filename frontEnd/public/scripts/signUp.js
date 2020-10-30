


const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");





sign_up_btn.addEventListener("click", () => {
	container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
	container.classList.remove("sign-up-mode");
});

function signUpfunc() {
	var person = {
		username: $("#signUp_username").val(),
		email: $("#signup_email").val(),
		password: $("#signUp_password").val()
	}
	$.ajax({
		url: '/users/signUp',
		type: 'post',
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			alert("Please validate your email by clicking on the link sent to your mail")
			window.localStorage.setItem("token",data.token)
			
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(`User sign up failed, ${xhr.responseText}`)
			
		},
		data: JSON.stringify(person)
	});

}
function signInfunc() {
	var person = {
		
		email: $("#signIn_email").val(),
		password: $("#signIn_password").val()
	}
	$.ajax({
		url: '/users/login',
		type: 'post',
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			
			window.localStorage.setItem("token",data.token)
			window.location.href = "/"
			
			
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(`User sign up failed, ${xhr.responseText}`)
			
		},
		data: JSON.stringify(person)
	});

}


