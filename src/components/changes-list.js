import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import connect from '../utils/refetch/api-connector';
import RequestResult from './request-result';
import mapBy from '../utils/map-by-property';

class ChangesList extends Component {

  renderAction = {
    create: (change) => (
      <Fragment>
        Created <br/>
        { JSON.stringify(change.diff) }
      </Fragment>
    ),
    update: (change) => (
      <Fragment>
        Updated <br/>
        { JSON.stringify(change.diff) }
      </Fragment>
    ),
    delete: (change) => (
      'Deleted'
    ),
  }

  renderChange(change, user) {
    const { target_action, created_at } = change;
    const { username } = user;
    return (
      <li key={ change.id }>
        <span>
          { this.renderAction[target_action](change, user) }
        </span> by <Link to={ '/users/' + user.id }>
          { username }
        </Link> on <time dateTime={ created_at }>
          { created_at }
        </time>
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
