import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import connect from '../../utils/refetch/api-connector';
import mapBy from '../../utils/map-by-property';
import RequestResult from '../request-result';
import RequestForm from '../request-form';

class SilosList extends Component {

  renderList(silos, releasesMap) {
    const listItems = silos.map(({ id, key, release_id }) =>
      <li key={ key }>
        <Link to={ `/silos/${id}` }>
          { key }
        </Link>
        : { releasesMap[release_id].key }
      </li>
    );
    return <ul>{ listItems }</ul>;
  }

  renderSelect(releasesList) {
    const options = releasesList.map(({ id, key }) =>
      <option value={ id } key={ id }>{ key }</option>
    );
    return (
      <select name='release_id'>
        <option>Select a Release...</option>
        { options }
      </select>
    );
  }

  renderResult([ silos, { releasesList, releasesMap } ]) {
    const { sendSilosRequest } = this.props;

    return (
      <Fragment>
        { this.renderList(silos, releasesMap) }
        <RequestForm
          url='/silos'
          transform={ state => ({ silo: { ...state }}) }
          onFulfilled={ sendSilosRequest }
          values={{ key: '', release_id: '' }}
          revealButtonContent='Create Silo'
        >
          { field => (
            <label>
              <span>Key</span>
              { field(
                <input
                  type='text'
                  name='key'
                  placeholder='Key'
                  autoComplete='off'/>
              )}
              { field(this.renderSelect(releasesList)) }
            </label>
          )}
        </RequestForm>
      </Fragment>
    );
  }

  render() {
    const { silosRequest, releasesRequest } = this.props;
    return (
      <main>
        <h2>Silos</h2>
        <RequestResult requests={ [silosRequest, releasesRequest] }>
          { this.renderResult.bind(this) }
        </RequestResult>
      </main>
    );
  }
}

export default connect(() => ({
  silosRequest: `/silos`,
  releasesRequest: {
    url: `/releases`,
    then: releases => ({ value: {
      releasesList: releases,
      releasesMap: mapBy('id', releases),
    }}),
  },
  sendSilosRequest: () => ({
    silosRequest: {
      url: '/silos',
      refreshing: true,
      force: true,
    },
  }),
}))(SilosList);
