import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import ChangeItem from './change-item';
import connect from '../utils/refetch/api-connector';
import RequestResult from './request-result';
import mapBy from '../utils/map-by-property';

class ChangesList extends Component {

  renderList([{ changes, pagination }, usersMap, releasesMap ]) {
    const { total } = pagination;
    const { length } = changes;
    const { type, id } = this.props;

    const items = changes.map(change => (
      <li key={ change.id }>
        <ChangeItem
          change={ change }
          user={ usersMap[change.user_id] }
          releasesMap={ releasesMap }
        />
      </li>
    ));

    return (
      <Fragment>
        <ul>{ items }</ul>
        { total > length &&
          <p>
            <Link to={{ pathname: '/history', search: `?type=${type}&id=${id}&page=1` }}>
              Earlier changes...
            </Link>
          </p>
        }
      </Fragment>
    );
  }

  render() {
    const { changesRequest, usersRequest, releasesRequest } = this.props;
    return (
      <Fragment>
        <h3>History</h3>
        <RequestResult requests={ [changesRequest, usersRequest, releasesRequest] }>
          { this.renderList.bind(this) }
        </RequestResult>
      </Fragment>
    );
  }
}

export default connect(({ type, id, page }) => ({
  changesRequest: {
    url: '/changes',
    query: {
      target_type: type,
      target_id: id,
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
}))(ChangesList);