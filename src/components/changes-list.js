import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import connect from '../utils/refetch/api-connector';
import RequestResult from './request-result';
import mapBy from '../utils/map-by-property';

const actionName = {
  create: 'created',
  update: 'updated',
  destroy: 'deleted',
};

class ChangesList extends Component {

  renderAction = {
    create: (diff) => {
      const attrList = Object.keys(diff).map(key => (
        <li key={ key }>
          { key }
          { ': ' }
          <code>{ diff[key][1] }</code>
        </li>
      ));
      return <ul>{ attrList }</ul>;
    },
    update: (diff) => {
      const attrList = Object.keys(diff).map(key => (
        <li key={ key }>
        { key }
        { ': ' }
        <code>{ diff[key][0] }</code>
        { ' -> ' }
        <code>{ diff[key][1] }</code>
        </li>
      ));
      return <ul>{ attrList }</ul>;
    },
    delete: (diff) => null,
  }

  renderChange(change, user) {
    const { target_action, created_at, diff, target_type, target_key } = change;
    const { username } = user;
    return (
      <li key={ change.id }>
        { target_type }
        { ' ' }
        <code>{ target_key }</code>
        { ' ' }
        { actionName[target_action] }
        { ' by ' }
        <Link to={ '/users/' + user.id }>
          { username }
        </Link>
        { ' on ' }
        <time dateTime={ created_at }>
          { created_at }
        </time>
        { this.renderAction[target_action](diff, user) }
      </li>
    );
  }

  renderList([{ changes }, usersMap ]) {
    const items = changes.map(change =>
      this.renderChange(change, usersMap[change.user_id])
    );
    return <ul>{ items }</ul>;
  }

  render() {
    const { changesRequest, usersRequest } = this.props;
    return (
      <RequestResult requests={ [changesRequest, usersRequest] }>
        { this.renderList.bind(this) }
      </RequestResult>
    );
  }
}

ChangesList.defaultProps = {
  page: 0,
};

export default connect(({ type, id, page }) => ({
  changesRequest: {
    url: '/changes',
    query: {
      target_type: type,
      target_id: id,
      page: page,
    },
  },
  usersRequest: {
    url: `/users`,
    then: users => ({ value: mapBy('id', users) }),
  },
}))(ChangesList);
