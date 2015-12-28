chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		var current = window.location.href;

		chrome.storage.sync.get({
		    blackList: 'error'
		}, function(items) {
		    if(items.blackList != 'error'){
				
				sites = items.blackList.split(',');

				found = 0;

				for(var i in sites){
					//console.log(sites[i]);

					if(current.indexOf(sites[i]) != '-1' && found == 0){

						found = 1;

						var bar = document.createElement("div");
						bar.innerHTML = "GET BACK TO WORK!";
						bar.style.color = "white"
						bar.style.backgroundColor = "dodgerblue";
						bar.style.textAlign = "center";
						document.body.insertBefore(bar, document.body.firstChild);
						bar.style.position="fixed"; 
						bar.style.top ="1%";
						bar.style.left ="50%";
						bar.style.padding = "2px";
						bar.style.zIndex = "10000";
						bar.style.borderRadius = "5px";

					}
				}


		    }
		    else{
		    	console.log('Back2Work: Error! Retrival of information failed!')
		    }
		});

	}
	}, 10);
});