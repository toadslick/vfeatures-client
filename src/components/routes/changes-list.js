import React, { Component, Fragment } from 'react';

import ChangeItem from '../change-item';
import ChangesQueryForm from '../changes-query-form';
import connect from '../../utils/refetch/api-connector';
import withQuery from '../../utils/query-connector';
import RequestResult from '../request-result';
import mapBy from '../../utils/map-by-property';

class ChangesList extends Component {

  renderList([{ changes, pagination }, usersMap, releasesMap ]) {
    const items = changes.map(change => (
      <ChangeItem
        key={ change.id }
        change={ change }
        user={ usersMap[change.user_id] }
        releasesMap={ releasesMap }
      />
    ));

    return <ul>{ items }</ul>;
  }

  render() {
    const { changesRequest, usersRequest, releasesRequest } = this.props;
    return (
      <Fragment>
        <h1>History</h1>
        <ChangesQueryForm/>
        <RequestResult requests={ [changesRequest, usersRequest, releasesRequest] }>
          { this.renderList.bind(this) }
        </RequestResult>
      </Fragment>
    );
  }
}

export default withQuery(connect(({ queryParams: { type, id, page, action, user }}) => ({
  changesRequest: {
    url: '/changes',
    query: {
      target_type: type,
      target_id: id,
      target_action: action,
      user_id: user,
      page: page,
    },
    force: true,
  },
  usersRequest: {
    url: `/users`,
    then: users => ({ value: mapBy('id', users) }),
  },
  releasesRequest: {
    url: `/releases`,
    then: releases => ({ value: mapBy('id', releases) }),
  },
}))(ChangesList));
