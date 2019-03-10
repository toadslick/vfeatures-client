import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { stringify } from 'query-string';

import withQuery from '../utils/query-connector';

const typeOptions = {
  'Feature': 'Feature',
  'Release': 'Release',
  'Silo': 'Silo',
  'Flag': 'Flag',
};

const actionOptions = {
  'Create': 'create',
  'Update': 'update',
  'Delete': 'destroy',
};

class ChangesQueryForm extends PureComponent {
  constructor(props) {
    super(props);
    const { queryParams: { type, action, user }} = this.props;
    this.state = {
      targetType: type,
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
    const { history } = this.props;
    const { targetType, targetAction, userID } = this.state;
    const query = {
      type: targetType,
      action: targetAction,
      user: userID,
    };
    history.push({ pathname: '/history', search: stringify(query) });
  }

  renderOptions(options, prompt) {
    const elements = Object.keys(options).map(key => (
      <option key={ key } value={ options[key] }>{ key }</option>
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

          <p>
            <Link to='/history'>Clear Filter</Link>
          </p>
        </fieldset>
      </form>
    );
  }
}

export default withQuery(withRouter(ChangesQueryForm));
