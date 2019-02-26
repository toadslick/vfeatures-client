// The root URL shared by all API requests to the vfeatures service.
// This URL must NOT include a trailing slash.
const apiRoot = 'http://localhost:3000';

// This duration should match the JWT session duration of the vfeatures service.
// Currently this is set to the default of one hour.
const sessionDurationInDays = 1 / 24;

export {
  apiRoot,
  sessionDurationInDays,
};
