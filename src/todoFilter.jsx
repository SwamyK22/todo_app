import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { memo } from 'react';

function TodoFilter({ filterStatus, filterTodo }) {
  console.log('TodoFilter render');
  return (
    <div className="todo__filter">
      <button
        type="button"
        className={clsx('btn flex-1', {
          'btn--active': filterStatus === 'all',
        })}
        onClick={() => filterTodo('all')}
      >
        All

      </button>
      <button
        type="button"
        className={clsx('btn flex-1', {
          'btn--active': filterStatus === 'pending',
        })}
        onClick={() => filterTodo('pending')}
      >
        Pending

      </button>
      <button
        type="button"
        className={clsx('btn flex-1', {
          'btn--active': filterStatus === 'completed',
        })}
        onClick={() => filterTodo('completed')}
      >
        Completed

      </button>
    </div>
  );
}

TodoFilter.prototypes = {
  filterStatus: PropTypes.oneOf(['all', 'pending', 'competed']).isRequired,
  filterTodo: PropTypes.func.isRequired,
};

export default memo(TodoFilter);
