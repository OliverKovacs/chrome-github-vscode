// Oliver Kovacs 2021

const github = new RegExp("https:\/\/github\.com\/\\w+\/\\w+");
const timeout = 1000;       // Google pls fix

const update = (url, tabId) => {
    if (!url.match(github)) {
        return chrome.action.disable(tabId);
    }
    chrome.action.enable(tabId);
    chrome.action.onClicked.addListener(tab => {
        chrome.storage.sync.get({ insiders: false }, items => {
            chrome.tabs.update(tab.id, {
                url: `vscode${items.insiders ? "-insiders" : ""}://GitHub.remotehub/open?url=${url}`,
            });
        });
    });
};

chrome.tabs.onActivated.addListener(info => {
    setTimeout(async () => {
        const tab = await chrome.tabs.get(info.tabId);
        update(tab.url, tab.id);
    }, timeout);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (!changeInfo.url) return;
    update(changeInfo.url, tabId);
});
