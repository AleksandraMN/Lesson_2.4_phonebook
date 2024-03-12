'use strict';

const {
  createRow,
} = require('./createElements');


const {
  setStorage,
  removeStorage,
} = require('./serviceStorage');


const hoverRow = (allRow, logo) => {
  const text = logo.textContent;

  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay ||
      target.classList.contains('close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};


const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    if (e.target.closest('.del-icon')) {
      const value = e.target.closest('.contact').lastChild.textContent;
      e.target.closest('.contact').remove();
      removeStorage(value); // удаляет контакт из localStorage
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

const formControl = (form, list, closeModal, keys) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newContact = Object.fromEntries(formData);
    addContactPage(newContact, list);
    setStorage(keys, newContact); // записывает контакт в localStorage
    form.reset();
    closeModal();
  });
};

module.exports = {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
};

