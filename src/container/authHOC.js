// 简单的高阶组件学习

import React from 'react';

export default function authHOC(Component) {
  return class AuthHOC extends React.Component {
    state = {};
    onChange = (type, value) => {
      this.setState({ [type]: value.trim() });
    };
    render() {
      return (
        <div>
          <Comp onChange={this.onChange} state={this.state} {...this.props} />
        </div>
      );
    }
  };
}
