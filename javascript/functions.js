
function checkIframeAndID(nodeID, nodeAction, nodeValue) {


    // If the element exists in the iFrame
    if (!!document.getElementById("ptifrmtgtframe") && !!document.getElementById("ptifrmtgtframe").contentDocument.getElementById(nodeID)) {

        switch (nodeAction) {

            case "click":

                document.getElementById("ptifrmtgtframe").contentDocument.getElementById(nodeID).click();
                break;

            case "setValue":
                if (nodeValue !== "undefined") {
                    document.getElementById("ptifrmtgtframe").contentDocument.getElementById(nodeID).value = nodeValue;
                } else {
                    return false;
                }
                break;

            case "checked":
                return document.getElementById("ptifrmtgtframe").contentDocument.getElementById(nodeID).checked;

                break;

            case "indexOf":

            	if (document.getElementById("ptifrmtgtframe").contentDocument.getElementById("win0divPAGECONTAINER").outerHTML.indexOf(nodeValue) > 0) {
            		return true;
            	}else {
            		return false;
            	}

            	break;

            case "search":
            	if (document.getElementById("ptifrmtgtframe").contentDocument.getElementById(nodeID).tagName === "INPUT") {
            		return true;
            	}else{
            		return false;
            	}

            default:
        }

        return true;

        // If the node does not exist return false
    } else {
        return false;

    }
}

function checkIframeAndClass(nodeClass, nodeValue, useIframe) {

    // Only looking for the node in the document body
    if (useIframe === false) {
        if (!!document.getElementsByClassName(nodeClass)[0]) {
            var workingNodes = document.getElementsByClassName(nodeClass);

            for (var i = 0; i < document.getElementsByClassName(nodeClass).length; i++) {
                if (workingNodes[i].innerHTML.substring(0, 50) === nodeValue) {
                    workingNodes[i].click();
                    return true;
                }
            }

        } else {
            return false;
        }
    }

    // Looking for node in the iFrame
    if (!!document.getElementById("ptifrmtgtframe") && !!document.getElementById("ptifrmtgtframe").contentDocument.getElementsByClassName(nodeClass)[0]) {
        var workingNodes = document.getElementById("ptifrmtgtframe").contentDocument.getElementsByClassName(nodeClass);
    } else {
        return false;
    }

    for (var i = 0; i < workingNodes.length; i++) {
        if (workingNodes[i].innerHTML.substring(0, 50) === nodeValue) {
            workingNodes[i].click();

            // console.log("Clearing storage : ")
            // localStorage.clear();
            return true;
        }
    }
}

// Navigation
function openNewWin(componentName) {

    localStorage.nextAction = "navToFavorite";

    // If the NEWWIN element exists in the iFrame
    if (!!document.getElementById("ptifrmtgtframe") && !!document.getElementById("ptifrmtgtframe").contentDocument.getElementById("NEWWIN")) {

        // Open page in existing tab on left click
        if (localStorage.pageStay === "true") {
            pageReady();

            // Open page in new tab on right click
        } else {

            document.getElementById("ptifrmtgtframe").contentDocument.getElementById("NEWWIN").click();
        }

        return true;

    } else {
        // If on the home page then stay on this page
        if (!!document.getElementById("pttabpercontent")) {
            localStorage.pageStay = true;
            pageReady();
        }
    }
}

function navToFavorite(componentName) {

	// On the search page and the document title matches the componentName
    if (document.title === localStorage.componentName && checkIframeAndID(localStorage.searchFieldID, "search")) {
        localStorage.nextAction = "search";
        pageReady();
        return true;
    }

    document.getElementById('pthnavbca_MYFAVORITES').click();

    var waitForFavorites = setInterval(function(){

    	if (!!document.getElementById("pthnavmruroot")) {

    		clearInterval(waitForFavorites);
    		openFavorite();
    	};

    },200)
}

