import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import connect from '../../utils/refetch/api-connector';
import mapBy from '../../utils/map-by-property';
import renderReleasesSelect from '../../utils/render-releases-select';
import RequestResult from '../request-result';
import RequestForm from '../request-form';

class SilosList extends Component {

  renderList(silos, releasesMap) {
    const listItems = silos.map(({ id, key, release_id }) => {
      const release = releasesMap[release_id];

      return (
        <li key={ key }>
          <Link to={ `/silos/${id}` }>
            { key }
          </Link>
          : { release && release.key }
        </li>
      );
    });
    return <ul>{ listItems }</ul>;
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
          revealButtonContent='Create...'
          legend='Create Silo'
        >
          { field => (
            <label>
              <span>Key</span>
              { field(<input
                type='text'
                name='key'
                placeholder='Key'
                autoComplete='off'
              />) }
              { field(renderReleasesSelect(releasesList)) }
            </label>
          )}
        </RequestForm>
      </Fragment>
    );
  }

  render() {
    const { silosRequest, releasesRequest } = this.props;
    return (
      <Fragment>
        <h2>Silos</h2>
        <RequestResult requests={ [silosRequest, releasesRequest] }>
          { this.renderResult.bind(this) }
        </RequestResult>
      </Fragment>
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
