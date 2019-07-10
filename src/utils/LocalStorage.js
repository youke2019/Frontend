
/*
*   load Data through local storage.
*   default value for autoSync & synInBackground = false;
* */
function loadData (params) {
  const {key, autoSync = false, synInBackground = false} = params;
  return storage.load({
      key:key,
      autoSync: autoSync,
      syncInBackground: synInBackground,
  })
}

function saveData (params) {
  const {key, data} = params;
  return storage.save({
    key:key,
    data:data,
  })
}
module.exports = {
  loadData: loadData,
  saveData: saveData,
}