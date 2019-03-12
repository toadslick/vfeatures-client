import React, { Component } from 'react';

export default class Table extends Component {

  renderHeaders() {
    const { columns } = this.props;
    return Object.keys(columns).map((title) => (
      <th key={ title }>{ title }</th>
    ));
  }

  renderRows() {
    const { items, columns } = this.props;
    return items.map((item) => (
      <tr key={ item.id }>
        { Object.keys(columns).map((key) => (
          <td key={ key }>
            { columns[key](item) }
          </td>
        )) }
      </tr>
    ));
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            { this.renderHeaders() }
          </tr>
        </thead>
        <tbody>
          { this.renderRows() }
        </tbody>
      </table>
    );
  }
}
