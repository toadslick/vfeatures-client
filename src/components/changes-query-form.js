import React, { Component } from 'react';

import query from '../utils/refetch/query-connector';

const typeOptions = [
  { key: 'Features', value: 'Feature' },
  { key: 'Releases', value: 'Release' },
  { key: 'Silos', value: 'Silo' },
  { key: 'Flags', value: 'Flag' },
];

const actionOptions = [
  { key: 'Create', value: 'create' },
  { key: 'Update', value: 'update' },
  { key: 'Delete', value: 'destroy' },
];

class ChangesQueryForm extends Component {
  constructor(props) {
    super(props);
    const { queryParams: { type, id, action, user }} = this.props;
    this.state = {
      targetType: type,
      targetID: id,
      targetAction: action,
      userID: user,
    };
  }

  inputChanged(key, e) {
    e.preventDefault();
    const { target: { value }} = e;
    this.setState({ [key]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('SUBMIT', this.state);
  }

  renderOptions(options, prompt) {
    const elements = options.map(({ key, value }) => (
      <option key={ value } value={ value }>{ key }</option>
    ));
    elements.unshift(<option key=''>{ prompt }</option>);
    return elements;
  }

  render() {
    const { targetType, targetAction } = this.state;
    return (
      <form onSubmit={ this.onSubmit.bind(this) }>
        <fieldset>

          <label>
            <span>Type:</span>
            <select
              value={ targetType }
              onChange={ this.inputChanged.bind(this, 'targetType') }
            >
              { this.renderOptions(typeOptions, 'Choose a type of record...') }
            </select>
          </label>

          <label>
            <span>Action:</span>
            <select
              value={ targetAction }
              onChange={ this.inputChanged.bind(this, 'targetAction') }
            >
              { this.renderOptions(actionOptions, 'Choose a type of action...') }
            </select>
          </label>

          <button>Filter History</button>
        </fieldset>
      </form>
    );
  }
}

export default query(ChangesQueryForm);