function openFavorite () {

	allFavorites = document.querySelectorAll("a[role='menuitem']");

	// Loop through all the favorite links in search of the corresponding component name
	for (var i = 0; i < allFavorites.length; i++) {

	    if (allFavorites[i].innerHTML === localStorage.componentName && allFavorites[i].parentNode.parentNode.id !== "pthnavmruroot") {

	        // Fix the href for the timesheet
	        if (allFavorites[i].innerHTML === "Timesheet" && allFavorites[i].parentNode.id === "crefli_fav_HC_TL_MSS_EE_PRD_GBL3") {
	            if (localStorage.environment === "prod") {
	            	if (localStorage.system === "core") {
		                allFavorites[i].href = "https://hrcore91.ldschurch.org/psp/HRCORE/EMPLOYEE/HRMS/c/ROLE_MANAGER.TL_MSS_EE_SRCH_PRD.GBL";
	            	}else {
		                allFavorites[i].href = "https://hradmin91.ldschurch.org/psp/HRADMIN/GLOBALHR/HRMS/c/ROLE_MANAGER.TL_MSS_EE_SRCH_PRD.GBL";
	            	}
	            } else {
	            	if (localStorage.system === "core") {
		                allFavorites[i].href = "https://hrcore91-sg-stage.ldschurch.org/psp/HRCORE_SG/EMPLOYEE/HRMS/c/ROLE_MANAGER.TL_MSS_EE_SRCH_PRD.GBL";
	            	}else{
		                allFavorites[i].href = "https://hradmin91-sg-stage.ldschurch.org/psp/HRADMIN_SG/GLOBALHR/HRMS/c/ROLE_MANAGER.TL_MSS_EE_SRCH_PRD.GBL";
	            	}
	            }
	        }

	        // Fix the href for Close Payable Time
	        if (allFavorites[i].innerHTML === "Close Payable Time" && allFavorites[i].parentNode.id === "crefli_fav_C_RUNCTL_CTL924C_GBL") {

	            if (localStorage.environment === "stage") {
	                allFavorites[i].href = "https://hrcore91-sg-stage.ldschurch.org/psp/HRCORE_SG/EMPLOYEE/HRMS/c/LDS_TL_ADMIN.C_RUNCTL_CTL924C.GBL";
	            } else {
	                allFavorites[i].href = "https://hrcore91.ldschurch.org/psp/HRCORE/EMPLOYEE/HRMS/c/LDS_TL_ADMIN.C_RUNCTL_CTL924C.GBL";
	            }
	        }

	        // Fix the href for Create Additional Pay
	        if (allFavorites[i].innerHTML === "Create Additional Pay" && allFavorites[i].parentNode.id === "crefli_fav_HC_ADDITIONAL_PAY_USA4") {

	            if (localStorage.environment === "stage") {
	                allFavorites[i].href = "https://hrcore91-sg-stage.ldschurch.org/psp/HRCORE_SG/EMPLOYEE/HRMS/c/MAINTAIN_PAYROLL_DATA_US.ADDITIONAL_PAY.USA";
	            } else {
	                allFavorites[i].href = "https://hrcore91.ldschurch.org/psp/HRCORE/EMPLOYEE/HRMS/c/MAINTAIN_PAYROLL_DATA_US.ADDITIONAL_PAY.USA";
	            }
	        }

	        allFavorites[i].click();

	        // Check for the search values in localStorage
			if (localStorage.searchValue !== undefined) {
				console.log("setting nextAction = search");
				localStorage.nextAction = "search";

			}else if (localStorage.moreThanSearch !== undefined) {
				console.log("Setting nextAction to continue");
				localStorage.nextAction = "continue";

			}else {
				console.log("Clearing Storage: searchValue field is undefined");
				localStorage.clear();
			}

	        if (document.title === localStorage.componentName) {

	        	// Search the page once the search field exists
				var waitingForSearchID = setInterval(function() {

			        if (checkIframeAndID(localStorage.searchFieldID)) {

			            searchPage();
			            clearInterval(waitingForSearchID);
			        };

			    }, 400)
	        };

	        return true;
	    }
	}

	document.getElementById("pthnavbca_PORTAL_ROOT_OBJECT").click();
	document.getElementById("pthnavsrchinput").value = localStorage.componentName;
	document.getElementById("pthnavgo").click();

	localStorage.nextAction = "createNewFavorite";
}

function createNewFavorite () {

	var psHyperlinks = document.getElementsByClassName("PSHYPERLINK");

	for (var i = psHyperlinks.length - 1; i >= 0; i--) {
	    if (psHyperlinks[i].innerHTML === localStorage.componentName) {
	        psHyperlinks[i].click();
	        localStorage.nextAction = "addToFavorites";
	        return true;
	    }
	}

	console.log("Component Name does not exist in search results.")
	localStorage.clear();
}

function addToFavorites () {

    // Check for the search values in localStorage
	if (localStorage.searchValue !== undefined) {
		console.log("setting nextAction = search");
		localStorage.nextAction = "search";

	}else{
		localStorage.clear();

	}

	// Click the favorites button
	document.getElementById("pthnavbca_MYFAVORITES").click();

	var waitForFavorites = setInterval(function(){
		if (!!document.getElementById("crefli_PT_PORTAL_ADD_FAV_GBL")) {
			// Click add to favorites
			document.getElementById("crefli_PT_PORTAL_ADD_FAV_GBL").click();
			clearInterval(waitForFavorites);

			addToFavoritesOK();
		}

	}, 200)

	document.getElementById("ptifrmatfok").click();

	// Click ok
	document.getElementById("ptpopupmsgbtn1").click();
}

function addToFavoritesOK () {
	var waitForOK = setInterval(function(){
		if (!!document.getElementById("ptifrmatfok")) {
			// Click ok to accept the default name
			document.getElementById("ptifrmatfok").click();
			clearInterval(waitForOK);

			var waitForNextOK = setInterval(function(){
				if (!!document.getElementById("ptpopupmsgbtn1")) {
					// Click final ok
					document.getElementById("ptpopupmsgbtn1").click();
					pageReady();
					clearInterval(waitForNextOK);
				}

			}, 200)
		}
	}, 200)
}

