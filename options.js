const save_options = () => {
    const insiders = document.getElementById("insiders").checked;
    chrome.storage.sync.set({ insiders }, () => {});
};

const restore_options = () => {
    chrome.storage.sync.get({ insiders: false }, items => {
        document.getElementById("insiders").checked = items.insiders;
    });
};

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("insiders").addEventListener("change", save_options);
