import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

class App extends React.Component {
  genId() {
    return Math.floor(Math.random() * Math.floor(1000));
  }
  state = {
    todoData: [
      this.createItem('Drink Coffee'),
      this.createItem('Make Awesome App'),
      this.createItem('Have a lunch'),
    ],
    term: '',
    filter: 'all',
  };

  createItem(text) {
    return {
      label: text,
      done: false,
      important: false,
      id: this.genId(),
    };
  }

  onDeleted = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter(el => el.id !== id),
      };
    });
  };

  onItemAdded = text => {
    const newItem = this.createItem(text);
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem],
      };
    });
  };

  onImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map(el => (el.id === id ? { ...el, important: !el.important } : el)),
      };
    });
  };

  onDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map(el => (el.id === id ? { ...el, done: !el.done } : el)),
      };
    });
  };

  searchSP = (items, term) => {
    if (!term) {
      return items;
    }
    return items.filter(el => el.label.toLowerCase().includes(term.toLowerCase()));
  };

  onSearchChange = term => {
    this.setState({ term });
  };

  filterISF = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(el => !el.done);
      case 'done':
        return items.filter(el => el.done);
      default:
        return items;
    }
  };

  onFilterChange = filter => {
    this.setState({ filter });
  };

  render() {
    const { todoData, term, filter } = this.state;
    const doneCount = todoData.filter(el => el.done).length;
    const toDoCount = todoData.length - doneCount;

    const visibleItems = this.filterISF(this.searchSP(todoData, term), filter);
    return (
      <div className="todo-app">
        <AppHeader toDo={toDoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.onDeleted}
          onDone={this.onDone}
          onImportant={this.onImportant}
        />
        <ItemAddForm onItemAdded={this.onItemAdded} />
      </div>
    );
  }
}

export default App;
