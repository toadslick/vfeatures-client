import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

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
    return <code>{ value ? 'ON' : 'OFF' }</code>;
  },
  release_id: function(value, releasesMap) {
    const release = releasesMap[value];
    if (release) {
      const { key, id } = release;
      return <Link to={ '/releases/' + id }>{ key }</Link>;
    } else {
      return <Link to={ '/history?type=Release&id=' + value }>(deleted)</Link>
    }
  },
};

export default class ChangeItem extends Component {
  transformAttrKey(key) {
    return attrKeys[key] || key;
  }

  transformAttrValue(key, value) {
    const { releasesMap } = this.props;
    const func = attrValues[key];
    return (func && func(value, releasesMap)) || <code>{ value }</code>;
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
    return <ul>{ attrList }</ul>;
  }

  renderUpdate() {
    const { change: { diff }} = this.props;
    const attrList = Object.keys(diff).map(attr => (
      <li key={ attr }>
        { this.transformAttrKey(attr) }
        { ': from ' }
        { this.transformAttrValue(attr, diff[attr][0]) }
        { ' to ' }
        { this.transformAttrValue(attr, diff[attr][1]) }
      </li>
    ));
    return <ul>{ attrList }</ul>;
  }

  render() {
    const {
      change: {
        target_action,
        created_at,
        target_type,
        target_key,
      },
      user: {
        id,
        username,
      },
    } = this.props;

    return (
      <Fragment>
        <Moment format='LLLL'>
          { created_at }
        </Moment>
        <br/>
        { target_type }
        { ' ' }
        <code>{ target_key }</code>
        { ' ' }
        { actionName[target_action] }
        { ' by ' }
        <Link to={ '/history?user=' + id }>
          { username }
        </Link>
        { this.renderDiff() }
      </Fragment>
    );
  }
}
