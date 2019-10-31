import React from 'react';

import './todo-list-item.css';

class TodoListItem extends React.Component {
  render() {
    const { label, onDeleted, onDone, onImportant, done, important } = this.props;
    let classNames = 'todo-list-item';

    if (done) classNames += ' done';
    if (important) classNames += ' important';

    return (
      <span className={classNames}>
        <span className="todo-list-item-label" onClick={onDone}>
          {label}
        </span>
        <button
          onClick={onImportant}
          type="button"
          className="btn btn-outline-success btn-sm float-right"
        >
          <i className="fa fa-exclamation" />
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}
        >
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}

export default TodoListItem;
