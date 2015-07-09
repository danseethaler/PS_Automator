// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {

    // Hide all the DOM elements that don't apply to the current system
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {scriptAction: "getSystem"}, function(response) {
        if (response.system === "core") {
            var hideIDs = [
                "openAddUpdatePosition",
                "openAddAPerson",
                "openI9EVerifyHome",
                "openModifyAPerson",
                "openUpdateEmployeeTaxData",
                "openUpdatePayrollOptions",
                "toggleTerminateGroup"
            ];

            for (var i = hideIDs.length - 1; i >= 0; i--) {
                var nodeParent = document.getElementById(hideIDs[i]).parentNode;
                nodeParent.removeChild(document.getElementById(hideIDs[i]));
            };

        }else if(response.system === "admin"){

            var hideIDs = [
                "toggleOffCycleGroup",
                "toggleTriggerGroup",
                "toggleRetrosGroup",
                "openRequestTimeAdmin",
                "openLeaveReport",
                "openAMCalc",
                "openProcessMonitor",
                "openTLTRStatus",
                "openMaintainTimeReporterData",
                "openOCOnDemand",
                "openClosePayableTime",
                "openByPayline",
                "openReviewTriggers",
                "openTaskGroup",
                "openUploadProcess",
                "openAbsenceAdjustments",
                "openAbsenceEvents",
                "openCreateAdditionalPay",
                "openStaticGroup",
                "openGroupLists",
                "openTaskProfile"
            ];

            for (var i = hideIDs.length - 1; i >= 0; i--) {
                var nodeParent = document.getElementById(hideIDs[i]).parentNode;
                nodeParent.removeChild(document.getElementById(hideIDs[i]));
            };
        }
      });
    });

    { // Add event listeners
        document.querySelector("#main").addEventListener("click", toggleDivs, false);

        document.querySelector('#triggerList').addEventListener('change', convertString, false);
        // document.querySelector('#additionalPayList').addEventListener('change', convertString, false);
        document.querySelector('#retrosList').addEventListener('change', convertString, false);
        document.querySelector('#terminationList').addEventListener('change', convertString, false);

        document.querySelector("#generateCheck").addEventListener("click", generateCheck, false);
        document.querySelector("#generateCheck").addEventListener("contextmenu", generateCheck, false);
        document.querySelector("#generateTriggers").addEventListener("click", generateTriggers, false);
        document.querySelector("#generateTriggers").addEventListener("contextmenu", generateTriggers, false);
        document.querySelector("#generateRetros").addEventListener("click", generateRetros, false);
        document.querySelector("#generateRetros").addEventListener("contextmenu", generateRetros, false);
        document.querySelector("#terminateEmployees").addEventListener("click", terminateEmployees, false);
        document.querySelector("#terminateEmployees").addEventListener("contextmenu", terminateEmployees, false);
        // document.querySelector("#createAdditionalPay").addEventListener("click", generateAdditionalPay, false);

        var mySquares = document.getElementsByClassName('square');

        for (var i = 0; i < mySquares.length; i++) {
            mySquares[i].addEventListener("contextmenu", sendAction, false);
            mySquares[i].addEventListener("click", sendAction, false);
        }

        document.addEventListener("keypress", insertEmpID, false);
    }

    // Clear localStorage when page action is clicked
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {scriptAction:"clearStorage"}, function(response) {
      });
    });
});

function insertEmpID (e) {

    // If any of the collapsible nodes are displayed then don't do anything
    collapsibleNodes = document.getElementsByClassName("collapsible");
    for (var i = collapsibleNodes.length - 1; i >= 0; i--) {
        if (collapsibleNodes[i].style.display === "block") {
            return;
        };
    };

    var newEmpid = document.getElementById("newEmpid");

    // If the length of the EmpID field is already 6 digits or the user pressed the delete key then wipe out the field
    if (newEmpid.value.length > 5 || e.keyCode === 8 || e.keyCode === 13) {
        newEmpid.value = "";
    }

    // If the user typed a digit add it to the empID field
    if(e.keyCode > 47 && e.keyCode < 58){
        newEmpid.value += (e.keyCode - 48);
    }

    // Hide the field if nothing is entered
    if (newEmpid.value === "") {
        newEmpid.style.display = "none";
    }else{
        newEmpid.style.display = "block";
    }

    if (newEmpid.value.length < 6) {
        newEmpid.style.color = "red";
    }else{
        newEmpid.style.color = "black";
    }
}

