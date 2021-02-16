'use strict';
/* 
 * 'lesson12'
 */

console.log('hello todo list');


const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');


const myKey = 'todokey';

let todoData = [];

// todoData.push({value: 'We buy an elephant', completed: false});
    
//загружаем список дел из localStorage
function saveDataToStorage() {
    localStorage.setItem(myKey, JSON.stringify(todoData));
};

function loadDataFromStorage() {
    todoData = JSON.parse(localStorage.getItem(myKey));
    //заглушка на случай если нет данных в localStorage
    if ( !todoData ) {
        console.log('при загрузке todoData null: ', todoData);
        todoData = [];//заглушим пустым массивом
    }
};

    
//пробуем отрендерить
const render = function() {
    //сразу же обнуляем списки листов
    todoList.textContent = '';
    todoCompleted.textContent = '';

    console.log('arrray', todoData);

    //перебор всех элементов загруженного массива для отрисовки
    todoData.forEach( (item) => {
        console.log('item: ', item);

        //генерим элементы как в тудушке
        let liTodoItem = document.createElement('li');
        liTodoItem.classList.add('todo-item');
        let spanTextTodo = document.createElement('span');
        spanTextTodo.classList.add('text-todo');
        spanTextTodo.textContent = item.value;
        // spanTextTodo.textContent = 'сварить какого нибудь кофею';
    
        let todoButtons = document.createElement('div');
        todoButtons.classList.add('todo-buttons');
        
        let buttonTodoRemove = document.createElement('button');
        let buttonTodoComplete = document.createElement('button');
        buttonTodoRemove.classList.add('todo-remove');
        buttonTodoComplete.classList.add('todo-complete');
        
        todoButtons.append(buttonTodoRemove, buttonTodoComplete);
        liTodoItem.append(spanTextTodo, todoButtons);

        //сделаем селектор сделано или не сделано
        if (item.completed) {
            //true - нижний список выполненных дел
            todoCompleted.append(liTodoItem);
        } else {
            //false - верхний список еще невыполненных дел
            todoList.append(liTodoItem);
        }

        //на каждой ветке цикла достаем нашу кнопку
        const btnTodoRemove = liTodoItem.querySelector('.todo-remove');
        const btnTodoComplete = liTodoItem.querySelector('.todo-complete');
        
        
        btnTodoRemove.addEventListener('click', (event) => {
            console.log('нажал на корзину');
            item.value = ''; //отмечаем элемент пустым

            /** TODO здесь добавляем функцию удаления пустого элемента */
            // так как по сути удаление элемента массива происходит только здесь, пишем этот код здесь
            let index = todoData.findIndex( item => item.value.trim() === '' );

            if ( index >= 0) {
                console.log('пустой элемент найден - удаляем');
                // deletit = todoData.splice(index, 1);
                todoData.splice(index, 1);

            } else {
                console.log('нет пустых элементов удалять нечего');
            }

            saveDataToStorage();
            render();
        });
        
        btnTodoComplete.addEventListener('click', (event) => {
            console.log('нажал на добавить или убрать');
            item.completed = !item.completed; //инвертируем булевое значение по клику
            saveDataToStorage();
            render();
        });

    });//forEach
};//render

// console.log(todoData);

loadDataFromStorage();
render();   



//добавляем слушатель события submit
//submit реагирует на клик и на клавишу Enter
todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    //проверка на пустой ввод поля
    if (headerInput.value.trim() === '') {
        //пустое поле или пробелы
        ((str) => {
            console.log(str);
            alert(str);
        })('Поле не может быть пустым!');

    } else {
        //новый обект
        let newTodo = {
            value: headerInput.value, //значение в поле input
            completed: false  //false значит событие еще невыполнено
        };
        todoData.push(newTodo);
        // todoData.push({value, completed}); //новый формат es6
    }

    todoControl.reset(); //обнуляем поля формы

    saveDataToStorage();
    render(); //в конце события запускаем рендер списка
    // localStorage.setItem('123', JSON.stringify(todoData));
});

