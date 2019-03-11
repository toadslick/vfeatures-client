import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import TimeAgo from 'react-timeago';

const actionName = {
  create: 'created',
  update: 'updated',
  destroy: 'deleted',
};

const attrKeys = {
  release_id: 'release',
};

const attrValues = {
  enabled: function(value) {
    return <span>{ value ? 'ON' : 'OFF' }</span>;
  },
  release_id: function(value, releasesMap) {
    const release = releasesMap[value];
    const key = release ? release.key : '(deleted)';
    return <Link to={{ pathname: '/history', search: `?type=Release&id=${value}` }}>{ key }</Link>
  },
};

export default class ChangeItem extends Component {
  transformAttrKey(key) {
    return attrKeys[key] || key;
  }

  transformAttrValue(key, value) {
    const { releasesMap } = this.props;
    const func = attrValues[key];
    return (func && func(value, releasesMap)) || <span>{ value }</span>;
  }

  renderDiff() {
    const { change: { target_action }} = this.props;
    return {
      create: this.renderCreate(),
      update: this.renderUpdate(),
    }[target_action] || null;
  }


  renderCreate() {
    const { change: { diff }} = this.props;
    const attrList = Object.keys(diff).map(attr => (
      <li key={ attr }>
        { this.transformAttrKey(attr) }
        { ': ' }
        { this.transformAttrValue(attr, diff[attr][1]) }
      </li>
    ));
    return <ul className='history-item-diff'>
      { attrList }
    </ul>;
  }

  renderUpdate() {
    const { change: { diff }} = this.props;
    const attrList = Object.keys(diff).map(attr => (
      <li key={ attr }>
        { 'Changed '}
        <span>{ this.transformAttrKey(attr) }</span>
        { ' from ' }
        { this.transformAttrValue(attr, diff[attr][0]) }
        { ' to ' }
        { this.transformAttrValue(attr, diff[attr][1]) }
      </li>
    ));
    return <ul className='history-item-diff'>
      { attrList }
    </ul>;
  }

  render() {
    const {
      change: {
        target_action,
        created_at,
        target_type,
        target_key,
        target_id,
      },
      user: {
        id,
        username,
      },
    } = this.props;

    return (
      <Fragment>
        <p className='history-item-time'>
          <TimeAgo date={ created_at }/>
          <span> | </span>
          <Moment format='LLL'>
            { created_at }
          </Moment>
        </p>
        <p className='history-item-desc'>
          { target_type }
          { ' ' }
          <Link to={{ pathname: '/history', search: `?type=${target_type}&id=${target_id}` }}>
            { target_key }
          </Link>
          { ' ' }
          { actionName[target_action] }
          { ' by ' }
          <Link to={{ pathname: '/history', search: `?user=${id}` }}>
            { username }
          </Link>
        </p>
        { this.renderDiff() }
      </Fragment>
    );
  }
}