function sendAction(e){


    var requestObject = {
        "scriptAction": e.target.id
    };

    if (e.type === "contextmenu") {
        e.preventDefault();
    }else if (e.type === "click") {
        requestObject.pageStay = true;
    }

    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {scriptAction: "getSystem"}, function(response) {

        if (response.system === "core") {
            var componentNameObj = {
                "generateTriggers":"TL TR Status",
                "createAdditionalPay":"Create Additional Pay",

                "openQueryManager":"Query Manager",
                "openTimesheet":"Timesheet",
                "openRequestTimeAdmin":"Request Time Administration",
                "openJobData":"Job Data",

                "openReviewPaycheck":"Review Paycheck - USA",
                "openLeaveReport":"Employee Leave Report",
                "openAMCalc":"Calculate Absence and Payroll",
                "openProcessMonitor":"Process Monitor",

                "openTLTRStatus":"TL TR Status",
                "openMaintainTimeReporterData":"Maintain Time Reporter Data",
                "openOCOnDemand":"Off Cycle On Demand",
                "openClosePayableTime":"Close Payable Time",

                "openByPayline":"By Payline",
                "openReviewTriggers":"Review Triggers",
                "openTaskGroup":"Taskgroup",
                "openUploadProcess":"Upload Process",

                "openAbsenceAdjustments": "Absences",
                "openAbsenceEvents": "Absence Event",
                "openCreateAdditionalPay": "Create Additional Pay",
                "openTaskProfile": "Task Profile",

                "openStaticGroup": "Static Group",
                "openTimeUnion": "Query Manager",
                "openModifyAPerson": "Modify a Person",
                "openGroupLists": "Group Lists"
            };

        }else if (response.system === "admin") {
            var componentNameObj = {
                "openJobData":"Add/Update Job",
                "openQueryManager":"Query Manager",
                "openTimesheet":"Timesheet",
                "openAddUpdatePosition": "Add/Update Position",

                "openAddAPerson": "Add a Person",
                "openI9EVerifyHome": "I-9 & E-Verify Homepage",
                "openModifyAPerson": "Modify a Person",
                "openReviewPaycheck":"Review Paycheck US",

                "openUpdateEmployeeTaxData": "Update Employee Tax Data US",
                "openUpdatePayrollOptions": "Update Payroll Options US",
            };
        }

        requestObject.componentName = componentNameObj[e.target.id];

        // Add the EmpID to the request object if available
        if (document.getElementById("newEmpid").value.length === 6) {
            var typedEmpid = document.getElementById("newEmpid").value;
            requestObject.empid = typedEmpid;
            sendToClipboard(typedEmpid);

        }else if (e.target.id === "openTaskGroup" || e.target.id === "openTaskProfile") {
            if (!!getEmpidFromClipboard("taskgroup")) {
                requestObject.taskgroup = getEmpidFromClipboard("taskgroup");
            }
        }else if (!!getEmpidFromClipboard("empid")) {
            requestObject.empid = getEmpidFromClipboard("empid");
        }

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, requestObject, function(response) {
          });
        });
        window.close();

      });
    });
}

function terminateEmployees (e) {

    if (localStorage.terminationList === undefined) {
        // TODO: Add quick message function to explain why a function doesn't continue
        console.log("localStorage.retrosList is undefined : ", localStorage.terminationList)
        return false;
    };

    var requestObject = {
        "scriptAction": e.target.id,
        "componentName": "Add/Update Job",
        "terminationList": localStorage.terminationList
    };

    // Set the pageStay based on the contextMenu or click event
    if (e.type === "contextmenu") {
        e.preventDefault();
    }else if (e.type === "click") {
        requestObject.pageStay = true;
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, requestObject, function(response) {
      });
    });

    window.close();
}

function generateCheck(e){

    var empid = document.getElementById('empid').value;

    if (/^\d+$/.test(empid) && (empid.length == 6 || empid.length == 9)) {

        // Create object with check data.
        var requestObject = {
            scriptAction:'generateCheck',
            componentName:"Create Online Check",
            empid:document.getElementById('empid').value,
            subset:document.getElementById('dedsubset').value,
            manualCheck:document.getElementById('manualCheck').checked
        };

        // Set the pageStay based on the contextMenu or click event
        if (e.type === "contextmenu") {
            e.preventDefault();
        }else if (e.type === "click") {
            requestObject.pageStay = true;
        }

        // Send message to firstresponse.js with check data.
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, requestObject, function(response) {
          });
        });
        window.close();
    }else {
        console.log("Please enter a valid empid before continuing.");

    }
}

