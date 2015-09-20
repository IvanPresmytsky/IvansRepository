		
		var firstSlide = document.querySelector(".slide-first");
		var secondSlide = document.querySelector(".slide-second");
		var thirdSlide = document.querySelector(".slide-third");
		var controlFirst = document.querySelector(".first-control");
		var controlSecond = document.querySelector(".second-control");
		var controlThird = document.querySelector(".third-control");
		var popup = document.querySelector(".write-us");
		var contacts = document.querySelector(".contacts .btn");
		var close = document.querySelector(".form-close");
		var login = popup.querySelector(".login");
		var mail = popup.querySelector(".e-mail");
		var mailText = popup.querySelector(".mail-text");
		var form = popup.querySelector("form");
		var storLogin = localStorage.getItem("login");
		var storMail = localStorage.getItem("e-mail");
		
		controlFirst.addEventListener("click", function(event){
			event.preventDefault();
			firstSlide.classList.add("slide-visible");
			controlFirst.classList.add("current");
			if (secondSlide.classList.contains("slide-visible")&&controlSecond.classList.contains("current")) {
				secondSlide.classList.remove("slide-visible");
				controlSecond.classList.remove("current");
				console.log("first control pressed");
			}
			if (thirdSlide.classList.contains("slide-visible")&&controlThird.classList.contains("current")) {
				thirdSlide.classList.remove("slide-visible");
				controlThird.classList.remove("current");
				console.log("first control pressed");
			}
			});
			
		controlSecond.addEventListener("click", function(event){
			event.preventDefault();
			secondSlide.classList.add("slide-visible");
			controlSecond.classList.add("current");
			if (firstSlide.classList.contains("slide-visible")&&controlFirst.classList.contains("current")) {
				firstSlide.classList.remove("slide-visible");
				controlFirst.classList.remove("current");
				console.log("second control pressed");
			}
			if (thirdSlide.classList.contains("slide-visible")&&controlThird.classList.contains("current")) {
				thirdSlide.classList.remove("slide-visible");
				controlThird.classList.remove("current");
				console.log("second control pressed");
			}
			});
			
		controlThird.addEventListener("click", function(event){
			event.preventDefault();
			thirdSlide.classList.add("slide-visible");
			controlThird.classList.add("current");
			if (firstSlide.classList.contains("slide-visible")&&controlFirst.classList.contains("current")) {
				firstSlide.classList.remove("slide-visible");
				controlFirst.classList.remove("current");
				console.log("third control pressed");
			}
			if (secondSlide.classList.contains("slide-visible")&&controlSecond.classList.contains("current")) {
				secondSlide.classList.remove("slide-visible");
				controlSecond.classList.remove("current");
				console.log("third control pressed");
			}
			});



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

		form.addEventListener("submit", function(event) {
			if (!(login.value&&mail.value)) {
				event.preventDefault();
				console.log("Введите логин и e-mail!!!");
			} else {
				localStorage.setItem("login", login.value);
				localStorage.setItem("e-mail", mail.value);
			}
		});