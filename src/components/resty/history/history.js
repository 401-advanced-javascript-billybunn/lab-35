import React from 'react';

class History extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <aside>
        <h2>History</h2>
          <ul id="history">
            {this.props.history &&
              Object.keys(this.props.history).map(key => (
                <li key={key} id={key} onClick={this.props.resetFormFromHistory}>
                  <span>
                    <strong>{this.props.history[key].method}</strong>
                  </span>
                  <span>{this.props.history[key].host}</span>
                  <span>{this.props.history[key].path}</span>
                </li>
              ))}
          </ul>
      </aside>
    )
  }
}

export default History;