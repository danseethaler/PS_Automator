

// iframeObserver
var iframeObserver = new MutationObserver(function(mutations) {

    if (typeof window["bodyObserver_" + localStorage.scriptAction] == 'function') {
        window["bodyObserver_" + localStorage.scriptAction]();
    }
});

// Initialize iframeObserver
iframeObserver.observe(document.getElementById("ptifrmtgtframe").contentDocument, {attributes:true, childList:true, characterData:true, subtree:true})

function bodyObserver_generateTriggers(){
    if (localStorage.nextAction === "search" && !!document.getElementById("ptifrmtgtframe").contentDocument.getElementById("C_TL_TR_STAT_VW_EMPLID")) {
        document.getElementById("ptifrmtgtframe").contentDocument.getElementById("C_TL_TR_STAT_VW_EMPLID").value = "328548";
        localStorage.nextAction = "checkbox";

    }else if (localStorage.nextAction === "checkbox" && !!document.getElementById("ptifrmtgtframe").contentDocument.getElementById("TL_TR_STATUS_TA_STATUS")) {
        if(!document.getElementById("ptifrmtgtframe").contentDocument.getElementById("TL_TR_STATUS_TA_STATUS").checked){
            document.getElementById("ptifrmtgtframe").contentDocument.getElementById("TL_TR_STATUS_TA_STATUS").click();
        }
        localStorage.nextAction = "triggerDate";

    }else if (localStorage.nextAction === "triggerDate" && !!document.getElementById("ptifrmtgtframe").contentDocument.getElementById("TL_TR_STATUS_EARLIEST_CHGDT")) {
        // Initialize force change event code
        var changeEvent = document.createEvent("HTMLEvents");
        changeEvent.initEvent("change", true, true);

        // Set the trigger effective date
        document.getElementById("ptifrmtgtframe").contentDocument.getElementById("TL_TR_STATUS_EARLIEST_CHGDT").value = "052215" // JSON.parse(localStorage.thisTrigger).triggerDate;
        document.getElementById("ptifrmtgtframe").contentDocument.getElementById("TL_TR_STATUS_EARLIEST_CHGDT").dispatchEvent(changeEvent);

        setTimeout(function(){
            document.getElementById("ptifrmtgtframe").contentDocument.getElementById("#ICSave").click()
        },200);

        setTimeout(function(){
            document.getElementById("ptifrmtgtframe").contentDocument.getElementById("#ICList").click()
        },1000);
    }
}

    }else if (localStorage.nextAction === "saveData") {

    }

        // Set the trigger effective date
        document.getElementById("ptifrmtgtframe").contentDocument.getElementById("TL_TR_STATUS_EARLIEST_CHGDT").value = "052215" // JSON.parse(localStorage.thisTrigger).triggerDate;
        document.getElementById("ptifrmtgtframe").contentDocument.getElementById("TL_TR_STATUS_EARLIEST_CHGDT").dispatchEvent(changeEvent);

        setTimeout(function(){
            document.getElementById("ptifrmtgtframe").contentDocument.getElementById("#ICSave").click()
        },200);

        setTimeout(function(){
            document.getElementById("ptifrmtgtframe").contentDocument.getElementById("#ICList").click()
            observerIframe.reconnect();
        },1000);

    }
}



function nodeAddedIframe(newNode){
    if (!!newNode.id) {

        // If the search box exists (search page)
        if (newNode.id === "C_TL_TR_STAT_VW_EMPLID") {
            // Get the triggerList string from localStorage and convert it to an object
        //     var newTriggerlist = JSON.parse(localStorage.triggerList)
        //
        //     // If there are no elements left then stop observing and return false
        //     if (newTriggerlist.length === 0) {
        //         observerIframe.disconnect();
        //         observerBody.disconnect();
        //         return false;
        //     }
        //
        //     // Remove the first element of the object for this iteration
        //     localStorage.thisTrigger = JSON.stringify(newTriggerlist.pop());
        //
        //     // Update the localStorage.thisTrigger with the stringified version of the newTriggerlist
        //     localStorage.triggerList = JSON.stringify(newTriggerlist)
        //
            // Enter the ID number and click search
            document.getElementById("ptifrmtgtframe").contentDocument.getElementById("C_TL_TR_STAT_VW_EMPLID").value = "664985" // JSON.parse(localStorage.thisTrigger).empid;
        }

        // If the ECD date box exists (TL TR page)
        if (newNode.id === "TL_TR_STATUS_EARLIEST_CHGDT") {

            observerIframe.disconnect();


            if(!document.getElementById("ptifrmtgtframe").contentDocument.getElementById("TL_TR_STATUS_TA_STATUS").checked){
                document.getElementById("ptifrmtgtframe").contentDocument.getElementById("TL_TR_STATUS_TA_STATUS").click();
            }


        }
    }
}

function nodeAddedBody(newNode){

    // Click OK on the SQL error module popup.
    if (newNode.id === "#ICOK" && !!document.getElementById("popupTitleBarLeftImage")) {
        document.getElementById("#ICOK").click();
    }
}

var observerIframe = new MutationSummary({
    rootNode: document.getElementById("ptifrmtgtframe").contentDocument,
    callback: iframeMutations,
    queries: [{ element:"*" }]
});

var observerBody = new MutationSummary({
    callback: bodyMutations,
    queries: [{ element:"*" }]
});