// Search Page
function searchPage() {

    if (localStorage.scriptAction === "generateTriggers") {
        searchTriggers();
        return;
    }

    if (localStorage.scriptAction === "generateAMTriggers") {
        iframeObserver_generateAMTriggers();
        return;
    }

    if (localStorage.scriptAction === "openTimeUnion") {

        var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;
        var queryTableRows = psIframe.querySelectorAll(".PSLEVEL1GRID tr td div span")

        // Search for the table row with the text "TIME_UNION_DS"
        for (var i = 0; i < queryTableRows.length; i++) {
            if (queryTableRows[i].innerHTML === "TIME_UNION_DS") {
                // Extract the row number from the id to be used to click on the right hyperlink.
                var idLength = queryTableRows[i].id.length;
                var queryRow = queryTableRows[i].id.substring(idLength - 2, idLength -1)
                if (/\d/.test(queryRow)) {
                    var queryRow = queryTableRows[i].id.substring(idLength - 2, idLength)
                }else {
                    var queryRow = queryTableRows[i].id.substring(idLength - 1, idLength)
                }
                console.log(queryRow);
            }
        }

        // If the TIME_UNION_DS query isn't a favorite then prompt the user to add it.
        if (queryRow === undefined) {
            alert("Please add the TIME_UNION_DS query to your favorites.")
            localStorage.clear();
            return;
        }

        checkIframeAndID("QRYRUN2$" + queryRow,"click");
        localStorage.nextAction = "searchQuery";
        return;
    }

    if (localStorage.scriptAction === "generateRetros") {
        console.log("Calling searchRetros from searchPage function.")
        searchRetros();
        return;
    }

    if (localStorage.scriptAction === "terminateEmployees") {
    	console.log("Calling terminateEmployees from searchPage function.")
        searchTerminateEmployees();
        return;
    }

    // Set the Run Control ID parameter to "contains" if action is openUploadProcess
    if (localStorage.scriptAction === "openUploadProcess") {
    	document.getElementById("ptifrmtgtframe").contentDocument.getElementById("C_TL_RUNCNTL_RUN_CNTL_ID$op").value = "8";
    };

    // Set the Run Control ID parameter to "contains" if action is openAbsenceAdjustments
    if (localStorage.scriptAction === "openAbsenceAdjustments") {
    	document.getElementById("ptifrmtgtframe").contentDocument.getElementById("GP_PI_MNL_AE_VW_CAL_ID$op").value = "8";
    	// Set the search parament to the current year
    	document.getElementById("ptifrmtgtframe").contentDocument.getElementById("GP_PI_MNL_AE_VW_CAL_ID").value = new Date().getFullYear();
    };

    // Check for the searchFieldID to exist
    var continueSearch = checkIframeAndID(localStorage.searchFieldID, 'setValue', localStorage.searchValue);

    // Set second searchFieldValue for off-cycle checks
    if (checkIframeAndID(localStorage.searchFieldID2)) {
        checkIframeAndID(localStorage.searchFieldID2, 'setValue', localStorage.searchValue2);
    }

    // Set third searchFieldValue for off-cycle checks
    if (checkIframeAndID(localStorage.searchFieldID3)) {
        checkIframeAndID(localStorage.searchFieldID3, 'setValue', localStorage.searchValue3);
    }

    if (continueSearch) {
        checkIframeAndID(localStorage.searchButtonID, "click")
    }

    if (localStorage.scriptAction === "openTimesheet") {
        var waitingForName = setInterval(function(){
            if (document.getElementById("ptifrmtgtframe").contentDocument.getElementById("NAME$0").innerHTML !== "Name") {

                clearInterval(waitingForName);

                // Initialize force change event code
                var changeEvent = document.createEvent("HTMLEvents");
                changeEvent.initEvent("change", true, true);

                var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;
                psIframe.getElementById("DATE_DAY12").value = ppDate();
                psIframe.getElementById("DATE_DAY12").dispatchEvent(changeEvent);

                setTimeout(function(){
                    checkIframeAndID("NAME$0","click");

                    var waitForDateField = setInterval(function(){

                        if (!!document.getElementById("ptifrmtgtframe").contentDocument.getElementById("DATE_DAY1")) {
                            clearInterval(waitForDateField);

                            var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;
                            psIframe.getElementById("DATE_DAY1").select()
                        }
                    },300);
                },300);
            };
        },200);
    };

    if (localStorage.scriptAction === "openClosePayableTime") {

    	var waitForEmpIDField = setInterval(function(){

    		if (checkIframeAndID("RUN_CNTL_USER_EMPLID")) {

    			clearInterval(waitForEmpIDField);

		        checkIframeAndID("RUN_CNTL_USER_EMPLID","setValue",localStorage.empid)
		        document.getElementById("ptifrmtgtframe").contentDocument.getElementById("RUN_CNTL_USER_FROMDATE").select();

		        console.log("Clearing Storage: search completed for close payable time.")
		        localStorage.clear();

    		};

    	},200)

    };

    if (localStorage.scriptAction === "generateCheck") {
    	startMutationWatchingBody();
    };

    if (localStorage.moreThanSearch !== "true") {
        console.log("Clearing Storage: search executed");
        localStorage.clear();
    }
}

// Generate Triggers
function searchTriggers () {

    var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

    // If the search field exists then search
    if (!!psIframe.getElementById("C_TL_TR_STAT_VW_EMPLID") && localStorage.nextAction === "search") {

        // If there are no elements left then stop observing and return false
        if (localStorage.triggerList === undefined || localStorage.triggerList.length === 2) {

            if (localStorage.AMTriggerList !== undefined) {
                console.log("calling initAMTriggersProcessing")
                initAMTriggersProcessing();
            }

            return false;
        };

        // Get the triggerList string from localStorage and convert it to an object
        var newTriggerlist = JSON.parse(localStorage.triggerList)

        // Remove the first element of the object for this iteration
        localStorage.thisTrigger = JSON.stringify(newTriggerlist.shift());

        // Update the localStorage.thisTrigger with the stringified version of the newTriggerlist
        localStorage.triggerList = JSON.stringify(newTriggerlist);

        // Enter the ID number and click search
        psIframe.getElementById("C_TL_TR_STAT_VW_EMPLID").value = JSON.parse(localStorage.thisTrigger).empid;

        // If the EmplRcd Field Exists then make sure it's blank
        if (!!psIframe.getElementById("C_TL_TR_STAT_VW_EMPL_RCD")) {
                psIframe.getElementById("C_TL_TR_STAT_VW_EMPL_RCD").value = JSON.parse(localStorage.thisTrigger).emplRcd;

                psIframe.getElementById("#ICSearch").click();

                console.log("Calling setTrigger()")
                setTrigger();
        }else { // Click the advanced search option first then search with the EmplRcd
            psIframe.querySelector("a[name='#ICAdvSearch']").click();
            setTimeout(function(){

                psIframe.getElementById("C_TL_TR_STAT_VW_EMPL_RCD").value = JSON.parse(localStorage.thisTrigger).emplRcd;

                psIframe.getElementById("#ICSearch").click();

                console.log("Calling setTrigger()")
                setTrigger();
            },300)
        }
    }
}

