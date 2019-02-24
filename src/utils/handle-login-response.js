// By default, only the body of the response is exposed by React Refetch.
// Overwrite the `handleResponse` function so that the authorization header
// can be retrieved and stored in the session Unstated container.

export default function handleLoginResponse(session) {
  return response => {
    const { headers, status } = response;

    // Return if the response has no body to parse.
    if (headers.get('content-length') === '0' || status === 204) { return; }

    const json = response.json();
    if (response.status >= 200 && response.status < 300) {

      // Expect the successful response to include an `authorization` header.
      // that contains the value of the JWT bearer token.
      // Before resolving the promise, login the user by updating the
      // session Unstated container.
      const token = response.headers.get('authorization');
      json.then((body) => {
        session.login(body.username, token);
        return Promise.resolve(body);
      });

      // Expect failed responses to include an `error` key in the JSON.
      // Parse the JSON and return that key as the value of the rejected promise.
    } else {
      return json.then(({ error }) => Promise.reject(error));
    }
  };
};
