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

 function filterRows(value) { //функция фильтрации массива клиентов с отрисовкой в таблице 
     let rows = document.querySelectorAll('#content-row')
     sorted_array = clients_array.filter((elem, index) => {
         if (`${elem.surname}${elem.name}${elem.patronymic}`.indexOf(value) != -1) {
             return true
         }
     })
     refill_table(sorted_array)
 }

 export { sortRows, filterRows }