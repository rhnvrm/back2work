chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		//console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		var current = window.location.href;
		var bar = document.createElement("div");
			bar.innerHTML = chrome.i18n.getMessage("msgGetBackToWork");
			bar.style.color = "white"
			bar.style.backgroundColor = "dodgerblue";
			bar.style.textAlign = "center";
			bar.style.position="fixed"; 
			bar.style.padding = "2px";
			bar.style.zIndex = "10000";
			bar.style.borderRadius = "5px";

		var overlay = document.createElement("div");
			overlay.setAttribute("id", "overlay");
			overlay.style.width = "100%";
			overlay.style.height = "100%";
			overlay.style.background = "rgba(255,255,255,0.8)";
			overlay.style.top = "0";
			overlay.style.left = "0";
			overlay.style.position = "absolute";
			overlay.style.zIndex = "9999";

		var source = document.createElement("source");
			source.src = chrome.extension.getURL("src/assets/sounds/alert.ogg");
			source.type = "audio/ogg";

		var audio = document.createElement("audio")
			audio.setAttribute("loop", "true");
			audio.appendChild(source);

		chrome.storage.sync.get({
		    blackList: 'error',
		    notif_size: 'small',
		    notif_pos: '8',
		    sound_on: false
		}, function(items) {

			if(items.notif_size == 'medium'){
				bar.style.padding = "8px";
			}
			else if(items.notif_size == 'large'){
				bar.style.padding = "16px";
			}
			else{
				bar.style.padding = "4px";
			}
			
			if(items.notif_pos == 9){
				bar.style.top ="1%";
				bar.style.right ="1%";
			}
		    else if(items.notif_pos == 7) {   				
		    	bar.style.top ="1%";
				bar.style.left ="1%";
		    }
		    else if(items.notif_pos == 8) {
				bar.style.top ="1%";
				bar.style.left ="50%";
				console.log('here');
			}
			if(items.notif_pos == 6){
				bar.style.top ="50%";
				bar.style.right ="1%";
			}
		    else if(items.notif_pos == 4) {   				
		    	bar.style.top ="50%";
				bar.style.left ="1%";
		    }
		    else if(items.notif_pos == 5) {
				bar.style.top ="50%";
				bar.style.left ="50%";
			}
			if(items.notif_pos == 3){
				bar.style.bottom ="1%";
				bar.style.right ="1%";
			}
		    else if(items.notif_pos == 1) {   				
		    	bar.style.bottom ="1%";
				bar.style.left ="1%";
		    }
		    else if(items.notif_pos == 2) {
				bar.style.bottom ="1%";
				bar.style.left ="50%";
			}

		    if(items.blackList != 'error'){
				
				sites = items.blackList.replace(/\s/g, '').split(',');

				found = 0;

				for(var i in sites){
					//console.log(sites[i]);

					if(current.indexOf(sites[i]) != '-1' && found == 0){

						found = 1;

						insertBlur();
						insertBar();
						insertAudio(items.sound_on);
					}
				}


		    }
		    else{
		    	console.log('Back2Work: Error! Retrival of information failed! Resetting the Blacklist');
		    	
		    	var blist = 'facebook.com,reddit.com';

		    	chrome.storage.sync.set({
				    blackList: blist
				});

		    	sites = blist.replace(/\s/g, '').split(',');

				found = 0;

				for(var i in sites){
					//console.log(sites[i]);

					if(current.indexOf(sites[i]) != '-1' && found == 0){

						found = 1;

						insertBlur();
						insertBar();
						insertAudio(items.sound_on);
					}
				}
		    }
		});

		function insertAudio(sound_active){
			if(sound_active){
				document.body.insertBefore(audio, document.body.firstChild);
				audio.play();
			}
		}

		function insertBlur(){
			document.body.style.overflow = "hidden";
			document.body.insertBefore(overlay, document.body.firstChild);
		}

		function insertBar(){
			document.body.insertBefore(bar, document.body.firstChild);
		}

	}
	}, 10);
});