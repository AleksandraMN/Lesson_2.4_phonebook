
import * as modControl from './modules/control.js';
import {renderPhoneBook, renderContacts} from './modules/render.js';
import storageModule from './modules/serviceStorage.js';

const {getStorage} = storageModule;

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

    const {closeModal} = modControl.modalControl(btnAdd, formOverlay);
    modControl.hoverRow(allRow, logo);

    modControl.deleteControl(btnDel, list);
    modControl.formControl(form, list, closeModal, keys);

    //  сортировка по алфавиту
    table.addEventListener('click', (e) => {
      const target = e.target;
      if (target.textContent === 'Имя') {
        for (const el of allRow) {
          el.remove();
        }
        data.sort((x, y) => x.name.localeCompare(y.name));
        allRow = renderContacts(list, data, keys);
        localStorage.setItem('keys', JSON.stringify(data));
      }
      if (target.textContent === 'Фамилия') {
        for (const el of allRow) {
          el.remove();
        }
        data.sort((x, y) => x.surname.localeCompare(y.surname));
        allRow = renderContacts(list, data, keys);
        localStorage.setItem('keys', JSON.stringify(data));
      }
    });
  };

  window.phoneBookInit = init;
}
