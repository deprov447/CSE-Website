


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



// ParticlesJS Config.
particlesJS("particles-js", {
	"particles": {
	  "number": {
		"value": 80,
		"density": {
		  "enable": true,
		  "value_area": 1815.0682228903781
		}
	  },
	  "color": {
		"value": "#000000"
	  },
	  "shape": {
		"type": "circle",
		"stroke": {
		  "width": 1,
		  "color": "gray"
		},
		"polygon": {
		  "nb_sides": 4
		},
		"image": {
		  "src": "img/github.svg",
		  "width": 100,
		  "height": 100
		}
	  },
	  "opacity": {
		"value": 0.5,
		"random": false,
		"anim": {
		  "enable": false,
		  "speed": 1,
		  "opacity_min": 0.1,
		  "sync": false
		}
	  },
	  "size": {
		"value": 1,
		"random": true,
		"anim": {
		  "enable": false,
		  "speed": 40,
		  "size_min": 0.1,
		  "sync": false
		}
	  },
	  "line_linked": {
		"enable": true,
		"distance": 45,
		"color": "#000000",
		"opacity": 0.18211375360308336,
		"width": 1
	  },
	  "move": {
		"enable": true,
		"speed": 2,
		"direction": "none",
		"random": true,
		"straight": false,
		"out_mode": "out",
		"bounce": false,
		"attract": {
		  "enable": false,
		  "rotateX": 600,
		  "rotateY": 1200
		}
	  }
	},
	"interactivity": {
	  "detect_on": "window",
	  "events": {
		"onhover": {
		  "enable": true,
		  "mode": "grab"
		},
		"onclick": {
		  "enable": true,
		  "mode": "repulse"
		},
		"resize": true
	  },
	  "modes": {
		"grab": {
		  "distance": 300,
		  "line_linked": {
			"opacity": 1
		  }
		},
		"bubble": {
		  "distance": 400,
		  "size": 40,
		  "duration": 2,
		  "opacity": 8,
		  "speed": 3
		},
		"repulse": {
		  "distance": 200,
		  "duration": 0.4
		},
		"push": {
		  "particles_nb": 4
		},
		"remove": {
		  "particles_nb": 2
		}
	  }
	},
	"retina_detect": true
  });