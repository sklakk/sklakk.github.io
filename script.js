
	// UI comp
	const startBtn = document.createElement("button");
	startBtn.innerHTML = "Start listening";
	const result = document.createElement("div");
	const processing = document.createElement("p");
	
	document.body.append(startBtn);
	document.body.append(result);
	document.body.append(processing);
	const chk=3000;
	const sv=500;
	
	// speech to text
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	let toggleBtn = null;
	if (typeof SpeechRecognition === "undefined") {
		startBtn.remove();
		result.innerHTML = "<b>Browser does not support Speech API. Please download latest chrome.<b>";
	} else {
		const recognition = new SpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = false;
		recognition.onresult = event => {
			const last = event.results.length - 1;
			const res = event.results[last];
			const text = res[0].transcript;
			if (res.isFinal) {
				processing.innerHTML = "processing ....";

				const response = process(text);
				const p = document.createElement("p");
				//p.innerHTML = `You said: ${text} </br>Siri said: ${response}`;
				processing.innerHTML = "";
				//result.appendChild(p);

				// read it out
				speechSynthesis.speak(new SpeechSynthesisUtterance(response));
			} else {
				processing.innerHTML = `listening: ${text}`;
			}
		}
		let listening = false;
		toggleBtn = () => {
			if (listening) {
				recognition.stop();
				startBtn.textContent = "Start listening";
			} else {
				recognition.start();
				startBtn.textContent = "Stop listening";
			}
			listening = !listening;
		};
		startBtn.addEventListener("click", toggleBtn);

	}

	// processor
	function process(rawText) {
		let text = rawText;
		text = text.toLowerCase();
		let response = null;
		if (text.includes("transfer")){
			var splitText = text.split(" ");
			console.log(text);
			var fromAccountIndex = splitText.indexOf("from")+2;
			var fromAccount = splitText[fromAccountIndex];
			var initText = "Initiating transfer from ";
			var toAccountIndex = splitText.indexOf("to")+2;
			var toAccount = splitText[toAccountIndex];
			response = initText.concat(fromAccount," account to ",toAccount," account");
			setTimeout(function(){
document.getElementById("chk").innerHTML = "$2000";
			document.getElementById("sv").innerHTML = "$1500";

}, 5000)
			
		}
		if (!response) {
			
			return `I am sorry I was unable to understand the request`;
		}
		return response;
	}