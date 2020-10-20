


const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

// const signUpbtn = document.getElementById("signIn_btn");

// const signUp_username = document.getElementById("signUp_username")
// const signUp_email = document.getElementById("signUp_email")
// const signUp_password = document.getElementById("signUp_password")



sign_up_btn.addEventListener("click", () => {
	container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
	container.classList.remove("sign-up-mode");
});

//Making an AJAX request
// signUpbtn.addEventListener("click", (e) => {
// 	const xhr = new XMLHttpRequest();
// 	xhr.open("POST", "/users/signUp", true);
// 	xhr.getResponseHeader("Content-Type", "application/json");
// 	xhr.onload = function () {
// 		if (this.status == 200) {
// 			console.log(this.responseText)
// 		} else {
// 			console.log(this.responseText)
// 		}

// 	}

// 	var params = `{
// 		"username":"ma",
// 		"email":"B120076@iiit-bh.ac.in",
// 		"password":"sanddd123"
// 	}`
// 	// params = `{"name":"test34sad545","salary":"123","age":"23"}`;
// 	// console.log(JSON.stringify(params))
// 	xhr.send(params);
// })





// $('#target').html('sending..');
$("#signUp_btn").click(function () {
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
			console.log(data.msg)
			// $('#target').html(data.msg);
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(`User sign up failed ${xhr.responseText}`)
			// console.log()
		},
		data: JSON.stringify(person)
	});

})


