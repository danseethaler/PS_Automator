
// Saves options to chrome.storage.sync.
function saveOptions() {
  var newTabVar = document.getElementById('newTab').checked;
  chrome.storage.sync.set({
    newTab: newTabVar
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

function getChildIndex(node)
{
    var i = 1;
    while (node = node.previousSibling) {
        ++i
    }
    return --i;}
