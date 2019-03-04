import { connect } from 'react-refetch'
import { apiRoot } from '../config';
import { stringify } from 'query-string';

// - Adds query-string support to the connect() options.
// - Appends a root URL that is shared by all API endpoints.

export default connect.defaults({
  buildRequest: function(mapping) {
    const { url, query } = mapping;
    const queryString = query ? '?' + stringify(query) : '';
    return new Request(apiRoot + url + queryString, mapping);
  }
})
