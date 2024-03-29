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

function nodeAdded(newNode){
    if (!!newNode.id) {

        if (newNode.id === "ptabnsp_pthnavbccref_C_RUNCTL_CPAY908B_USA" && localStorage.nextAction === "runReport") {
            document.getElementById("ptifrmtgtframe").contentDocument.getElementById("RUN_CNTL_USER_RUN_ID").value = "B1515";
            if (document.getElementById("ptifrmtgtframe").contentDocument.getElementById("RUN_CNTL_USER_C_FROM_DEPTID").value.length === 10) {
                document.getElementById("ptifrmtgtframe").contentDocument.getElementById("PRCSRQSTDLG_WRK_LOADPRCSRQSTDLGPB").click();
            }else {
                alert("Please add 10 digit Deptid to run control before continuing this script.");
                observer.disconnect();
            }
            localStorage.clear();
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

var observer = new MutationSummary({
  callback: myMutationFunction,
  queries: [{ all:true }]
});
