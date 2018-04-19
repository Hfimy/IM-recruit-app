import * as React from 'react';
import styled from 'styled-components'; // css in js解决方案

const H2 = styled.h2`
  text-align: center;
  margin-top: 100px;
`;
export default class NotFound extends React.Component {
  render() {
    return (
      <div className="notfound-page">
        <H2>404,页面不存在</H2>
      </div>
    );
  }
}
