function iframeObserver_generateRetros (mutations, iframeObserver) {
    // Loop through all the changes
    for (var i = 0; i < mutations.length; i++) {

        // Check if there's a change for the SAVED_win0
        if (mutations[i].target.id === "SAVED_win0"){

            // Set the iframe variable
            var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

            // If the style of the SAVED_win0 === block --> the page has been saved
            if (psIframe.getElementById("SAVED_win0").style.display === "block" && psIframe.getElementById("ptStatusText_win0").innerHTML !== "Saving...") {

                // Disconnect the iframeObserver
                iframeObserver.disconnect();

                // Return to search
                setTimeout(function(){
                    // If the search field doesn't exist go back to the search page.
                    if (!psIframe.getElementById("PAY_LINE_WORK_EMPLID")) {
                        document.getElementById("pthnavbccrefanc_HC_PAY_SHEET_LINE_USA2").click(); 
                    };
                    
                },600);

                // If the search field shows up and this code is still running the link didn't initiate a page reload
                var lookingForSearchNode = setInterval(function(){

                    // Set the iframe variable
                    var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

                    if (!!psIframe.getElementById("PAY_LINE_WORK_EMPLID")) {

                        clearInterval(lookingForSearchNode);

                        // Call pageReady()
                        pageReady();
                    };
                },700);

                return;
            }
        }
    }
}



function startSearchingPage() {

    var waitingForSearchID = setInterval(function() {

        if (checkIframeAndID(localStorage.searchFieldID)) {

            // If there is a bodyObserver function setup then start mutation watching
            if (typeof window["bodyObserver_" + localStorage.scriptAction] == 'function') {
                startMutationWatchingBody();
            }

            // If there is a iframeObserver function setup then start mutation watching
            if (typeof window["iframeObserver_" + localStorage.scriptAction] == 'function') {
                startMutationWatchingIframe();
            }

            searchPage();
            clearInterval(waitingForSearchID);
        };

    }, 600)
}


// Declare the iframe variable
var psIframe = document.getElementById("ptifrmtgtframe").contentDocument

// Add a new row to the employee
psIframe.getElementById("$ICField12$new$0$$0").click()

// Instantiate event listener
var changeEvent = psIframe.createEvent("HTMLEvents");
changeEvent.initEvent("change", true, true);

// Set the date
psIframe.getElementById("JOB_EFFDT$0").value = "6/20/2015"
psIframe.getElementById("JOB_EFFDT$0").dispatchEvent(changeEvent);
psIframe.getElementById("JOB_ACTION$0").value = "TER"
psIframe.getElementById("JOB_ACTION$0").dispatchEvent(changeEvent);

// Set the Job Action Reason to TMP
psIframe.getElementById("JOB_ACTION_REASON$0").value = "TMP"

// Navigate to the Rehire tab
psIframe.querySelector("[name='#ICPanel13']").click()

// Click the Yes radio button on eligible for rehire
psIframe.getElementById("C_EMPLOYMENT_C_SUITABLE_FOR_REH").click()

// Save
psIframe.getElementById("#ICSave").click()

// Click through any Popups
document.getElementById("#ICOK").click()
document.getElementById("#ICOK").click()

// Wait for saved GIF to display
waitForSaved = setInterval(returnToSearch,500)

function returnToSearch(){
    if (!!psIframe.getElementById("SAVED_win0")) {
        if (psIframe.getElementById("SAVED_win0").style.display === "block") {

            clearInterval(waitForSaved);
            document.querySelector("#pthnavbccrefanc_HC_JOB_DATA_GBL").click()

        };
    };    
}



document.getElementById("ptifrmtgtframe").contentDocument.getElementsByClassName("PSGRIDCOUNTER")[0].innerHTML.substring(0,1)

document.getElementById("pthnavbca_PORTAL_ROOT_OBJECT").click();
document.getElementById("pthnavsrchinput").value = "Absences";
document.getElementById("pthnavgo").click();

var psHyperlinks = document.getElementsByClassName("PSHYPERLINK");

for (var i = psHyperlinks.length - 1; i >= 0; i--) {
    if (psHyperlinks[i].innerHTML === localStorage.componentName) {
        psHyperlinks[i].click();
        return true;
    }; 
};





document.getElementById("ptifrmtgtframe").contentDocument.getElementById("PAY_OL_PG_US_VW_COMPANY");

var changeEvent = document.createEvent("HTMLEvents");
changeEvent.initEvent("change", true, true);

