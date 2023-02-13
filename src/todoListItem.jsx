import clsx from 'clsx';
import React, {memo} from 'react';
import PropTypes from 'prop-types';

function TodoListItem({item, updateTodo, deleteTodo}) {
    console.log('TodoList Item');
  return (
    <div className="todo__list-item" key={item.id}>
              <input type="checkbox" checked={item.isDone} onChange={() => updateTodo(item)} />
              <p className={clsx('px-5 flex-1', {
                'line-through': item.isDone,
              })}
              >
                {item.text}

              </p>
              <button type="button" className="btn rounded-md" onClick={() => deleteTodo(item)}>Delete</button>
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
}

export default memo(TodoListItem);
