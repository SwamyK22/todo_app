import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';

const TodoForm = forwardRef(({ addTodo }, ref) => {
  console.log('Todo Form render');
  return (
    <form className="todo__form" onSubmit={addTodo}>
      <div>
        <label htmlFor="todoText" className="sr-only">
          Todo Text

        </label>
        <input
          ref={ref}
          type="text"
          id="todoText"
          className="rounded-l-md"
        />
      </div>
      <button type="submit" className="btn rounded-r-md">Add Todo</button>
    </form>
  );
});

TodoForm.prototypes = {
  addTodo: PropTypes.func.isRequired,
};

export default memo(TodoForm);
