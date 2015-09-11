		var popup = document.querySelector(".write-us");
		var contacts = document.querySelector(".contacts .btn");
		var close = document.querySelector(".form-close");
		var login = popup.querySelector(".login");
		var mail = popup.querySelector(".e-mail");
		var mailText = popup.querySelector(".mail-text");
		var form = popup.querySelector("form");
		var storLogin = localStorage.getItem("login");
		var storMail = localStorage.getItem("e-mail");

		var btnDown = document.querySelector(".btn-down");
		var btnUp = document.querySelector(".btn-up");
		

		contacts.addEventListener("click", function(event){
			event.preventDefault();
			if (popup.classList.contains("write-us-fading")) {
				popup.classList.remove("write-us-fading");
			};
			popup.classList.add("write-us-visible");
			popup.classList.add("write-us-visible-anim")
			if (storLogin&&storMail) {
				login.value = storLogin;
				mail.value = storMail;	
				mailText.focus();
			} else{
				login.focus()}
		});

		close.addEventListener("click", function(event){
			event.preventDefault();
			popup.classList.add("write-us-fading");
			setTimeout(function() {
				popup.classList.remove("write-us-visible");
				popup.classList.remove("write-us-visible-anim");
			}, 520);	
		});

		window.addEventListener("keydown", function(event){
			if(event.keyCode == 27){
				if(popup.classList.contains("write-us-visible")){
					popup.classList.add("write-us-fading");
					setTimeout(function() {
						popup.classList.remove("write-us-visible");
						popup.classList.remove("write-us-visible-anim");
					}, 520);
				}
			}
		});

		form.addEventListener("submit", function(event){
			
			if (!(login.value&&mail.value)) {
				event.preventDefault();
				console.log("Введите логин и e-mail!!!");
			} else {
				localStorage.setItem("login", login.value);
				localStorage.setItem("e-mail", mail.value);
			}
		});

			btnUp.addEventListener("click", function() {
			if(btnDown.classList.contains("btn-active")) {
				btnDown.classList.remove("btn-active");
			}
		});