import { connect } from 'react-refetch'
import { apiRoot } from '../config';

export default connect.defaults({
  buildRequest: function(mapping) {
    return new Request(apiRoot + mapping.url, mapping);
  }
})
