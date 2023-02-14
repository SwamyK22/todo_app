import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';

const TodoForm = forwardRef(({ addTodo, addTodoState }, ref) => {
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
      <button type="submit" disabled={addTodoState?.status === 'REQUEST'} className="btn rounded-r-md disabled:bg-slate-500 disabled:cursor-wait">Add Todo</button>
    </form>
  );
});

TodoForm.prototypes = {
  addTodo: PropTypes.func.isRequired,
  addTodoState: PropTypes.shape({
    type: PropTypes.oneOf(['ADD_TODO']).isRequired,
    status: PropTypes.oneOf(['REQUEST', 'ERROR']).isRequired
  }),
};

TodoForm.defaultProps = {
  addTodoState: undefined,
}
export default memo(TodoForm);
