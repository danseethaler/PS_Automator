function tabUpdated( tabId, changeInfo, tab ) {

    // Only execute when DOM has finished loading.
    if (changeInfo.status == "complete") {

        chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {

            switch(tabs[0].url.substring(0,30)){
                case "https://hrcore91-sg-stage.ldsc":
                    matchingURL = true;
                    break;
                case "https://hrcore91.ldschurch.org":
                    matchingURL = true;
                    break;
                case "https://hradmin91-sg-stage.lds":
                    matchingURL = true;
                    break;
                case "https://hradmin91.ldschurch.or":
                    matchingURL = true;
                    break;
                default:
                    matchingURL = false;
            }

            // Show the page action icon if the URL matches string.
            if (matchingURL) {
                chrome.pageAction.show(tabId);
            }

            // Notify the content script that the DOM has finished loading.
            chrome.tabs.sendMessage(tabs[0].id, {pageStatus: "complete"}, function(response) {

            });
        });
    }
}

// Call the above function when the url of a tab changes.
chrome.tabs.onUpdated.addListener(tabUpdated);

chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
});

chrome.tabs.query({lastFocusedWindow: true}, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        // console.log(tabs[i].title);
    }
});
