import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {myState: ''};
  }

  render() {
    return (
      <div className="container">
       {this.props.children && React.cloneElement(this.props.children, {
              lorum: 'lorum'
        })}
      </div>
    );
  }
}