function setTrigger () {
    var waitingForTriggerFields = setInterval(function(){

        var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

        // If the ECD field exists
        if (psIframe.getElementById("TL_TR_STATUS_EARLIEST_CHGDT")) {

            // Clear the interval
            clearInterval(waitingForTriggerFields);

            // Initialize force change event code
            var changeEvent = document.createEvent("HTMLEvents");
            changeEvent.initEvent("change", true, true);

            // Set the trigger effective date
            psIframe.getElementById("TL_TR_STATUS_EARLIEST_CHGDT").value = JSON.parse(localStorage.thisTrigger).triggerDate;
            psIframe.getElementById("TL_TR_STATUS_EARLIEST_CHGDT").dispatchEvent(changeEvent);

            // If the TA Needed box is already checked then save and return
            if(!!psIframe.getElementById("TL_TR_STATUS_TA_STATUS").checked){

                // Click save
                psIframe.getElementById("#ICSave").click()

                console.log("Calling waitForSave()")
                waitForSave("pthnavbccrefanc_C_TL_TR_STATUS_CMP_GBL", "C_TL_TR_STAT_VW_EMPLID");

            // Otheriwise check the box -> saveAndReturn is called in the bodyObserver
            }else{
                psIframe.getElementById("TL_TR_STATUS_TA_STATUS").click();

                var waitForPopup = setInterval(function(){
	                if (checkIframeAndClass("popupText","<br>SQLExec: Failed to find a matching SQL stateme",false)) {
	                	clearInterval(waitForPopup);

		                document.getElementById("#ICOK").click();

		                console.log("Calling waitForSave()")
		                waitForSave("pthnavbccrefanc_C_TL_TR_STATUS_CMP_GBL", "C_TL_TR_STAT_VW_EMPLID");

		            }
                },200)
            }
        }
    }, 300)
}

function waitForSave (menuBarID, searchFieldID, quickSave) {

  // Initiate the interval
  var waitForSaveNode = setInterval(function(){

    // Set the iframe variable
    var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

    var savedWinState = psIframe.getElementById("SAVED_win0").style.display;
    var waitWinState = psIframe.getElementById("WAIT_win0").style.display;

    // If the style of the SAVED_win0 === block --> the page has been saved
    if (savedWinState === "block" || (savedWinState === "none" && waitWinState === "none" && quickSave === true)) {
      clearInterval(waitForSaveNode);

      // Set localStorage.nextAction
      localStorage.nextAction = "search";

      // If the search field isn't present return to search page
      if (!psIframe.getElementById(searchFieldID)) {
          document.getElementById(menuBarID).click();
      }

      console.log("Calling lookForSearchNode()");
      lookForSearchNode(searchFieldID);

      // Stop iterating through nodes
      return;
    }
  },300);
}

function lookForSearchNode (searchFieldID) {
  // If the search field shows up and this code is still running the link didn't initiate a page reload
  waitingForSearchNode = setInterval(function(){

      // Set the iframe variable
      var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

      if (!!psIframe.getElementById(searchFieldID)) {
          console.log("Called pageReady manually");

          clearInterval(waitingForSearchNode);

          pageReady();
      };
  },500);
}
// Off-Cycle Check
function waitForPayline() {

    var nextPaylineButton = setInterval(function() {

        // If next payline button is selectable click it
        if (checkIframeAndID("$ICField24$hdown$0")) {
            checkIframeAndID("$ICField24$hdown$0", "click")
            clearInterval(nextPaylineButton);

            setTimeout(waitForSaveAndCalc(), 500);

            // If the next payline button is not selectable
        } else if (checkIframeAndID("PAY_OL_PB_WRK_CALC_PB$0")) {
            clearInterval(nextPaylineButton);
        };

    }, 500)
}

function waitForSaveAndCalc() {
    console.log("executing waitForSaveAndCalc");


    var saveAndCalcButton = setInterval(function() {
        console.log("executing waitForSaveAndCalc");

        // Set the subset values
        if (localStorage.subset == "401" || localStorage.subset == "DED") {

            // Instantiate event listener
            var changeEvent = document.createEvent("HTMLEvents");
            changeEvent.initEvent("change", true, true);

            // Set the deduction field to Subset
            checkIframeAndID("PAY_EARNINGS_DED_TAKEN_GENL$52$$0", "setValue", "S")
            document.getElementById("ptifrmtgtframe").contentDocument.getElementById('PAY_EARNINGS_DED_TAKEN_GENL$52$$0').value = "S";

            // Dispatch event on deduction field
            document.getElementById("ptifrmtgtframe").contentDocument.getElementById("PAY_EARNINGS_DED_TAKEN_GENL$52$$0").dispatchEvent(changeEvent);

            // Update the subset field and dispatch event
            checkIframeAndID("PAY_EARNINGS_DED_SUBSET_GENL$0", "setValue", localStorage.subset)
            document.getElementById("ptifrmtgtframe").contentDocument.getElementById("PAY_EARNINGS_DED_SUBSET_GENL$0").dispatchEvent(changeEvent);
        }

        // Set the deduction subset to none if requested
        if (localStorage.subset == "None") {
            // Instantiate event listener
            var changeEvent = document.createEvent("HTMLEvents");
            changeEvent.initEvent("change", true, true);

            // Set the deduction field to Subset
            checkIframeAndID("PAY_EARNINGS_DED_TAKEN_GENL$52$$0", "setValue", "N")
            document.getElementById("ptifrmtgtframe").contentDocument.getElementById('PAY_EARNINGS_DED_TAKEN_GENL$52$$0').value = "N";

            // Dispatch event on deduction field
            document.getElementById("ptifrmtgtframe").contentDocument.getElementById("PAY_EARNINGS_DED_TAKEN_GENL$52$$0").dispatchEvent(changeEvent);
        };

        // If the OK to Pay is checked and it is a manual check
        if (checkIframeAndID("PAY_EARNINGS_OK_TO_PAY$0", "checked") || localStorage.manualCheck === "true") {


            // Only save and calc automatically if it's not a manual check
            if (localStorage.manualCheck !== "true") {
                checkIframeAndID("PAY_OL_PB_WRK_CALC_PB$0", "click")
                openSections();

                clearInterval(saveAndCalcButton);

            } else if (localStorage.manualCheck === "true") {
                openSections();
                clearInterval(saveAndCalcButton);
            };
        }
    }, 500)
}

