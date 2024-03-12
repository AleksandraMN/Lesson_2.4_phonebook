'use strict';

const {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
} = require('./modules/control');

const {
  renderPhoneBook,
  renderContacts,
} = require('./modules/render');

const {
  getStorage,
} = require('./modules/serviceStorage');


{
  const init = (selectorApp, title, keys) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
      table,
    } = renderPhoneBook(app, title, keys);


    // Функционал
    const data = getStorage(keys);
    let allRow = renderContacts(list, data);

    const {closeModal} = modalControl(btnAdd, formOverlay);
    hoverRow(allRow, logo);

    deleteControl(btnDel, list);
    formControl(form, list, closeModal, keys);

    //  сортировка по алфавиту (не доделан до конца)
    table.addEventListener('click', (e) => {
      const target = e.target;
      if (target.textContent === 'Имя') {
        for (const el of allRow) {
          el.remove();
        }
        data.sort((x, y) => x.name.localeCompare(y.name));
        allRow = renderContacts(list, data, keys);
      }
      if (target.textContent === 'Фамилия') {
        for (const el of allRow) {
          el.remove();
        }
        data.sort((x, y) => x.surname.localeCompare(y.surname));
        allRow = renderContacts(list, data, keys);
      }
    });
  };

  window.phoneBookInit = init;
}
