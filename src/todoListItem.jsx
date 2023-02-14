import clsx from 'clsx';
import React, {memo} from 'react';
import PropTypes from 'prop-types';

function TodoListItem({item, updateTodo, deleteTodo, updateTodoState, deleteTodoState,}) {
  return (
    <div className="todo__list-item" key={item.id}>
              <input type="checkbox" className="disabled:text-slate-400 disabled:cursor-wait" checked={item.isDone} disabled={updateTodoState?.status === 'REQUEST'} onChange={() => updateTodo(item)} />
              <p className={clsx('px-5 flex-1', {
                'line-through': item.isDone,
              })}
              >
                {item.text}

              </p>
              <button type="button" disabled={deleteTodoState?.status === 'REQUEST'} className="btn rounded-md disabled:bg-slate-500 disabled:cursor-wait" onClick={() => deleteTodo(item)}>Delete</button>
            </div>
  )
}

TodoListItem.prototypes = {
    item: PropTypes.exact({
          id: PropTypes.number.isRequired,
          text: PropTypes.string.isRequired,
          isDone: PropTypes.bool.isRequired,
        }).isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    updateTodoState: PropTypes.shape({
      type: PropTypes.oneOf(['UPDATE_TODO']).isRequired,
      status: PropTypes.oneOf(['REQUEST', 'ERROR']).isRequired
    }), 
    deleteTodoState: PropTypes.shape({
      type: PropTypes.oneOf(['DELETE_TODO']).isRequired,
      status: PropTypes.oneOf(['REQUEST', 'ERROR']).isRequired
    }),
}
TodoListItem.defaultProps = {
  updateTodoState: undefined,
  deleteTodoState: undefined
}

export default memo(TodoListItem);
