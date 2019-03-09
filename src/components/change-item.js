import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const actionName = {
  create: 'created',
  update: 'updated',
  destroy: 'deleted',
};

export default class ChangeItem extends Component {

  renderAction = {

    create: (diff) => {
      const attrList = Object.keys(diff).map(key => (
        <li key={ key }>
          { key }
          { ': ' }
          <code>{ diff[key][1] }</code>
        </li>
      ));
      return <ul>{ attrList }</ul>;
    },

    update: (diff) => {
      const attrList = Object.keys(diff).map(key => (
        <li key={ key }>
        { key }
        { ': from ' }
        <code>{ diff[key][0] }</code>
        { ' to ' }
        <code>{ diff[key][1] }</code>
        </li>
      ));
      return <ul>{ attrList }</ul>;
    },

    delete: (diff) => null,
  }

  render() {
    const {
      change: {
        target_action,
        created_at,
        diff,
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
        { this.renderAction[target_action](diff) }
      </Fragment>
    );
  }
}
