
function pageReady(){

	// Start watching for mutations if scriptAction is not null
	if (localStorage.scriptAction !== undefined) {

		// Navigate to the componentName
		if (localStorage.nextAction === "navToFavorite") {

			navToFavorite(localStorage.componentName);

		}else if (localStorage.nextAction === "createNewFavorite") {
			createNewFavorite();

		}else if (localStorage.nextAction === "addToFavorites") {
			addToFavorites();

		}else if (localStorage.nextAction === "search") {
			searchPage();

		}else if (localStorage.nextAction === "searchQuery") {
			// Initialize force change event code
            var changeEvent = document.createEvent("HTMLEvents");
            changeEvent.initEvent("change", true, true);

			document.getElementById("InputKeys_EMPLID").value = localStorage.empid;
			document.getElementById("InputKeys_EMPLID").dispatchEvent(changeEvent);

			document.getElementById("InputKeys_bind3").value = ppDate();
			document.getElementById("InputKeys_bind3").dispatchEvent(changeEvent);
			
			document.getElementById("#ICOK").click();

			console.log("Clearing local storage after searchQuery");
			localStorage.clear();

		}else if (localStorage.nextAction === "continue") {

			// Refresh process monitor
		    if (localStorage.scriptAction === "openProcessMonitor") {
		        var refreshButton = setInterval(function() {

		            var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

		            if (localStorage.scriptAction === undefined || !!document.getElementById("pt_modalMask")) {
		                clearInterval(refreshButton);

		            } else if (psIframe.getElementById("PMN_PRCSLIST_RUNSTATUSDESCR$0").innerHTML === "Success") {
		                alert("Processing complete");
		                clearInterval(refreshButton);

		            } else {
		                checkIframeAndID("REFRESH_BTN", "click")

		            }

		        }, 3000)
		    }

		}else {
			console.log("Clearing Storage: nextAction is not navToFavorite or search");
			localStorage.clear();
		}

	// Otherwise clear the localStorage
	}else {
		console.log("Clearing Storage: localStorage.scriptAction is undefined.");
		localStorage.clear();
	}
}