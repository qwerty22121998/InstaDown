chrome.runtime.onMessage.addListener(message => {
    if (message != null) downloadAFile(message)
});


let downloadAFile = url => {
    chrome.downloads.download({
        url: url
    })
}