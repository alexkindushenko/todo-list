import React from 'react';
import './item-add-form.css';

class ItemAddForm extends React.Component {
  state = {
    label: '',
  };
  onLabelChange = e => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({ label: '' });
  };
  render() {
    return (
      <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
        <input
          className="form-control"
          type="text"
          onChange={this.onLabelChange}
          placeholder="What next?"
          value={this.state.label}
        ></input>
        <button type="submit" className="btn btn-outline-secondary">
          Add Item
        </button>
      </form>
    );
  }
}

export default ItemAddForm;
