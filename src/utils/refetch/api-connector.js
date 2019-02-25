import { connect } from 'react-refetch'
import config from '../config';

export default connect.defaults({
  buildRequest: function(mapping) {
    const { apiRoot } = config;
    return new Request(apiRoot + mapping.url, mapping);
  }
})
