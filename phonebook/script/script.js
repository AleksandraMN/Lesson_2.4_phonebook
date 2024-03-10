'use strict';

{
  //  getStorage которая получает в виде аргумента ключ
  //  и по нему запрашивает данные из localStorage и
  //  возвращает их, если их нет то возвращает пустой массив
  const getStorage = (keys) => {
    const data = localStorage.getItem('keys') ?
      JSON.parse(localStorage.getItem('keys')) : [];
    return data;
  };

  /*
  const addContactData = contact => {
    data.push(contact);
    console.log('data', data);
  };
*/
  //  setStorage получает ключ и объект в виде аргументов
  // и дописывает данные в localStorage
  const setStorage = (keys, contact) => {
    const data = getStorage(keys);
    console.log(data);
    data.push(contact);
    localStorage.setItem('keys', JSON.stringify(data));
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');

    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');
    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.className = className;
      button.textContent = text;
      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Телефон</th>
      </tr>
    `);
    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" name="name" 
          id="name" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" name="surname" 
          id="surname" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" name="phone" 
          id="phone" type="number" required>
      </div>
    `);

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;

    return footer;
  };

  const createP = title => {
    const p = document.createElement('p');
    p.style.marginBottom = '0px';
    p.textContent = `Все права защищены ©${title}`;

    return p;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3 js-add',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const {form, overlay} = createForm();
    const footer = createFooter();
    const p = createP(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    footer.footerContainer.append(p);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
      table,
    };
  };

  const createRow = ({name: firstname, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstname;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;

    tdPhone.append(phoneLink);

    tr.append(tdDel, tdName, tdSurname, tdPhone);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);

    return allRow;
  };

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

  //  removeStorage получает в виде аргумента номер телефона,
  //   и удаляет контакт из localStorage
  const removeStorage = (value) => {
    const data = getStorage();

    for (let i = 0; i < data.length; i++) {
      if (data[i].phone === value) {
        console.log(data[i].phone);
        data.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('keys', JSON.stringify(data));
    console.log(data);
  };

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', e => {
      console.log(e.target);
      if (e.target.closest('.del-icon')) {
        console.log(e.target.closest('.contact').lastChild.textContent);
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
      console.log('newContact', newContact);
      addContactPage(newContact, list);
      setStorage(keys, newContact); // записывает контакт в localStorage
      form.reset();
      closeModal();
    });
  };

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
    console.log(data);
    hoverRow(allRow, logo);

    deleteControl(btnDel, list);
    formControl(form, list, closeModal, keys);

    //  сортировка по алфавиту (не доделан до конца)
    table.addEventListener('click', (e) => {
      const target = e.target;
      // console.log(allRow);
      if (target.textContent === 'Имя') {
        for (const el of allRow) {
          el.remove();
        }
        data.sort((x, y) => x.name.localeCompare(y.name));
        allRow = renderContacts(list, data, keys);
        // console.log(data);
      }
      if (target.textContent === 'Фамилия') {
        for (const el of allRow) {
          el.remove();
        }
        data.sort((x, y) => x.surname.localeCompare(y.surname));
        allRow = renderContacts(list, data, keys);
        // console.log(data);
      }
    });
  };

  window.phoneBookInit = init;
}