function openSections () {

    var waitForSections = setInterval(function(){
        if (!!document.getElementById("ptifrmtgtframe").contentDocument.getElementById('PAY_OL_PB_WRK_EMP_PB')) {

            clearInterval(waitForSections);
            localStorage.clear();

            // Open earnings section
            document.getElementById("ptifrmtgtframe").contentDocument.getElementById('$ICField27$expand$0').click();

            // Open deductions section
            setTimeout(function (){
                checkIframeAndID("PAY_DEDUCTION$expand$0","click");
            }, 500);

            // Open taxes section
            // setTimeout(function (){
            //     checkIframeAndID("PAY_TAX$expand$0","click");
            // }, 1000);
        }

    },500);
}

// Terminate Employees
function searchTerminateEmployees () {
    // This function parses and updates the terminationList from local storage and searches the page
    // with the empID from the next available termination
    if (localStorage.terminationList === undefined) {
        return false;
    }

    // If we're done processing then display a message once the search page appears
    if (localStorage.terminationList.length < 3) {

        // Remove the scriptAction from localStorage
        localStorage.removeItem("scriptAction");

        if (!!document.getElementById("ptifrmtgtframe")) {

            var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

            if (!!psIframe.getElementById("EMPLMT_SRCH_COR_EMPLID")) {

                console.log("Terminations processed. Displaying quickMessage");

                quickMessage("Termination processing complete.");

                return;
            }
        }
    }

    // Set the iframe variable
    var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

    // Get the terminationList string from localStorage and convert it to an object
    var newTerminationList = JSON.parse(localStorage.terminationList)

    // Remove the first element of the object for this iteration
    localStorage.thisTermination = JSON.stringify(newTerminationList.shift());

    // Update the localStorage.terminationList with the stringified version of the newTerminationList
    localStorage.terminationList = JSON.stringify(newTerminationList);

    // Enter the ID number, EmplRcd and click search
    psIframe.getElementById("EMPLMT_SRCH_COR_EMPLID").value = JSON.parse(localStorage.thisTermination).empid;
    psIframe.getElementById("EMPLMT_SRCH_COR_EMPL_RCD").value = JSON.parse(localStorage.thisTermination).emplRcd;
    psIframe.getElementById("#ICSearch").click();

    console.log("Calling addNewRow");
    addNewRow();
}

function addNewRow () {
    var waitForJobData = setInterval(function() {

        var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

        // Check to see if the search did not return any search results
        if (!!psIframe.getElementsByClassName("PSSRCHINSTRUCTIONS")[0] && psIframe.getElementsByClassName("PSSRCHINSTRUCTIONS")[0].innerHTML === "No matching values were found.") {

            clearInterval(waitForJobData);
            console.log("Employee not found.")
            return;
        }

        // Make sure the plus button exists and click it
        if (!!psIframe.getElementById("$ICField12$new$0$$0")) {
            clearInterval(waitForJobData);

            setTimeout(function(){
                psIframe.getElementById("$ICField12$new$0$$0").click();

                console.log("calling addTermValues")
                addTermValues();
            },200)
        }
    },300)
}

function addTermValues () {

    var waitForJobDataRow = setInterval(function(){

        // Set the iframe variable
        var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

        // If we're on the new job data row
        if (psIframe.getElementsByClassName("PSGRIDCOUNTER")[0].innerHTML === "1 of 2") {

            clearInterval(waitForJobDataRow);

            // Initialize force change event
            var changeEvent = document.createEvent("HTMLEvents");
            changeEvent.initEvent("change", true, true);

            // Set the date
            psIframe.getElementById("JOB_EFFDT$0").value = JSON.parse(localStorage.thisTermination).termDate;
            psIframe.getElementById("JOB_EFFDT$0").dispatchEvent(changeEvent);

            // Set action
            psIframe.getElementById("JOB_ACTION$0").value = JSON.parse(localStorage.thisTermination).jobAction;
            psIframe.getElementById("JOB_ACTION$0").dispatchEvent(changeEvent);

            var waitForAction = setInterval(function(){
                if (psIframe.getElementById("WAIT_win0").style.display === "none") {
                    clearInterval(waitForAction)

                    // Set the Job Action Reason to TMP
                    psIframe.getElementById("JOB_ACTION_REASON$0").value = JSON.parse(localStorage.thisTermination).reason;
                    psIframe.getElementById("JOB_ACTION_REASON$0").dispatchEvent(changeEvent);

                    // Navigate to the Rehire tab
                    psIframe.querySelector("[name='#ICPanel13']").click()

                    // Call setRehireData function
                    setRehireData();
                }
            },200)
        }
    },300)
}

function setRehireData () {

    var waitingForRehireData = setInterval(function(){
        var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;
        if (!!psIframe.getElementById("C_EMPLOYMENT_C_SUITABLE_FOR_REH")) {

            clearInterval(waitingForRehireData);

            // Click the Yes radio button on eligible for rehire
            psIframe.getElementById("C_EMPLOYMENT_C_SUITABLE_FOR_REH").click()

            // Click save
            psIframe.getElementById("#ICSave").click();

            startMutationWatchingIframe();
            startMutationWatchingBody();
        }
    },300)
}

