'use strict';


const getStorage = (keys) => {
  const data = localStorage.getItem('keys') ?
    JSON.parse(localStorage.getItem('keys')) : [];
  return data;
};

const setStorage = (keys, contact) => {
  const data = getStorage(keys);
  data.push(contact);
  localStorage.setItem('keys', JSON.stringify(data));
};

const removeStorage = (value) => {
  const data = getStorage();

  for (let i = 0; i < data.length; i++) {
    if (data[i].phone === value) {
      data.splice(i, 1);
      break;
    }
  }
  localStorage.setItem('keys', JSON.stringify(data));
};


module.exports = {
  getStorage,
  setStorage,
  removeStorage,
};
