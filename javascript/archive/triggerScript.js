

var iframeObserver = new MutationObserver(function(mutations){

    var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

    // If the search field exists then search
    if (!!psIframe.getElementById("C_TL_TR_STAT_VW_EMPLID") && localStorage.nextAction === "search") {

        if (localStorage.triggerlist === undefined) {
            observerIframe.disconnect();
            observerBody.disconnect();
            return false;
        };

        // Get the triggerList string from localStorage and convert it to an object
        var newTriggerlist = JSON.parse(localStorage.triggerList)
    
        // If there are no elements left then stop observing and return false
        if (newTriggerlist.length === 0) {
            observerIframe.disconnect();
            observerBody.disconnect();
            return false;
        }
    
        // Remove the first element of the object for this iteration
        localStorage.thisTrigger = newTriggerlist.pop();
    
        // Update the localStorage.thisTrigger with the stringified version of the newTriggerlist
        localStorage.triggerList = newTriggerlist;
        
        // Enter the ID number and click search
        psIframe.getElementById("C_TL_TR_STAT_VW_EMPLID").value = localStorage.thisTrigger.empid;
        psIframe.getElementById("#ICSearch").click();

        localStorage.nextAction = "setValues";
    }

    if (psIframe.getElementById("TL_TR_STATUS_EARLIEST_CHGDT") && localStorage.nextAction === "setValues") {
        // Initialize force change event code
        var changeEvent = document.createEvent("HTMLEvents");
        changeEvent.initEvent("change", true, true);

        // Set the trigger effective date
        psIframe.getElementById("TL_TR_STATUS_EARLIEST_CHGDT").value = JSON.parse(localStorage.thisTrigger).triggerDate;
        psIframe.getElementById("TL_TR_STATUS_EARLIEST_CHGDT").dispatchEvent(changeEvent);
    }

    // If the TA status checkbox exists, click it
    if (!!psIframe.getElementById("TL_TR_STATUS_TA_STATUS") && localStorage.nextAction === "setValues") {

        // If the TA Needed box is already checked then save and return
        if(!!psIframe.getElementById("TL_TR_STATUS_TA_STATUS").checked){
            saveAndReturn();

        // Otheriwise check the box
        }else{
            psIframe.getElementById("TL_TR_STATUS_TA_STATUS").click();
        }
    }
});

var bodyObserver = new MutationObserver(function(mutations){

    for (var i = 0; i < mutations.length; i++) {

        if (mutations[i].target.id.substring(0,6) === "ptMod_") {

            if (checkIframeAndClass("popupText","<br>SQLExec: Failed to find a matching SQL stateme",false)) {

                document.getElementById("#ICOK").click();
                saveAndReturn();

            }
        }
    }
});

var observerConfig = {attributes:true, childList:true, characterData:true, subtree:true}

// Initialize iframeObserver
iframeObserver.observe(document.getElementById("ptifrmtgtframe").contentDocument, observerConfig)

// Initialize bodyObserver
bodyObserver.observe(document.body, {attributes:true, childList:true, characterData:true, subtree:true})

function saveAndReturn () {
    
    localStorage.nextAction = "search";

    var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

    setTimeout(function(){
    psIframe.getElementById("#ICSave").click()
    },100);

    setTimeout(function(){
        psIframe.getElementById("#ICList").click()
    },1000);
}

function checkIframeAndClass(nodeClass, nodeValue, useIframe){

	// Only looking for the node in the document body
	if (useIframe === false) {
		if (!!document.getElementsByClassName(nodeClass)[0]) {
			var workingNodes = document.getElementsByClassName(nodeClass);

			for (var i = 0; i < document.getElementsByClassName(nodeClass).length; i++) {
				if (workingNodes[i].innerHTML.substring(0,50) === nodeValue) {
					workingNodes[i].click();
					return true;
				}
			}

		}else {
			return false;
		}
	}

	// Looking for node in the iFrame
	if (!!document.getElementById("ptifrmtgtframe") && !!document.getElementById("ptifrmtgtframe").contentDocument.getElementsByClassName(nodeClass)[0]) {
		var workingNodes = document.getElementById("ptifrmtgtframe").contentDocument.getElementsByClassName(nodeClass);
	}else {
		return false;
	}

	for (var i = 0; i < workingNodes.length; i++) {
		if (workingNodes[i].innerHTML.substring(0,50) === nodeValue) {
			workingNodes[i].click();
			return true;
		}
	}
}
