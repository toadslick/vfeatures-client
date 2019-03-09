import React, { Component } from 'react';

import ChangeItem from './change-item';
import connect from '../utils/refetch/api-connector';
import RequestResult from './request-result';
import mapBy from '../utils/map-by-property';

class ChangesList extends Component {

  renderList([{ changes }, usersMap ]) {
    const items = changes.map(change => (
      <li>
        <ChangeItem
          change={ change }
          user={ usersMap[change.user_id] }
        />
      </li>
    ));
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
