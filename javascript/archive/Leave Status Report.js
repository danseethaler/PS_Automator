// This uses the MutationSummary library from google.


// The callback function called when a mutation occurs
function myMutationFunction(summaries) {

    if (summaries[0].added.length > 0) {
        // console.log(summaries[0].added);
        summaries[0].added.forEach(nodeAdded);
    }

    if (summaries[0].removed.length > 0) {
        // console.log(summaries[0].removed);
        summaries[0].removed.forEach(nodeRemoved);
    }

}

// Function executed when node is added to the DOM
function nodeAdded(newNode){
    if (!!newNode.id) {

        if (newNode.id === "pthnavbccrefanc_C_RUNCTL_CPAY019U_USA" && localStorage.nextAction === "runReport" && document.getElementById("ptifrmtgtframe").contentDocument.getElementById("C_SQR_SECURE_DEPTID").value.length === 10) {
            document.getElementById("ptifrmtgtframe").contentDocument.getElementById("PRCSRQSTDLG_WRK_LOADPRCSRQSTDLGPB").click();
            localStorage.clear();
        }else if (newNode.id === "pthnavbccrefanc_C_RUNCTL_CPAY019U_USA" && localStorage.nextAction === "runReport") {
            if (document.getElementById("ptifrmtgtframe").contentDocument.getElementById("#ICNextInList").title === "Next in list (inactive button) (Alt+3)") {
                console.log("No further run controls exists. Disconnecting observer.");
                observer.disconnect();
            }else {
                document.getElementById("ptifrmtgtframe").contentDocument.getElementById("#ICNextInList").click();
                localStorage.nextAction = "runReport";
            }
        }

        if (newNode.id.substring(0,10) === "ptModFrame") {

          setTimeout(function(){
              if (!!document.getElementById(newNode.id).contentDocument.getElementById("#ICSave")) {
                  document.getElementById(newNode.id).contentDocument.getElementById("#ICSave").click()
              }else {
                  console.log("#ICSave not yet available");
              }
          },300);

        }
    }
}

// Function executed when node is removed to the DOM
function nodeRemoved(removedNode){

    if (!!removedNode.id) {

        if (removedNode.id.substring(0,10) === "ptModFrame") {

            if (document.getElementById("ptifrmtgtframe").contentDocument.getElementById("#ICNextInList").title === "Next in list (inactive button) (Alt+3)") {
                console.log("No further run controls exists. Disconnecting observer.");
                observer.disconnect();
            }else {
                document.getElementById("ptifrmtgtframe").contentDocument.getElementById("#ICNextInList").click();
                localStorage.nextAction = "runReport";
            }
        }
    }
}

// Initializing a new MutationSummary observer
var observer = new MutationSummary({
  callback: myMutationFunction,
  queries: [{ all:true }]
});
