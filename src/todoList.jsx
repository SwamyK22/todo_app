import React from 'react';
import PropTypes from 'prop-types';
import TodoListItem from './todoListItem';

function TodoList({
  todoList, filterStatus, updateTodo, deleteTodo, updateTodoState, deleteTodoState,
}) {
  return (
    <>
      {todoList.map((x) => {
          return (
            <TodoListItem item={x} updateTodo={updateTodo} deleteTodo={deleteTodo} key={x.id} updateTodoState={updateTodoState.find((y)=> y.loadingId === x.id )} deleteTodoState={deleteTodoState.find((y)=> y.loadingId === x.id)} />
          );
      })}
      </>
  );
}

TodoList.prototypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isDone: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateTodoState: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['UPDATE_TODO']).isRequired,
      status: PropTypes.oneOf(['REQUEST', 'ERROR']).isRequired
    })
  ).isRequired,
  deleteTodoState: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['DELETE_TODO']).isRequired,
      status: PropTypes.oneOf(['REQUEST', 'ERROR']).isRequired
    })
  ).isRequired
};
export default TodoList;