function generateRetros (e) {

    if (localStorage.retrosList === undefined) {
        // TODO: Add quick message function to explain why a function doesn't continue
        console.log("localStorage.retrosList is undefined : ", localStorage.retrosList)
        return false;
    };

    var requestObject = {
        "scriptAction": e.target.id,
        "componentName": "By Payline",
        "retrosList": localStorage.retrosList
    };

    // Set the pageStay based on the contextMenu or click event
    if (e.type === "contextmenu") {
        e.preventDefault();
    }else if (e.type === "click") {
        requestObject.pageStay = true;
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, requestObject, function(response) {
      });
    });

    window.close();
}

function generateTriggers(e){

    if (localStorage.triggerList === undefined) {
        // TODO: Add quick message function to explain why a function doesn't continue
        console.log("localStorage.triggerList is undefined")
        return false;
    };

    var requestObject = {
        "scriptAction": e.target.id,
        "componentName": "TL TR Status",
        "triggerList": localStorage.triggerList
    };

    if (document.getElementById("AMTriggers").checked) {
        requestObject.AMTriggerList = requestObject.triggerList;
    };

    // Set the pageStay based on the contextMenu or click event
    if (e.type === "contextmenu") {
        e.preventDefault();
    }else if (e.type === "click") {
        requestObject.pageStay = true;
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, requestObject, function(response) {
      });
    });

    window.close();
}

function generateAdditionalPay(){

    // Create object with check data.
    var generateAdditionalPayJSON = {
        scriptAction:'generateAdditionalPay'
    };

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, generateAdditionalPayJSON, function(response) {
      });
    });
    window.close();
}

function toggleDivs(e) {

    if (e.target.className == 'nav') {

        // Clear the new EmpID field
        document.getElementById("newEmpid").value = "";
        document.getElementById("newEmpid").style.display = "none";

        var toggleGroup = document.getElementById(e.target.title);

        if (toggleGroup.style.display == "block"){
          toggleGroup.style.display = "none";

        }else{
          toggleGroup.style.display = "block";
          if (e.target.title !== "offCycleGroup") {
              toggleGroup.childNodes[1].select();
          }

          // Collapse the other divs
          var all = document.getElementsByClassName("collapsible");
          for (var i=0, max=all.length; i < max; i++) {
              if (all[i].id != e.target.title) {
                all[i].style.display = "none";
              }
          }

        }
    }else {
        e.stopPropagation();

    }

    // Enter the clipboardData to empid for off-cycle checks
    if (e.target.title == "offCycleGroup" && document.getElementById('offCycleGroup').style.display === "block") {
        var clipboardData = getEmpidFromClipboard("empid");
        if (/^\d+$/.test(clipboardData) && clipboardData.length == 6 || clipboardData.length == 9) {
            document.getElementById('empid').value = clipboardData;
        }else {
            console.log("Clipboard data does not match empid format.");
        }
    }
}

function convertString(e){
    var valueListID = e.target.id;
    var pastedString = document.getElementById(valueListID).value.trim();

    if (valueListID === "triggerList") {
        excelToJSONTriggers(pastedString, valueListID);

    }else if (valueListID === "additionalPayList") {
        excelToJSON(pastedString, valueListID);

    }else if (valueListID === "retrosList") {
        excelToJSONRetros(pastedString, valueListID);

    }else if (valueListID === "terminationList") {
        excelToJSONTerminations(pastedString, valueListID);
    };
}

function excelToJSONTerminations(pastedString, valueListID){

    var pastedStringArray = pastedString.split(/[\n\r\t]/g);

    var textToJSON = '[';

    for (var i = 0; i < pastedStringArray.length; i++) {
        // stepCount should be the remainder when devided by the number of data points for each employee
        var stepCount = i%6;

        // Check to see if value is missing on last employee values
        if (stepCount !== 5 && i === pastedStringArray.length) {
            console.log("Missing values on end of array.");
            return false;
        }

        // If this is the first item in the string (empID)
        if (stepCount === 0) {
            // Make sure the EmpID contains 6 or 9 digits
            if (/^\d+$/.test(pastedStringArray[i]) && (pastedStringArray[i].length == 6 || pastedStringArray[i].length == 9)) {
                textToJSON += '{"empid":"' + pastedStringArray[i] + '",';

            }else {
                console.log("EmpID " + pastedStringArray[i] + " is not in a valid format. Iteration #" + i);
                return false;
            }

        }else if (stepCount === 1) {// emplRcd
            textToJSON += '"emplRcd":"' + pastedStringArray[i] + '",';
        }else if (stepCount === 2) {// termDate
            textToJSON += '"termDate":"' + pastedStringArray[i] + '",';
        }else if (stepCount === 3) {// jobAction
            textToJSON += '"jobAction":"' + pastedStringArray[i] + '",';
        }else if (stepCount === 4) {// reason
            textToJSON += '"reason":"' + pastedStringArray[i] + '",';
        }else if (stepCount === 5) {// rehireElig
            textToJSON += '"rehireElig":"' + pastedStringArray[i] + '"}'

            // If this is the last element in the array add a square bracket, otherwise add a comma
            if ((i + 1) === pastedStringArray.length) {
                textToJSON += ']'
            }else {
                textToJSON += ','
            }
        }
    }

    // Set local storage of triggerDate
    localStorage.terminationList = textToJSON;

    JSONToTable(JSON.parse(textToJSON), valueListID);
}