// Payline Adjustments
function searchRetros () {
    // This function parses and updates the retrosList from local storage and searches the page
    // with the empID from the next available retro list

    if (localStorage.retrosList === undefined) {
        return false;
    }

    // If we're done processing then display a message once the search page appears
    if (localStorage.retrosList.length < 3) {

    	// Remove the scriptAction from localStorage
        localStorage.removeItem("scriptAction");

        if (!!document.getElementById("ptifrmtgtframe")) {

            var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

            if (!!psIframe.getElementById("PAY_LINE_WORK_EMPLID")) {

                console.log("Retros processed. Displaying quickMessage");

	            if (localStorage.empsNotProcessed !== undefined) {
	                quickMessage("The following EmpIDs were not processed : " + localStorage.empsNotProcessed)
	            }else{
	                quickMessage("All retros provided have been processed.");
	            }

	            return;
	        }
	    }
    }

    // Set the iframe variable
	var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

    // Get the retrosList string from localStorage and convert it to an object
    var newretrosList = JSON.parse(localStorage.retrosList)

    // Remove the first element of the object for this iteration
    localStorage.thisRetro = JSON.stringify(newretrosList.shift());

    // Update the localStorage.retrosList with the stringified version of the newretrosList
    localStorage.retrosList = JSON.stringify(newretrosList);

    // Enter the ID number and click search
    psIframe.getElementById("PAY_LINE_WORK_EMPLID").value = JSON.parse(localStorage.thisRetro).empid;

    psIframe.getElementById("#ICSearch").click();

    console.log("Calling addNewPayline");
    addNewPayline();
}

function addNewPayline() {

    var waitForPayline = setInterval(function() {

        var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

        // Check to see if the search did not return any search results
        if (!!psIframe.getElementsByClassName("PSSRCHINSTRUCTIONS")[0] && psIframe.getElementsByClassName("PSSRCHINSTRUCTIONS")[0].innerHTML === "No matching values were found.") {

            clearInterval(waitForPayline);

            // Add the EmpID to a list of EmpIDs not processed
            if (localStorage.empsNotProcessed === undefined) {
                localStorage.empsNotProcessed = JSON.parse(localStorage.thisRetro).empid + ", ";

            }else{
                localStorage.empsNotProcessed += JSON.parse(localStorage.thisRetro).empid + ", ";
            }

            // Call the searchRetros function if there are still more retros to process
            if (localStorage.retrosList !== undefined && localStorage.retrosList.length > 2) {
                console.log("Calling searchRetros from missing EmpID")
                searchRetros();

            // If there are no more retros then display the message of empsNotProcessed
            }else{
                setTimeout(function(){
                    if (localStorage.empsNotProcessed !== undefined) {
                        quickMessage("The following EmpIDs were not processed : " + localStorage.empsNotProcessed.substring(0, localStorage.empsNotProcessed.length - 2))
                    }else{
                        quickMessage("The retros provided have been processed.");
                        localStorage.clear();
                    }

                    // Clear the search elements
                    psIframe.getElementById("#ICClear").click()

                },500)
            }

            return;
        }

        // Make sure the plus button exists and click it
        if (!!psIframe.getElementById("$ICField22$new$0$$0")) {
            setTimeout(function(){
                psIframe.getElementById("$ICField22$new$0$$0").click();

                console.log("calling addRetroValues")
                addRetroValues();

                clearInterval(waitForPayline);
            },200)
        };

    },300)
}

function addRetroValues () {

    var waitForPayline = setInterval(function(){

        // Set the iframe variable
        var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

        // If we're on the second payline
        if (psIframe.getElementsByClassName("PSGRIDCOUNTER")[0].innerHTML.substring(0,1) === "2") {

            clearInterval(waitForPayline);

            // Initialize force change event
            var changeEvent = document.createEvent("HTMLEvents");
            changeEvent.initEvent("change", true, true);

            // Set RTO and Amount Values
            psIframe.getElementById("PAY_OTH_EARNS_ERNCD$0").value = "RTO";
            psIframe.getElementById("PAY_OTH_EARNS_ERNCD$0").dispatchEvent(changeEvent);

            psIframe.getElementById("PAY_OTH_EARNS_OTH_PAY$0").value = JSON.parse(localStorage.thisRetro).retroAmount;
            psIframe.getElementById("PAY_OTH_EARNS_OTH_PAY$0").dispatchEvent(changeEvent);

            // Check the OK to Pay box if needed
            if (psIframe.getElementById("PAY_EARNINGS_OK_TO_PAY$0").checked !== true) {
                psIframe.getElementById("PAY_EARNINGS_OK_TO_PAY$0").click();
            }

            // Start watching for body mutations (warning messages)
            startMutationWatchingBody();

            // Click save
            psIframe.getElementById("#ICSave").click();

            waitForSave("pthnavbccrefanc_HC_PAY_SHEET_LINE_USA2","PAY_LINE_WORK_EMPLID")
        }

    },300);
}

// Miscellaneous functions
function quickMessage(message, buttonText) {

    if (!!document.getElementsByClassName('greeting_lds')[0]) {
        var greetingNode = document.getElementsByClassName('greeting_lds')[0]

        var newMessage = document.createElement("SPAN");
        newMessage.innerHTML = message;
        newMessage.style.fontSize = "15px";
        newMessage.style.fontFamily = "Arial";
        newMessage.style.paddingRight = "10px";
        newMessage.id = "newMessage";
        newMessage.style.color = "red";

        // Append the message
        document.getElementsByClassName('greeting_lds')[0].parentNode.appendChild(newMessage);

        setTimeout(function() {
            // greetingNode.removeChildNode()
            greetingNode.parentNode.removeChild(document.getElementById("newMessage"))

        }, 4000);

        if (buttonText !== undefined) {
            var newButton = document.createElement("BUTTON");
            newButton.innerHTML = buttonText
            newButton.style.fontSize = "15px";
            newButton.style.border = "none";
            newButton.style.padding = "4px";
            newButton.style.outline = "none";
            newButton.style.borderRadius = "3px";
            newButton.style.cursor = "pointer";
            newButton.backgroundColor = "rgb(66, 184, 221)";
            newButton.id = "newButton";
            newButton.onclick = function() {

                var menuObserver = new MutationObserver(function(mutations) {
                    if (!!document.getElementById("crefli_HC_PAY_SHEET_LINE_CAN")) {
                        document.getElementById("crefli_HC_PAY_SHEET_LINE_CAN").click();
                        menuObserver.disconnect();
                    } else if (!!document.getElementById("fldra_HC_UPDATE_PAYSHEETS1")) {
                        document.getElementById("fldra_HC_UPDATE_PAYSHEETS1").click();
                    } else if (!!document.getElementById("fldra_HC_PROCESS_PAYROLL_CAN")) {
                        document.getElementById("fldra_HC_PROCESS_PAYROLL_CAN").click();
                    } else if (!!document.getElementById('pthnavbca_HC_NORTH_AMERICAN_PAYROLL')) {
                        document.getElementById('pthnavbca_HC_NORTH_AMERICAN_PAYROLL').click();
                    }
                });

                // pass in the target node, as well as the observer options
                menuObserver.observe(document.getElementById("pthnavfly_PORTAL_ROOT_OBJECT"), {
                    attributes: true,
                    childList: true,
                    characterData: true,
                    subtree: true
                });

            };

            // Append the BUTTON
            document.getElementsByClassName('greeting_lds')[0].parentNode.appendChild(newButton);

            setTimeout(function() {
                // greetingNode.removeChildNode()
                greetingNode.parentNode.removeChild(document.getElementById("newButton"))
            }, 4000);
        }
    }
}

