// Saves options to chrome.storage.sync.
function save_options() {
  var blist = document.getElementById('blist').value.toLowerCase();
  var size  = document.getElementById('size').value;
  var position = document.getElementById('position').value;
  var prevent = document.getElementById('prevent').checked ? true : false;
  var sound = document.getElementById('sound').checked ? true : false;
  var loop = document.getElementById('loop').checked ? true : false;

  chrome.storage.sync.set({
    blackList: blist,
    notif_size: size,
    notif_pos: position,
    prevent_on: prevent,
    sound_on: sound,
    loop_on: loop
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = chrome.i18n.getMessage("optionsSaved");
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    blackList: 'facebook.com,reddit.com',
    notif_size: 'small',
    notif_pos: '8',
    prevent_on: false,
    sound_on: false,
    loop_on: false
  }, function(items) {
    document.getElementById('blist').value = items.blackList;
    document.getElementById('size').value = items.notif_size;
    document.getElementById('position').value = items.notif_pos;
    document.getElementById('prevent').checked = items.prevent_on;
    document.getElementById('sound').checked = items.sound_on;
    document.getElementById('loop').checked = items.loop_on;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

// Translate labels
document.getElementById("blistSpan").innerHTML = chrome.i18n.getMessage("optionsBlocklist") + ": ";
document.getElementById("sizeSpan").innerHTML = chrome.i18n.getMessage("optionsSize") + ": ";
document.getElementById("positionSpan").innerHTML = chrome.i18n.getMessage("optionsPosition") + ": ";
document.getElementById("preventSpan").innerHTML = chrome.i18n.getMessage("optionsPrevent") + ": ";
document.getElementById("soundSpan").innerHTML = chrome.i18n.getMessage("optionsSound") + ": ";
document.getElementById("loopSpan").innerHTML = chrome.i18n.getMessage("optionsLoop") + ": ";
document.getElementById("save").innerHTML = chrome.i18n.getMessage("optionsSave");