function excelToJSONTriggers(pastedString, valueListID){

    var pastedStringArray = pastedString.replace(/[$]/g, "").split(/[\n\r\t\,]/g);

    var textToJSON = '[';

    for (var i = 0; i < pastedStringArray.length; i++) {
        var stepCount = i%3;

        // Check to see if value is missing on last employee values
        if (stepCount !== 2 && i === pastedStringArray.length) {
            console.log("Missing values on end of array.");
            return false;
        }

        // If this is the first item in the array (empid)
        if (stepCount === 0) {
            if (/^\d+$/.test(pastedStringArray[i]) && (pastedStringArray[i].length == 6 || pastedStringArray[i].length == 9)) {
                textToJSON += '{"empid":"' + pastedStringArray[i] + '",';
            }else {
                console.log("EmpID " + pastedStringArray[i] + " is not in a valid format. Iteration #" + i);
                return false;
            }

        // If this is the second item in the array (emplRcd)
        }else if (stepCount === 1) {
            textToJSON += '"emplRcd":"' + pastedStringArray[i] + '",';

        // If this is third item in the array (date)
        }else if (stepCount === 2) {
            textToJSON += '"triggerDate":"' + pastedStringArray[i] + '"}';

            // If this is the last element in the array add a square bracket, otherwise add a comma
            if ((i + 1) === pastedStringArray.length) {
                textToJSON += ']'
            }else {
                textToJSON += ','
            }
        }

    }

    localStorage.triggerList = textToJSON;
    JSONToTable(JSON.parse(textToJSON), valueListID);
    return textToJSON;
}

function excelToJSONRetros(pastedString, valueListID){

    var pastedStringArray = pastedString.replace(/[$]/g, "").split(/[\n\r\t]/g);

    var textToJSON = '[';

    for (var i = 0; i < pastedStringArray.length; i++) {
        var stepCount = i%2;

        // Check to see if value is missing on last employee values
        if (stepCount !== 1 && i === pastedStringArray.length) {
            console.log("Missing values on end of array.");
            return false;
        }

        // If this is an odd numbered item (empid)
        if (stepCount === 0) {
            if (/^\d+$/.test(pastedStringArray[i]) && (pastedStringArray[i].length == 6 || pastedStringArray[i].length == 9)) {
                textToJSON += '{"empid":"' + pastedStringArray[i] + '",';

            }else {
                console.log("EmpID " + pastedStringArray[i] + " is not in a valid format. Iteration #" + i);
                return false;
            }

        // If this is an even numbered item (date/amount)
        }else if (stepCount === 1) {
            textToJSON += '"retroAmount":"' + pastedStringArray[i] + '"}'

            // If this is the last element in the array add a square bracket, otherwise add a comma
            if ((i + 1) === pastedStringArray.length) {
                textToJSON += ']'
            }else {
                textToJSON += ','
            }
        }
    }

    // Set local storage of triggerDate
    localStorage.retrosList = textToJSON;

    JSONToTable(JSON.parse(textToJSON), valueListID);

    return textToJSON;
}

