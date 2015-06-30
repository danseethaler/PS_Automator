switch (localStorage.scriptAction) {

    case "generateCheck":

        switch (localStorage.nextAction) {

            case "navToFavorite":
                navToFavorite(localStorage.componentName);
                localStorage.nextAction = "enterData";

            case "enterData":

                // Check if the initial check page is available to enter data into.
                if (checkIframeAndID("C_Z_PAY_OL_SRCH_PAY_END_DT")) {
                    // Dynamically create dates for PPend and pay date.

                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth()+1; //January is 0!
                    var yyyy = today.getFullYear();

                    today = mm+'/'+dd+'/'+yyyy;

                    // Enter the data into the fields.
                    document.getElementById("ptifrmtgtframe").contentDocument.getElementById("C_Z_PAY_OL_SRCH_EMPLID").value = localStorage.empid;
                    document.getElementById("ptifrmtgtframe").contentDocument.getElementById("C_Z_PAY_OL_SRCH_CHECK_DT").value = "061215";
                    document.getElementById("ptifrmtgtframe").contentDocument.getElementById("#ICSearch").click();

                }else {
                    localStorage.clear();
                    break;
                }

            case "clickNextPayline":

                localStorage.nextAction = "openSections";

                checkIframeAndID("$ICField24$hdown$0","click")

                var tryCount = 0;
                var waitForPayline = setInterval(function(){

                    tryCount++;
                    if (tryCount > 20) {
                        clearInterval(waitForPayline);
                    }

                    if (!!document.getElementById("ptifrmtgtframe")) {
                        if (!!document.getElementById("ptifrmtgtframe").contentDocument.getElementById("PAY_OL_PB_WRK_CALC_PB$0")) {
                            document.getElementById("ptifrmtgtframe").contentDocument.getElementById("PAY_OL_PB_WRK_CALC_PB$0").click();
                            clearInterval(waitForPayline);
                        }
                    }

                }, 500);

                break;

            case "openSections":

                if (checkIframeAndID('$ICField27$expand$0')) {
                    document.getElementById("ptifrmtgtframe").contentDocument.getElementById("$ICField27$expand$0").click();
                }else {
                    return;
                }

                // Wait for load time popup box to appear
                var tryCount = 0;
                var waitForNode = setInterval(function(){

                    tryCount++;
                    if (tryCount > 10) {
                        clearInterval(waitForNode);
                    }

                    if (!!document.getElementById("ptifrmtgtframe")) {
                        if (!!document.getElementById("ptifrmtgtframe").contentDocument.getElementById('$ICField27$expand$0')) {
                            clearInterval(waitForNode);
                        }
                    }

                }, 500);

                setTimeout(function (){
                    console.log('open deduction section');
                    waitAndClick("PAY_DEDUCTION$expand$0");
                }, 500);

                setTimeout(function (){
                    console.log('open taxes section');
                    waitAndClick("PAY_TAX$expand$0","clear");
                }, 1000);

                localStorage.clear();

                break;

            default:
                console.log("No action defined in switch statement. nextAction:" + localStorage.nextAction);
                break;
        }

        break;

    case "generateTriggers":
        console.log("generateTriggers case statement.");
        break;

    case "generateAdditionalPay":
        break;

    default:

        if (localStorage.nextAction === "navToFavorite") {
            navToFavorite(localStorage.componentName);
        }

        localStorage.clear();
        break;
}
