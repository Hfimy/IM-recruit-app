import * as React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Result,
  List,
  WingBlank,
  WhiteSpace,
  Modal
} from 'antd-mobile';

import { RootState } from 'src/reducer';
import { action } from 'reducer/user';

import cookies from 'browser-cookies';
const cookieToKeep = 'FirstName';
const allCookies = cookies.all();

const alert = Modal.alert;

interface Props {
  user: string;
  userType: string;
  avatar: string;
  company: string;
  intention: string;
  city: string;
  leftSalary: number;
  rightSalary: number;
  seniority: string;
  history: {
    push: (path: string) => void;
  };
  onLogout: () => void;
}

@(connect(
  ({ user }: RootState) => ({
    user: user.user,
    userType: user.type,
    avatar: user.avatar,
    company: user.company,
    intention: user.intention,
    city: user.city,
    leftSalary: user.leftSalary,
    rightSalary: user.rightSalary,
    seniority: user.seniority
  }),
  {
    onLogout: action.logout
  }
) as any)
export default class UserCenter extends React.Component<Props> {
  logout = () => {
    alert(<span>温馨提示</span>, <span>确认要退出登录?</span>, [
      {
        text: '取消',
        onPress: () => {
          console.log('cancel');
        }
      },
      {
        text: '确定',
        onPress: () => {
          // 清除cookie
          for (let cookieName of Object.keys(allCookies)) {
            if (cookieName !== cookieToKeep) {
              cookies.erase(cookieName);
            }
          }
          // 清除redux数据
          this.props.onLogout();
          this.props.history.push('/login');
        }
      }
    ]);
  };
  render() {
    const {
      user,
      userType,
      avatar,
      company,
      intention,
      city,
      leftSalary,
      rightSalary,
      seniority
    } = this.props;
    let list;
    if (userType === 'boss') {
      list = (
        <List>
          <List.Item multipleLine={true}>
            <List.Item.Brief>
              <span className="left-title">公司名称：</span>
              <span className="right-content">{company}</span>
            </List.Item.Brief>
            <List.Item.Brief>
              <span className="left-title">招聘职位：</span>
              <span className="right-content">{intention}</span>
            </List.Item.Brief>
            <List.Item.Brief>
              <span className="left-title">工作城市：</span>
              <span className="right-content">{city}</span>
            </List.Item.Brief>
            <List.Item.Brief>
              <span className="left-title">薪资范围：</span>
              <span className="right-content">{`${leftSalary}k-${rightSalary}k`}</span>
            </List.Item.Brief>
          </List.Item>
        </List>
      );
    } else if (userType === 'expert') {
      list = (
        <List>
          <List.Item multipleLine={true}>
            <List.Item.Brief>
              <span className="left-title">投递岗位：</span>
              <span className="right-content">{intention}</span>
            </List.Item.Brief>
            <List.Item.Brief>
              <span className="left-title">期望城市：</span>
              <span className="right-content">{city}</span>
            </List.Item.Brief>
            <List.Item.Brief>
              <span className="left-title">期望薪资：</span>
              <span className="right-content">{`${leftSalary}k-${rightSalary}k`}</span>
            </List.Item.Brief>
            <List.Item.Brief>
              <span className="left-title">工作年限：</span>
              <span className="right-content">{seniority}</span>
            </List.Item.Brief>
          </List.Item>
        </List>
      );
    }
    return (
      <div className="usercenter-page">
        <WhiteSpace />
        <Result
          img={
            <div className="img-wrapper">
              {avatar ? <img src={avatar} alt="" /> : null}
            </div>
          }
          title={user}
        />
        <WhiteSpace />
        {list}
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <WingBlank>
          <Button type="primary">编辑</Button>
          <WhiteSpace />
          <Button type="warning" onClick={this.logout}>
            退出
          </Button>
        </WingBlank>
      </div>
    );
  }
}