function JSONToTable(JSONObject, valueListID){

    var propertiesCount = Object.keys(JSONObject[0]).length
    var objectKeys = Object.keys(JSONObject[0]);

    var triggerTable = document.createElement('table');
    var headerRow = document.createElement('tr');

    // Generate the cells on the header row
    for (var i = 0; i < objectKeys.length; i++) {
        var currentCell = document.createElement('th');
        currentCell.innerHTML = objectKeys[i];
        headerRow.appendChild(currentCell);
    }

    // Append the header row
    triggerTable.appendChild(headerRow);

    // Generate the cells on the other rows row
    for (var thisObject in JSONObject){
        if (JSONObject.hasOwnProperty(thisObject)) {

            // Create the row node
            var nextRowNode = document.createElement('tr');

            for (thisProperty in JSONObject[thisObject]){
                if (JSONObject[thisObject].hasOwnProperty(thisProperty)) {

                    // Create the cells and add the contents
                    currentCell = document.createElement('td');
                    currentCell.innerHTML = JSONObject[thisObject][thisProperty];
                    nextRowNode.appendChild(currentCell);
                }
            }

            // Add the new row to the table
            triggerTable.appendChild(nextRowNode);

        }
    }

    // Swap the textbox with the formatted HTML Table
    var valueListNode = document.getElementById(valueListID);
    var valueListParentNode = document.getElementById(valueListID).parentNode;

    triggerTable.id = "valueListTable";
    triggerTable.style.width = "100%";
    valueListNode.parentNode.replaceChild(triggerTable,valueListNode.parentNode.childNodes[1]);

  return;
}

function excelToJSON(pastedString){

    var pastedStringArray = pastedString.replace(/[\n\r\t]/g, ",").split(",");

    var textToJSON = '[';

    for (var i = 0; i < pastedStringArray.length; i++) {
        var stepCount = i%3;

        // Check to see if value is missing on last employee values
        if (stepCount !== 2 && i === pastedStringArray.length) {
            console.log("Missing values on end of array.");
            return false;
        }

        if (stepCount === 0) {
            if (/^\d+$/.test(pastedStringArray[i]) && (pastedStringArray[i].length == 6 || pastedStringArray[i].length == 9)) {
                textToJSON += '{"empid":"' + pastedStringArray[i] + '",';

            }else {
                console.log("EmpID " + pastedStringArray[i] + " is not in a valid format.");
                return false;
            }

        }else if (stepCount === 1) {
            textToJSON += '"earningsCode":"' + pastedStringArray[i] + '",';

        }else if (stepCount === 2) {
            if ((i + 1) === pastedStringArray.length) {
                textToJSON += '"dollarAmount":"' + pastedStringArray[i] + '"}]'

            }else {
                textToJSON += '"dollarAmount":"' + pastedStringArray[i] + '"},'
            }

        }
    }

    return JSON.parse(textToJSON);
}

function stringToTable(pastedString, valueListID){
  stringToTable = pastedString;

  var currentCell
  var earningsTable = document.createElement('table');
  var headerRow = document.createElement('tr');

    currentCell = document.createElement('th');
    currentCell.innerHTML = "EmpID";
    headerRow.appendChild(currentCell);

    currentCell = document.createElement('th');
    currentCell.innerHTML = "Earnings Code";
    headerRow.appendChild(currentCell);

    currentCell = document.createElement('th');
    currentCell.innerHTML = "Amount";
    headerRow.appendChild(currentCell);

  earningsTable.appendChild(headerRow);

  var firstArray = stringToTable.split('\n');

  while (firstArray.length > 0) {
    var currentRow = firstArray.shift().split('\t');
    var nextRowNode = document.createElement('tr');

    while (currentRow.length > 0) {
      currentCell = document.createElement('td');
      currentCell.innerHTML = currentRow.shift();
      nextRowNode.appendChild(currentCell);
    }
    earningsTable.appendChild(nextRowNode);
  }

    // Swap the textbox with the formatted HTML Table
    var valueListNode = document.getElementById(valueListID);
    var valueListParentNode = document.getElementById(valueListID).parentNode;
    console.log(valueListNode);
    earningsTable.id = "valueListTable";
    valueListNode.parentNode.replaceChild(earningsTable,valueListNode.parentNode.childNodes[1]);

  return;
}

function getEmpidFromClipboard(cbValue){
    var sandbox = document.getElementById('sandbox');
    sandbox.style.display = "block";
    sandbox.value = '';
    sandbox.select();
    if (document.execCommand('paste')) {
         var clipboardData = sandbox.value.trim();
    }
    sandbox.style.display = "none";
    sandbox.value = '';

    if (cbValue === "empid") {

        if (/^\d+$/.test(clipboardData) && (clipboardData.length === 6 || clipboardData.length === 9)) {
            return clipboardData;
        }else {
            return false;
        }

    }else if (cbValue ==="taskgroup") {
        if (/^\d+$/.test(clipboardData) && (clipboardData.length === 7)) {
            return clipboardData;
        }else {
            return false;
        }
    }
}

function sendToClipboard (stringToClipboard) {
    var sandbox = document.getElementById('sandbox');
    sandbox.style.display = "block";
    sandbox.value = stringToClipboard;
    sandbox.select();

    document.execCommand('copy')

    sandbox.value = '';
    sandbox.style.display = "none";
}
