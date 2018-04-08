import * as React from 'react';

export default class Login extends React.Component {
  onLogin = () => {
    console.log('s');
  };
  render() {
    return (
      <div>
        <button onClick={this.onLogin}>login</button>
      </div>
    );
  }
}
