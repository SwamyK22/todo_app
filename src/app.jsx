import React, { createRef, PureComponent } from 'react';
import './style.scss';
import './todo.scss';
import TodoFilter from './todoFilter';
import TodoForm from './todoForm';
import TodoList from './todoList';

export default class app extends PureComponent {
  state = {
    todoList: [],
    filterStatus: 'all',
  };

  todoTextRef = createRef();

  addTodo = (event) => {
    event.preventDefault();

    // O(logN)
    // const todoTextEle = document.getElementById('todoText');
    // O(1)

    // async code
    this.setState(({ todoList }) => ({
      todoList: [...todoList,
        { id: new Date().valueOf(), isDone: false, text: this.todoTextRef.current.value }],
    }), () => {
      this.todoTextRef.current.value = '';
    });
  };

  updateTodo = (item) => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex((x) => x.id === item.id);
      return {
        todoList: [
          ...todoList.slice(0, index),
          { ...item, isDone: !item.isDone },
          ...todoList.slice(index + 1),
        ],
      };
    });
  };

  deleteTodo = (item) => {
    const isConfirm = confirm('Are you sure to delete this item');

    if (isConfirm) {
      this.setState(({ todoList }) => {
        const index = todoList.findIndex((x) => x.id === item.id);
        return {
          todoList: [
            ...todoList.slice(0, index),
            ...todoList.slice(index + 1),
          ],
        };
      });
    } else {
      alert('Okay');
    }
  };

  filterTodo = (filterStatus) => {
    this.setState({ filterStatus });
  };

  render() {
    const { todoList, filterStatus } = this.state;
    console.log('render');
    return (
      <div className="todo">
        <h1 className="todo__title">Todo App</h1>
        <TodoForm addTodo={this.addTodo} ref={this.todoTextRef} />
        <div className="todo__list">
         {todoList.length > 0 && <TodoList
          todoList={todoList}
          filterStatus={filterStatus}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
        />}
        </div>
        <TodoFilter filterStatus={filterStatus} filterTodo={this.filterTodo} />
      </div>
    );
  }
}
