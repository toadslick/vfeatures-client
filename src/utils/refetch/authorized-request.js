// Options to be used for any request that requires JWT authorization.
// Sends the `authorizaton` header with the token stored in the session container.
//
// If the response returns a 401 status, assume the JWT session has expired.
// Log out the current user.
//
// Forked from the default handleResponse function:
// https://github.com/heroku/react-refetch/blob/master/src/utils/handleResponse.js

export default function authorizedRequest(session, options) {
  const { state: { token }} = session;

  const defaultOptions = {
    headers: { authorization: token },
    handleResponse: response => {

      const { headers, status } = response;

      // Return if the response has no body to parse.
      if (headers.get('content-length') === '0') { return; }
      if (status === 204 || status === 200) { return; }

      const json = response.json();

      // If the successful response has a body,
      // return the JSON-parsing promise.
      if (response.status >= 200 && response.status < 300) {
        return json;
      } else {

        // If the response returns a 401 status, assume that the JWT session
        // has expired or is invalid. Log out of the current session.
        if (response.status === 401) {
          session.logout();
        }

        // Expect error responses to have an `error` key at the
        // top level of the JSON. Parse the JSON and return that error value.
        return json.then(({ error }) => Promise.reject(error));
      }
    },
  };

  // Merge the provided options with the default options.
  return Object.assign(defaultOptions, options);
};
