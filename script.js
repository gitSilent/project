(function() {
'use strict'

    let clients_array = [];
    let sorted_array = [];
    let sort_status = "none";

    let input_browser = document.querySelector('.input-browser');

    let table_students = document.querySelector('.table-students');

    //блок инициализации стрелок возле тайтлов таблицы
    let id_arrow = document.querySelector('.id_arrow');
    let fio_arrow = document.querySelector('.fio_arrow');
    let create_date_arrow = document.querySelector('.create_date_arrow');
    let change_date_arrow = document.querySelector('.change_date_arrow');
    //конец блока инициализации стрелок возле тайтлов таблицы

    //блок модального окна добавления клиента
    let btn_main_add_client = document.querySelector('.main-btn-add-client'); //кнопка добавления клиента
    let modal_add_client = document.querySelector('.modal-input'); //модальное окно добавления клиента
    let cross_modal_add_client = document.querySelector('.modal-input-group img'); //крестик для закрытия модального окна
    let input_contact_data = document.querySelector('.input-contact-data');
    let input_surname = document.querySelector('.input-surname');
    let input_name = document.querySelector('.input-name');
    let input_patronymic = document.querySelector('.input-patronymic');
    let save_contact = document.querySelector('.save-contact');
    let cancel_contact = document.querySelector('.cancel-contact');
    //конец блока модального окна добавления клиента

    let alert_main_input = document.querySelector('.alert-main-input');
    let alert_edit_input = document.querySelector('.alert-edit-input');

    //блок модального окна редактирования клиента
    let edit_input_surname = document.querySelector('.edit-input-surname');
    let edit_input_name = document.querySelector('.edit-input-name');
    let edit_input_patronymic = document.querySelector('.edit-input-patronymic');
    let edit_save_contact = document.querySelector('.edit-save-contact');
    let edit_delete_contact = document.querySelector('.edit-delete-contact');
    let edit_container_choose_contacts = document.querySelector('.edit-container-choose-contacts');
    let edit_modal_id = document.querySelector('.edit-modal-id');
    let btn_edit_add_contact = document.querySelector('.modal-edit .add-contact');
    let modal_edit = document.querySelector('.modal-edit');
    let cross_modal_edit_client = document.querySelector('.edit-modal-input-group img');
    //конец блока модального окна редактирования клиента

    let add_contact = document.querySelector('.add-contact');
    let container_choose_contacts = document.querySelector('.container-choose-contacts');

    //блок тайтлов таблицы
    let header_th_id = document.querySelector('.header_th_id');
    let header_th_fullname = document.querySelector('.header_th_fullname');
    let header_th_create_date = document.querySelector('.header_th_create_date');
    let header_th_last_change = document.querySelector('.header_th_last_change');
    //конец блока тайтлов таблицы

    

    input_browser.addEventListener('input', () => {
        filterRows(input_browser.value);
    })

    header_th_id.addEventListener('click', () => { //сортировка по id
        sortRows(`a["id"]`, `b["id"]`, id_arrow);
    })
    header_th_fullname.addEventListener('click', () => { //сортировака по ФИО
        sortRows(`a["surname"]+a["name"]+a["lastname"]`, `b["surname"]+b["name"]+b["lastname"]`, fio_arrow);
    })
    header_th_create_date.addEventListener('click', () => { //сортировка по дате создания
        sortRows(`Date.parse(a["create_date"])`, `Date.parse(b["create_date"])`, create_date_arrow);
    })
    header_th_last_change.addEventListener('click', () => { //сортировка по дате изменения
        sortRows(`Date.parse(a["change_date"])`, `Date.parse(b["change_date"])`, change_date_arrow);
    })

    btn_main_add_client.addEventListener('click', () => { //открытие модального окна добавления клиента
        modal_add_client.style.display = 'flex'
    })
    cross_modal_add_client.addEventListener('click', () => { //событие на закрытие модального окна добавления клиента на крестик
        modal_add_client.style.display = 'none'
    })
    cancel_contact.addEventListener('click',()=>{//событие на закрытие модального окна добавления клиента на кнопку Отмена
        modal_add_client.style.display = 'none'
    })
    cross_modal_edit_client.addEventListener('click', () => { //событие на закрытие модального окна изменения клиента
        modal_edit.style.display = 'none'
    })
    input_surname.addEventListener('focus',()=>{
        alert_main_input.style.display = 'none'
    })
    input_name.addEventListener('focus',()=>{
        alert_main_input.style.display = 'none'
    })
    edit_input_surname.addEventListener('focus',()=>{
        alert_edit_input.style.display = 'none'
    })
    edit_input_name.addEventListener('focus',()=>{
        alert_edit_input.style.display = 'none'
    })

    add_contact.addEventListener('click', () => { //событие на кнопку добавления контакта клиента
        event.preventDefault();
        if(container_choose_contacts.querySelectorAll('.choose-contact-row').length >= 10){
            alert('Вы не можете добавить более 10 контактов');
            return;
        }

        if (event.target.closest('form').className = 'modal modal-input') {
            let choose_contact_row = document.createElement('div'); //создания блока контакта(элементы: select,input,удаление)
            choose_contact_row.className = 'choose-contact-row';
            choose_contact_row.innerHTML = `
                    <select name="choose-contact-select" id="select-contact">
                        <option value="phone">Доп.телефон</option>
                        <option value="mail">Email</option>
                        <option value="vk">Vk</option>
                        <option value="facebook">Facebook</option>
                        <option value="other">Другое</option>
                    </select>
                    <input type="text" class="input-contact-data" placeholder="Введите данные контакта">
                    <button class="delete-input-contact-data" onclick="delete_contact_row()" ><img src="./img/cross.svg" alt=""></button> 
                `
                //вешаем событие onclick на кнопку удаления блока контакта (строка сверху)
            container_choose_contacts.append(choose_contact_row) //append блока контакта в контейнер с контактами

            let delete_input_contact_data = choose_contact_row.querySelector('.delete-input-contact-data'); //инициализация кнопки удаления блока контакта
            delete_input_contact_data.addEventListener('click', () => { //событие кнопки удаления блока контакта
                event.preventDefault();
                event.target.closest('div').remove();
            })

        
        }
})


    save_contact.addEventListener('click', add_client_to_array); //событие на кнопку добавления нового клиента в модальном окне 

    btn_edit_add_contact.addEventListener('click', () => { //событие на кнопку добавления контактов у клиента в модальном окне изменения данных 
        event.preventDefault();
        let choose_contact_row = document.createElement('div');
        choose_contact_row.className = 'choose-contact-row';
        choose_contact_row.innerHTML = `
                    <select name="choose-contact-select" id="select-contact">
                        <option value="phone">Доп.телефон</option>
                        <option value="mail">Email</option>
                        <option value="vk">Vk</option>
                        <option value="facebook">Facebook</option>
                        <option value="other">Другое</option>
                    </select>
                    <input type="text" class="input-contact-data" placeholder="Введите данные контакта">
                    <button class="delete-input-contact-data" onclick="delete_contact_row(this)"><img src="./img/cross.svg" alt=""></button>
                `

        edit_container_choose_contacts.append(choose_contact_row)

    })

    if (JSON.parse(localStorage.getItem('clients_array')) != null) { //пулл из localstorage массива клиентов (если не пусто) и заполнение таблицы
        clients_array = JSON.parse(localStorage.getItem('clients_array'));
        sorted_array = Array.from(clients_array);
        refill_table(clients_array);
    }


    function add_client_to_array() { //функция добавления клиента в массив
        event.preventDefault();
        if(input_surname.value == ""|| input_name.value == ""){
            alert_main_input.style.display = 'block'
            return;
        }
        
        let now = new Date();

        let arr_rows = []; //массив, хранящий данные заполненных контактов клиента
        for (let item of container_choose_contacts.querySelectorAll('.choose-contact-row')) { //заполнение arr_rows
            arr_rows.push({
                select: item.querySelector('select').value,
                input: item.querySelector('input').value
            });
        }
        clients_array.push({ //push клиента в массив clients_array
            id: clients_array.length,
            surname: input_surname.value,
            name: input_name.value,
            patronymic: input_patronymic.value,
            create_date: `${now.getDay()<10?'0'+now.getDay():now.getDay()}.${now.getMonth()<10?'0'+now.getMonth():now.getMonth()}.${now.getFullYear()} ${now.getHours()<10?'0'+now.getHours():now.getHours()}:${now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes()}`,
            change_date: `${now.getDay()<10?'0'+now.getDay():now.getDay()}.${now.getMonth()<10?'0'+now.getMonth():now.getMonth()}.${now.getFullYear()} ${now.getHours()<10?'0'+now.getHours():now.getHours()}:${now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes()}`,
            contacts: arr_rows,
            html_contacts: container_choose_contacts.innerHTML
        })

        //обнуление инпутов и html разметки модалного окна
        input_surname.value = "";
        input_name.value = "";
        input_patronymic.value = "";
        container_choose_contacts.innerHTML = "";
        //скрытие модального окна добавления клиента
        modal_add_client.style.display = 'none'



        sorted_array = Array.from(clients_array); //заполнение массива sorted_array (sorted_array нужен для сортировки и фильтрации данных клиентов без изменения основного массива clients_array)
        refill_table(clients_array); //перезаполнение таблицы данными из основного массива клиентов


    }

    function create_table_row(id, surname, name, patronymic, create_date, change_date, contacts, html_contacts) { //функция создания записи таблицы
        let content_th_contacts = document.createElement('th'); //создание ячейки для изображений контактов
        content_th_contacts.className = 'content-row content_th_contacts';

        for (let item of contacts) { //цикл для заполнения ячейки контактов нужными изображениями
            let img = document.createElement('img');
            img.setAttribute('src', `./img/${item.select}.svg`);
            img.setAttribute('title', `${item.input}`);
            img.className = "contact_icon";
            content_th_contacts.append(img);

            console.log(content_th_contacts.querySelectorAll('.contact_icon').length )
            console.log(content_th_contacts.querySelectorAll('.contact_icon').length >=4 && !content_th_contacts.querySelector('.contact_icon_num'))
            if(content_th_contacts.querySelectorAll('.contact_icon').length >4 && !content_th_contacts.querySelector('.contact_icon_num')){
                console.log(content_th_contacts.querySelector('.contact_icon_num'))
                content_th_contacts.append(img);
                img.style.display = "none";

                let img_num = document.createElement('div');
                img_num.className = "contact_icon_num";
                img_num.style.display = "block"

                content_th_contacts.append(img_num);
                img_num.textContent = `+${Number(content_th_contacts.querySelectorAll('.contact_icon').length)-4}`;
                img_num.addEventListener('click',()=>{
                    for (let contact_icon of content_th_contacts.querySelectorAll('.contact_icon')){
                        contact_icon.style.display = '';
                        content_th_contacts.querySelector('.contact_icon_num').style.display = 'none'
                    }
                })


            } else if (content_th_contacts.querySelector('.contact_icon_num')){
                console.log(content_th_contacts.querySelector('.contact_icon_num'))
                content_th_contacts.append(img);
                img.style.display = "none";

                content_th_contacts.querySelector('.contact_icon_num').textContent=`+${Number(content_th_contacts.querySelector('.contact_icon_num').textContent)+1}`;
            }
            
            
        }


        let tr = document.createElement('tr'); //создание контейнера tr для таблицы
        tr.setAttribute('id', 'content-row');
        tr.innerHTML = `<th class="content-row content_th_id">${id}</th>
            <th class="content-row content_th_fullname">${surname} ${name} ${patronymic}</th>
            <th class="content-row content_th_create_date">${create_date}</th>
            <th class="content-row content_th_last_change">${change_date}</th>
            <th class="content-row content_th_edit" colspan="2" onclick="edit_row(this)"> <img src="./img/pencil.svg" alt="" class="pencil" > Изменить</th>
            <th class="content-row content_th_delete" onclick="confirm_delete(this)"><img src="./img/mini-cross.svg" alt=""> Удалить</th>`
        tr.querySelector('.content_th_last_change').after(content_th_contacts)

        table_students.append(tr);

    }

    function edit_row(e) { //функция, запускаемая при нажатии кнопки "Изменить" у клиента

        edit_delete_contact.addEventListener('click', function x() { //событие кнопки "Удалить клиента" в окне редактирования данных
            event.preventDefault();

            confirm_delete(e);
            edit_delete_contact.removeEventListener('click', x)
        })

        let id = e.closest('tr').querySelector('.content_th_id').textContent; //считывание id выбранного клиента

        edit_container_choose_contacts.innerHTML = clients_array[id].html_contacts; //заполнения контейнера контактов сохраненной html разметкой 

        edit_modal_id.innerHTML = `ID: ${id}`; //заполнение поля id в модальном окне редактирования

        let rows = edit_container_choose_contacts.querySelectorAll('.choose-contact-row');

        clients_array[id].contacts.forEach((row, index) => { //заполнения инпутов и селектов контакта выбранными при создании клиента значениями
            rows[index].querySelector('select').value = row.select;
            rows[index].querySelector('input').value = row.input;
        })

        //отображение модлального окна и заполнение инпутов ФИО 
        modal_edit.style.display = "flex";
        edit_input_surname.value = clients_array[id].surname
        edit_input_name.value = clients_array[id].name;
        edit_input_patronymic.value = clients_array[id].patronymic;

        edit_save_contact.addEventListener('click', function x() { //событие кнопки сохранить в окне редактирования клиента

            if(edit_input_surname.value == ""|| edit_input_name.value == ""){
                alert_edit_input.style.display = 'block'
                return;
            }

            let arr_rows = [];
            for (let item of edit_container_choose_contacts.querySelectorAll('.choose-contact-row')) { //заполнения массива с контактными данными 
                arr_rows.push({
                    select: item.querySelector('select').value,
                    input: item.querySelector('input').value
                });
            }
            event.preventDefault();
            //замена данных клиента из массива данными из инпутов 
            clients_array[id].surname = edit_input_surname.value;
            clients_array[id].name = edit_input_name.value;
            clients_array[id].patronymic = edit_input_patronymic.value;
            clients_array[id].contacts = arr_rows;
            clients_array[id].html_contacts = edit_container_choose_contacts.innerHTML;
            modal_edit.style.display = 'none'
                //обновление таблицы
            refill_table(clients_array);
            sorted_array = Array.from(clients_array);
            edit_save_contact.removeEventListener('click', x);

        })

        sorted_array = Array.from(clients_array);

    }

    function refill_table(array) { //функция перезаполнения таблицы данными из передаваемого параметром массива
        for (let row of document.querySelectorAll('#content-row')) { //удаление всех строк
            row.remove();
        }
        for (let client of array) { //отрисовка строк с данными переданного массива
            create_table_row(client.id, client.surname, client.name, client.patronymic, client.create_date, client.change_date, client.contacts, client.html_contacts);
        }
        localStorage.setItem('clients_array', JSON.stringify(clients_array)); //отправка данных в localstorage

    }

    function confirm_delete(e) { //функция открытия модального окна подтверждения удаления клиента
        let modal_confirm_delete = document.querySelector('.modal-confirm-delete');
        let btn_confirm_delete = document.querySelector('.btn-confirm-delete');
        let btn_confirm_cancel = document.querySelector('.btn-confirm-cancel');

        modal_confirm_delete.style.display = 'flex';
        btn_confirm_delete.addEventListener('click', function x() { //событие кнопки "Удалить"
            delete_row(e)
            modal_confirm_delete.style.display = 'none';
            btn_confirm_delete.removeEventListener('click', x)

        })
        btn_confirm_cancel.addEventListener('click', function x() { //событие кнопки "Отмена"
            modal_confirm_delete.style.display = 'none';
            btn_confirm_delete.removeEventListener('click', x)

        })
    }

    function delete_contact_row() { //функция удаления блока контакта
        event.target.closest('div').addEventListener('click', () => {
            event.preventDefault();
            event.target.closest('div').remove();
        })
    }

    function delete_row(e) { //функция удаления одной записи таблицы
        modal_edit.style.display = "none";
        let id = e.closest('tr').querySelector('.content_th_id').textContent;
        clients_array.splice(id, 1);

        clients_array.forEach((item, index) => {
            clients_array[index].id = index;
        })
        e.closest('tr').remove();
        refill_table(clients_array);

    }

    function sortRows(first, second, element) { //фунция сортировки записей (возрастание, убывание, дефолтное значение)
        if (sort_status == 'none') {
            element.setAttribute('src', './img/arrow_up.svg')

            sorted_array.sort((a, b) => {
                if (eval(first) > eval(second)) {
                    return 1;
                }
                if (eval(first) < eval(second)) {
                    return -1;
                }
            });

            refill_table(sorted_array);
            sort_status = 'increase';
        } else if (sort_status == 'increase') {
            element.setAttribute('src', './img/arrow_down.svg')
            sorted_array.sort((a, b) => {
                if (eval(first) < eval(second)) {
                    return 1;
                }
                if (eval(first) > eval(second)) {
                    return -1;
                }
            });
            refill_table(sorted_array);
            sort_status = 'descending';
        } else {
            element.setAttribute('src', './img/arrow_up.svg')
            refill_table(clients_array);
            sort_status = 'none'
        }

    }

    function filterRows(value) {//функция фильтрации массива клиентов с отрисовкой в таблице 
        let rows = document.querySelectorAll('#content-row')
        sorted_array = clients_array.filter((elem, index) => {
            if (`${elem.surname}${elem.name}${elem.patronymic}`.indexOf(value) != -1) {
                return true
            }
        })
        refill_table(sorted_array)
    }


    window.edit_row = edit_row;
    window.delete_row = delete_row;
    window.delete_contact_row = delete_contact_row;
    window.confirm_delete = confirm_delete
})()