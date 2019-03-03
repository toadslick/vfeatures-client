import React from 'react';

export default function renderReleasesSelect(releases) {
  const options = releases.map(({ id, key }) => (
    <option
      value={ id }
      key={ id }
    >
      { key }
    </option>
  ));
  return (
    <select name='release_id'>
      <option>Select a Release...</option>
      { options }
    </select>
  );
};
