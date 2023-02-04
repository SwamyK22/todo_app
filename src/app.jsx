import React, { Component } from 'react';
import './style.scss';
import './todo.scss';

// eslint-disable-next-line react/prefer-stateless-function
export default class app extends Component {
  render() {
    return (
      <div className="todo">
        <h1 className="todo__title">Todo App</h1>
        <form className="todo__form">
          <div>
            <label htmlFor="todoText" className="sr-only">Todo Text</label>
            <input type="text" id="todoText" className="rounded-l-md" />
          </div>
          <button type="submit" className="btn rounded-r-md">Add Todo</button>
        </form>
        <div className="todo__list">
          <div className="todo__list-item">
            <input type="checkbox" />
            <p className="px-5 flex-1">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            <button type="button" className="btn rounded-md">Delete</button>
          </div>
          <div className="todo__list-item">
            <input type="checkbox" />
            <p className="px-5 flex-1">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            <button type="button" className="btn rounded-md">Delete</button>
          </div>
        </div>
        <div className="todo__filter">
          <button type="button" className="btn flex-1">All</button>
          <button type="button" className="btn btn--active flex-1">Pending</button>
          <button type="button" className="btn flex-1">Completed</button>
        </div>
      </div>
    );
  }
}