function onlineCheckDates(){

    // 7 hours = 25200000
    // 1 day = 86400000
    // new Date(1970,0,1).getTime() - 25200000 | The beginning of time (Jan 1, 1970 less 7 hours)

    var todayWithTime = new Date();

    var todayYear = todayWithTime.getFullYear();
    var todayMonth = todayWithTime.getMonth();
    var todayDay = todayWithTime.getDate();

    var todayDate = new Date(todayYear, todayMonth, todayDay).getTime();

    // Difference between today and May 26th, 2015 (Arbitrary PP Processing End Date)
    var daysSinceMay26 = todayDate - new Date(2015, 4, 26);

    // Days since last pay period end date - reaminder of daysSinceMay22 divided by 14
    var daysRemainder = daysSinceMay26 % (14 * 86400000);

    // If it is the last day of the pay period return the prior PP end date
    if (daysRemainder === 0) {
        daysRemainder = 14 * 86400000;
    };

    // Create the date object for the PP Processing End Date
    var PPDate = new Date(todayDate - daysRemainder + (10 * 86400000));

    var dd = PPDate.getDate();
    var mm = PPDate.getMonth() + 1;
    var yyyy = PPDate.getFullYear();

    var ppPayDate = new Date(PPDate.getTime() + 7 * 86400000);

    var dd1 = ppPayDate.getDate();
    var mm1 = ppPayDate.getMonth() + 1;
    var yyyy1 = ppPayDate.getFullYear();

    return [mm + '/' + dd + '/' + yyyy, mm1 + '/' + dd1 + '/' + yyyy1];
}

function ppDate(whichDay) {

    // 7 hours = 25200000
    // 1 day = 86400000
    // new Date(1970,0,1).getTime() - 25200000 | The beginning of time (Jan 1, 1970 less 7 hours)

    // Create a new Date object with only the date (not the time)
    var todayYear = new Date().getFullYear();
    var todayMonth = new Date().getMonth();
    var todayDay = new Date().getDate();

    var todayDate = new Date(todayYear, todayMonth, todayDay);

    // Difference between today and May 22th, 2015 (Arbitrary PP End Date)
    var daysSinceMay22 = todayDate - new Date(2015, 4, 22);

    // Days since last pay period end date - reaminder of daysSinceMay22 divided by 14 in miliseconds
    var daysRemainder = daysSinceMay22 % (14 * 86400000);

    // If it is the last day of the pay period return the prior PP end date
    if (daysRemainder === 0) {
        daysRemainder = 14 * 86400000;
    }

    // Create the date object for the PPDate
    var PPDate = new Date(todayDate - daysRemainder);

    // Subtract 13 days if requesting the first day of the PP
    if (whichDay === "first") {
        PPDate = new Date(PPDate - 1 * 86400000);
    }

    // Extract the day, month, and year values
    var dd = PPDate.getDate();
    var mm = PPDate.getMonth() + 1;
    var yyyy = PPDate.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
}

function displayModal(modalMessage) {
    var myDialog = document.createElement("dialog");
    myDialog.innerHTML = modalMessage;
    document.body.appendChild(myDialog);
    myDialog.showModal();
    setTimeout(function() {
        myDialog.close()
    }, 3000);
}

function clearObservers () {

    // New mutation observer to replace any outstanding observer
    var observer = new MutationObserver( function (mutations) { } );

    observer.observe(document.body, { attributes: true, childList: true, characterData: false });
    observer.disconnect();

    // New mutation observer to replace any outstanding observer
    if (document.getElementById("ptifrmtgtframe")) {
        observer.observe(document.getElementById("ptifrmtgtframe").contentDocument, { attributes: true, childList: true, characterData: false });
        observer.disconnect();
    };

    // Could also be id=someid, etc
    var targets = document.querySelectorAll('[class=someclassname]');

    // Update/replace the observers on all the targets
    for(var i = 0; i < targets.length; ++i) {
        observer.observe(targets[i], { attributes: true, childList: true, characterData: false } );
    }
}

