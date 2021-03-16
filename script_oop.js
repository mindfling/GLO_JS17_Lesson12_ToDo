'use strict';
/**
 * * Lesson 22
 * * ToDowka OOP
 */

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todolist-key'))); //* сразуже загружаем и создаем коллекцию массив двойных массивов
    }

    addToStorage() {
        localStorage.setItem('todolist-key', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this); //* передаем контекст
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        console.log(e);
        console.log(this);

        e.preventDefault();
        if (this.input.value.trim()) { //empty?
            const newTodo = {
                value: this.input.value,
                completed: true,
                // completed: false,
                key: this.generateKey()
            };
            console.log(newTodo.key);
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        }
    }


    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }


    deleteItem() {
        //todo найти на который нажали удалить из памяти и удалить из Map
    }

    completedItem() {
        //todo найти элем перебрать fe найти тот на который нажали
    }

    handler() {
        //todo делегирование 
        // опредилить на какую кнопку какого элемента нажали
        // и вызвать
        // todo this.deleteItem();
        // todo this.completedItem();
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
    }
}


const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();