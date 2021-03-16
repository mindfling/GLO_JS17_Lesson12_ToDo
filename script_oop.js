'use strict';
/**
 * * Lesson 22
 * * ToDowka OOP
 */

//* в конструктор передаем строки классов
class Todo {
  constructor(form, input, todoList, todoCompleted, todoContainer) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoContainer = document.querySelector(todoContainer); //todo перенести в аргумент
    this.todoData = new Map(JSON.parse(localStorage.getItem('todolist-key'))); //* сразуже загружаем и создаем коллекцию массив двойных массивов
  }

  addToStorage() {
    localStorage.setItem('todolist-key', JSON.stringify([...this.todoData])); //добавить в localStorage преобразованую Map колекцию
  }

  render() {
    this.todoList.textContent = ''; //очистить невыполненных
    this.todoCompleted.textContent = ''; //очистить список выполненных
    // this.todoData.forEach(this.createItem, this); //* передаем контекст
    this.todoData.forEach((item) => this.createItem(item)); //* или использовать стрелочную функцию
    this.addToStorage();
  }

  createItem(item) {
    const li = document.createElement('li'); //создать элемент
    li.classList.add('todo-item');
    li.key = item.key; //**** добавить свойство ключ к каждому элементу todo-item
    li.insertAdjacentHTML('beforeend',`
            <span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
      `); //добавить элемент

    if (item.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(event) {
    event.preventDefault();
    if (this.input.value.trim()) {
      // проверка на пустое поле
      const newTodo = {
        value: this.input.value.trim(), // обрезать пробелы
        // completed: true, // ? если дело выполнено
        completed: false, // ? если дело невыполнено
        key: this.generateKey(), // сгенерировать псевдоуникальный ключ
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
      this.input.value = ''; //после всего очистить поле ввода
    } else {
      alert('Поле добавления дела не может быть пустым');
    }
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  deleteItem(todoItem) {
    todoItem.remove(); // удалить элемент из верстки
    this.todoData.delete(todoItem.key);
    this.addToStorage();
    // this.render();
  }

  completedItem(todoItem) {
    this.todoData.forEach((item) => {
      if (item.key === todoItem.key) {
        item.completed = !item.completed; // false -> true инвертируем
      }
    });
    this.addToStorage();
    this.render();
  }

  handler() {
    //* делегирование
    this.todoContainer.addEventListener('click', (event) => {
      const target = event.target;
      const todoItem = target.closest('.todo-item'); //высплываем ищем итем по которому кликнули

      if (target.matches('.todo-complete')) {
        this.completedItem(todoItem);
      } else if (target.matches('.todo-remove')) {
        this.deleteItem(todoItem);
      }
    });
  }

  init() {
    this.render();
    this.form.addEventListener('submit', this.addTodo.bind(this)); //слушатель на кнопку submit добавить
    this.handler(); //остальные слушатели делегируются в этой функии
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');
todo.init();