function createSearchCriteriaObj() {

    var searchCriteriaObj = {
        "generateCheck": {
            "searchFieldID": "C_Z_PAY_OL_SRCH_PAY_END_DT",
            "searchFieldID2": "C_Z_PAY_OL_SRCH_EMPLID",
            "searchFieldID3": "C_Z_PAY_OL_SRCH_CHECK_DT",
            "searchValue": onlineCheckDates()[0],
            "searchValue2": localStorage.empid,
            "searchValue3": onlineCheckDates()[1],
            "searchButtonID": "#ICSearch",
            "moreThanSearch": "true"
        },
        "generateTriggers": {
            "searchFieldID": "C_TL_TR_STAT_VW_EMPLID",
            "searchValue": "temp",
            "searchButtonID": "#ICSearch",
            "moreThanSearch": "true"
        },
        "generateRetros": {
            "searchFieldID": "PAY_LINE_WORK_EMPLID",
            "searchValue": "temp",
            "searchButtonID": "#ICSearch",
            "moreThanSearch": "true"
        },
        "terminateEmployees": {
            "searchFieldID": "EMPLMT_SRCH_COR_EMPLID",
            "searchValue": "temp",
            "searchButtonID": "#ICSearch",
            "moreThanSearch": "true"
        },
        "openRequestTimeAdmin": {
            "searchFieldID": "PRCSRUNCNTL_RUN_CNTL_ID",
            "searchValue": "TimeAdmin",
            "searchButtonID": "#ICSearch"
        },
        "openTimesheet": {
            "searchFieldID": "TL_MSS_SRCH1_VW_FIELD_VALUE3$0",
            "searchValue": localStorage.empid,
            "searchButtonID": "TL_MSS_SRCH_WRK_GET_EMPLOYEES"
        },
        "openJobData": {
            "searchFieldID": "EMPLMT_SRCH_COR_EMPLID",
            "searchValue": localStorage.empid,
            "searchButtonID": "#ICSearch"
        },
        "openModifyAPerson": {
            "searchFieldID": "PERALL_SEC_SRCH_EMPLID",
            "searchValue": localStorage.empid,
            "searchButtonID": "#ICSearch"
        },
        "openProcessMonitor": {
            "moreThanSearch": "true"
        },
        "openClosePayableTime": {
            "searchFieldID": "RUN_CNTL_USER_RUN_CNTL_ID",
            "searchValue": "ClosePayableTime",
            "searchButtonID": "#ICSearch",
            "moreThanSearch": "true"
        },
        "openByPayline": {
            "searchFieldID": "PAY_LINE_WORK_EMPLID",
            "searchValue": localStorage.empid,
            "searchButtonID": "#ICSearch",
            "moreThanSearch": "true"
        },
        "openReviewPaycheck": {
            "searchFieldID": "ZZ_PAY_CHK_VW_EMPLID",
            "searchValue": localStorage.empid,
            "searchButtonID": "#ICSearch",
            "moreThanSearch": "true"
        },
        "openMaintainTimeReporterData": {
            "searchFieldID": "TL_TR_SRCH_EMPLID",
            "searchValue": localStorage.empid,
            "searchButtonID": "#ICSearch"
        },
        "openTLTRStatus": {
            "searchFieldID": "C_TL_TR_STAT_VW_EMPLID",
            "searchValue": localStorage.empid,
            "searchButtonID": "#ICSearch"
        },
        "openLeaveReport": {
            "searchFieldID": "PERS_SRCH_GBL_EMPLID",
            "searchValue": localStorage.empid,
            "searchButtonID": "#ICSearch"
        },
        "openopenUpdateEmployeeTaxData": {
            "searchFieldID": "C_EMPL_COMP_SRC_EMPLID",
            "searchValue": localStorage.empid,
            "searchButtonID": "#ICSearch"
        },
        "openReviewTriggers": {
            "searchFieldID": "PERS_SRCH_GBL_EMPLID",
            "searchValue": localStorage.empid,
            "searchButtonID": "#ICSearch"
        },
        "openUpdatePayrollOptions": {
            "searchFieldID": "EMPL_COMP_SRCH4_EMPLID",
            "searchValue": localStorage.empid,
            "searchButtonID": "#ICSearch"
        },
        "openModifyAPerson": {
            "searchFieldID": "PERALL_SEC_SRCH_EMPLID",
            "searchValue": localStorage.empid,
            "searchButtonID": "#ICSearch"
        },
        "openUploadProcess": {
            "searchFieldID": "C_TL_RUNCNTL_RUN_CNTL_ID",
            "searchValue": "Upload",
            "searchButtonID": "#ICSearch"
        },
        "openAbsenceAdjustments": {
            "searchFieldID": "GP_PI_MNL_AE_VW_EMPLID",
            "searchValue": localStorage.empid,
            "searchButtonID": "#ICSearch"
        },
        "openAbsenceEvents": {
            "searchFieldID": "EMPLMT_SRCH_GBL_EMPLID",
            "searchValue": localStorage.empid,
            "searchButtonID": "#ICSearch"
        },
        "openCreateAdditionalPay": {
            "searchFieldID": "C_EMPL_COMP_SRC_EMPLID",
            "searchValue": localStorage.empid,
            "searchButtonID": "#ICSearch"
        },
        "openTaskProfile": {
            "searchFieldID": "TL_TSKPRF_TASK_PROFILE_ID",
            "searchValue": localStorage.taskgroup,
            "searchButtonID": "#ICSearch"
        },
        "openGroupLists": {
            "searchFieldID": "GP_GRP_LIST_VW_GROUP_LIST_ID",
            "searchValue": "EMPLOYEE",
            "searchButtonID": "#ICSearch"
        },
        "openTaskGroup": {
            "searchFieldID": "TL_TASKGRP_TBL_TASKGROUP",
            "searchValue": localStorage.taskgroup,
            "searchButtonID": "#ICSearch"
        },
        "openTimeUnion": {
            "searchFieldID": "QRYSELECT_WRK_QRYSEARCHTEXT254",
            "searchValue": "Click",
            "searchButtonID": "#ICSearch"
        },
        "openAMCalc": {
            "searchFieldID": "PRCSRUNCNTL_RUN_CNTL_ID",
            "searchValue": "AMCalc",
            "searchButtonID": "#ICSearch"
        }
    };

    return searchCriteriaObj;
}