document.getElementById("ptifrmtgtframe").contentDocument.getElementById("GP_RTO_TRGR$new$0$$0").click();
setTimeout(function(){
    document.getElementById("ptifrmtgtframe").contentDocument.getElementById("GP_RTO_TRGR_VW_COUNTRY$1").value = "USA";
    document.getElementById("ptifrmtgtframe").contentDocument.getElementById("GP_RTO_TRGR_VW_COUNTRY$1").dispatchEvent(changeEvent);
    document.getElementById("ptifrmtgtframe").contentDocument.getElementById("GP_RTO_TRGR_VW_TRGR_EFFDT$1").value = "05/23/2015";
    document.getElementById("ptifrmtgtframe").contentDocument.getElementById("GP_RTO_TRGR_VW_TRGR_EFFDT$1").dispatchEvent(changeEvent);
    document.getElementById("ptifrmtgtframe").contentDocument.getElementById("GP_RTO_TRGR_VW_TRGR_EVENT_ID$1").value = "LDSUSAABS";
    document.getElementById("ptifrmtgtframe").contentDocument.getElementById("GP_RTO_TRGR_VW_TRGR_EVENT_ID$1").dispatchEvent(changeEvent);
},300);
setTimeout(function(){document.getElementById("ptifrmtgtframe").contentDocument.getElementById("#ICSave").click();},700);


TL_RUN_CTRL_GRP$new$0$$0 - Add a new line
TL_RUN_CTRL_GRP_EMPLID$0 - Text field for EmpID
document.getElementById("ptifrmtgtframe").contentDocument.getElementById('TL_RUN_CTRL_GRP_EMPLID$0').value


// CRM Code for bullets
var elements = document.getElementById('contentIFrame').contentDocument.getElementsByClassName('htmlAnchorStyle htmlBarUnselectable')

for (var i = 0; i < elements.length; i++) {
    if (elements[i].title === "Bullets") {
        console.log(elements[i]);
    }
}


var evens = [];
var odds = [];

function oddsAndEvens(nums){
    for (var i = 0; i < nums.length; i++) {

        if (nums[i] === 1) {
            odds.push(nums[i]);
        }else if (nums[i] > 1) {
            var remainder = nums[i]%2;
            if (remainder !== 0) {
                odds.push(nums[i]);
            }else {
                evens.push(nums[i]);
            }
        }

    }
}

function describePerson(person) {
  //code here
  for (var meProperties in me) {
      if (me.hasOwnProperty(meProperties)) {
		me.property = "unknown";
      }
	}
  return me;
}

function truthyObjLoop(user) {
    //code here
    for (var variable in user) {
        if (user.hasOwnProperty(variable)) {
            if(!user[variable]){
                delete user[variable];
            }
        }
    }
    return user;
}

var timeSheetNav = ["pthnavbca_PORTAL_ROOT_OBJECT",
"fldra_CO_MANAGER_SELF_SERVICE",
"fldra_HC_TIME_MANAGEMENT",
"fldra_HC_RECORD_TIME_MGR",
"crefli_HC_TL_MSS_EE_PRD_GBL3"]

for (var i = 0; i < timeSheetNav.length; i++) {
    if (i !== timeSheetNav.length) {
        document.getElementById(timeSheetNav[i]).click();
    }else {
        document.getElementById(timeSheetNav[i]).childNodes[0].click();
    }
}

for (var i = 0; i < timeSheetNav.length; i++) {
    console.log(timeSheetNav[i]);
}

var menuObserver = new MutationObserver(function(mutations) {
    for (var variable in mutations) {
        if (mutations.hasOwnProperty(variable)) {
            if (mutations[variable].addedNodes.length > 0) {
                console.log("Nodes Added");
            }
            console.log(mutations[variable].addedNodes);
            console.log(mutations[variable]);
        }
    }
})

// pass in the target node, as well as the observer options
menuObserver.observe(document.getElementById("pthnavfly_PORTAL_ROOT_OBJECT"), {attributes:true, childList:true, characterData:true, subtree:true});


document.getElementById("ptifrmtgtframe").contentDocument.getElementById("C_Z_PAY_OL_SRCH_PAY_END_DT").value = "061915";
document.getElementById("ptifrmtgtframe").contentDocument.getElementById("C_Z_PAY_OL_SRCH_EMPLID").value = "002900";
document.getElementById("ptifrmtgtframe").contentDocument.getElementById("C_Z_PAY_OL_SRCH_CHECK_DT").value = "062615";
document.getElementById("ptifrmtgtframe").contentDocument.getElementById("#ICSearch").click();


// [{"empid":"702378","triggerDate":"5/25/15"},{"empid":"702452","triggerDate":"5/26/15"},{"empid":"702512","triggerDate":"5/27/15"},{"empid":"702519","triggerDate":"5/28/15"},{"empid":"702570","triggerDate":"5/29/15"},{"empid":"702743","triggerDate":"5/30/15"},{"empid":"702792","triggerDate":"5/31/15"},{"empid":"703813","triggerDate":"6/1/15"},{"empid":"704135","triggerDate":"6/2/15"}]
