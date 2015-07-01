
chrome.runtime.onMessage.addListener (
  function(request, sender, sendResponse) {

	// Message sent back background.js indicating page is loaded.
	// Call the pageReady function to see if any action is needed.
	if (request.pageStatus === "complete" || request.pageStatus === "continue") {
		pageReady();

		clearObservers();

	// If a message is sent from the popup.js but the userid field exists then give a warning
	}else if (!!document.getElementById('userid') && request.scriptAction !== undefined) {

		localStorage.clear();

		// If user is at the login page, display an error message and do not continue.
		if (document.querySelector('.psloginframe').childNodes.length < 5) {
			var loginMessage = document.createElement('p');
			loginMessage.innerHTML = "Please login before continuing.";
			loginMessage.style.padding = "10px";
			loginMessage.style.color = "red";

			var loginDiv = document.querySelector('.psloginframe')
			loginDiv.insertBefore(loginMessage, loginDiv.childNodes[0]);
		}

	// This code only runs when the first message is sent from the popup.js.
	} else if (request.scriptAction !== undefined) {

        // Clear the local storage and take no further action
        if (request.scriptAction === "clearStorage") {
        	console.log("Clearing local storage - Popup DOM loaded");

			clearObservers();
			localStorage.clear();

			return;
        };

		// Set the evironment and system variables
		switch (window.location.host.substring(0,window.location.host.indexOf("."))){
			case "hrcore91":
	            localStorage.environment = "prod";
	            localStorage.system = "core";
				break;

			case "hrcore91-sg-stage":
	            localStorage.environment = "stage";
	            localStorage.system = "core";
				break;

			case "hradmin91":
	            localStorage.system = "admin";
	            localStorage.environment = "prod";
				break;

			case "hradmin91-sg-stage":
	            localStorage.system = "admin";
	            localStorage.environment = "stage";
				break;

			default:
	            localStorage.system = undefined;
	            localStorage.environment = undefined;
		}

		 // Return the environment variable if requested
	  	if (request.scriptAction === "getSystem") {
	  		sendResponse({system: localStorage.system});
	  		return;
	  	};

		// Add request properties to localStorage
		for (var property in request) {
			if (request.hasOwnProperty(property)) {
				localStorage[property] = request[property];
			}
		}

        // Create the Search Criteria object
        var searchCriteriaObj = createSearchCriteriaObj();

        // Add search properties to localStorage
        if (searchCriteriaObj[localStorage.scriptAction] !== undefined) {
            for (var searchSetting in searchCriteriaObj[localStorage.scriptAction]) {
                if (searchCriteriaObj[localStorage.scriptAction].hasOwnProperty(searchSetting)) {
                    localStorage[searchSetting] = searchCriteriaObj[localStorage.scriptAction][searchSetting]
                }
            }
        }

		openNewWin(localStorage.componentName);
	}
});
