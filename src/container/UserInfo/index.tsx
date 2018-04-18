import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { RootState } from 'src/reducer';

import {
  NavBar,
  Button,
  WingBlank,
  WhiteSpace,
  Picker,
  List,
  Toast,
  InputItem
} from 'antd-mobile';

import { ResponseData, saveUserInfo } from 'src/api';

const columns1 = [
  { label: 'web前端', value: 'web前端' },
  { label: 'Node.js后端', value: 'Node.js后端' },
  { label: 'Java后端', value: 'Java后端' },
  { label: 'Golang', value: 'Golang' },
  { label: '人工智能', value: '人工智能' }
];
const columns2 = [
  { label: '上海', value: '上海' },
  { label: '北京', value: '北京' },
  { label: '广州', value: '广州' },
  { label: '深圳', value: '深圳' },
  { label: '杭州', value: '杭州' }
];

const columns3 = [[], []];
let i = 0;
let minLeftSalary = 5,
  minRightSalary = 15;
while (i < 21) {
  columns3[0].push({
    label: minLeftSalary + 'k',
    value: minLeftSalary + 'k'
  });
  columns3[1].push({
    label: minRightSalary + 'k',
    value: minRightSalary + 'k'
  });
  minLeftSalary++;
  minRightSalary++;
  i++;
}

interface Props {
  userType: string;
  history: {
    push: (path: string) => void;
  };
}

interface State {
  jobValue: Array<string>;
  cityValue: Array<string>;
  salaryValue: Array<string>;
  company: string;
}
@(withRouter as any)
export default class UserInfo extends React.Component<Props, State> {
  state = {
    jobValue: [],
    cityValue: [],
    salaryValue: [],
    company: ''
  };
  onOk = (type, value: Array<string>) => {
    this.setState({ [type]: value });
  };
  onCompanyChange = (value: string) => {
    this.setState({ company: value });
  };
  onFormat = labels => {
    return labels.join('-');
  };
  onSave = () => {
    const { userType } = this.props;
    if (!this.checkBefore(userType)) {
      return;
    }
    const { jobValue, cityValue, salaryValue, company } = this.state;
    let body: any = {
      intention: jobValue[0],
      city: cityValue[0],
      payment: salaryValue
    };
    if (userType === 'boss') {
      body.company = company;
    }
    saveUserInfo(body, ({ code, data, msg }: ResponseData) => {
      if (code === 0) {
        Toast.success('保存成功', 1);
        if (data.type === 'boss') {
          this.props.history.push('/expert/list');
        } else if (data.type === 'expert') {
          this.props.history.push('/boss/list');
        }
        return;
      }
      if (msg) {
        Toast.fail(msg, 1);
      } else {
        Toast.fail('编辑失败', 1);
      }
    });
  };
  checkBefore = (userType: string): boolean => {
    const { jobValue, cityValue, company } = this.state;
    if (!jobValue[0]) {
      Toast.fail('请选择职位', 1);
      return false;
    }
    if (!cityValue[0]) {
      Toast.fail('请选择城市', 1);
      return false;
    }
    if (userType === 'boss') {
      if (!company) {
        Toast.fail('请输入公司名称', 1);
        return false;
      }
    }
    return true;
  };
  render() {
    if (localStorage.getItem('hasLogined') !== 'true') {
      return <Redirect to="/login" />;
    }
    const { userType } = this.props;
    const { jobValue, cityValue, salaryValue } = this.state;
    let title, list;
    if (userType === 'boss') {
      title = '招聘意向';
      list = (
        <List>
          <Picker
            cols={1}
            title="选择职位"
            data={columns1}
            value={jobValue}
            onOk={value => this.onOk('jobValue', value)}
          >
            <List.Item arrow="horizontal">招聘职位</List.Item>
          </Picker>
          <WhiteSpace />
          <InputItem onChange={this.onCompanyChange} className="custom-input">
            公司名称
          </InputItem>
          <WhiteSpace />
          <Picker
            cols={1}
            title="选择城市"
            data={columns2}
            value={cityValue}
            onOk={value => this.onOk('cityValue', value)}
          >
            <List.Item arrow="horizontal">工作城市</List.Item>
          </Picker>
          <WhiteSpace />
          <Picker
            cols={2}
            cascade={false}
            title="薪资待遇(月薪,单位:千元)"
            data={columns3}
            value={salaryValue}
            onOk={value => this.onOk('salaryValue', value)}
            format={this.onFormat}
          >
            <List.Item arrow="horizontal">薪资待遇</List.Item>
          </Picker>
        </List>
      );
    } else if (userType === 'expert') {
      title = '求职意向';
      list = (
        <List>
          <Picker
            cols={1}
            title="选择职位"
            data={columns1}
            value={jobValue}
            onOk={value => this.onOk('jobValue', value)}
          >
            <List.Item arrow="horizontal">期望职位</List.Item>
          </Picker>
          <WhiteSpace />
          <Picker
            cols={1}
            title="选择城市"
            data={columns2}
            value={cityValue}
            onOk={value => this.onOk('cityValue', value)}
          >
            <List.Item arrow="horizontal">工作城市</List.Item>
          </Picker>
          <WhiteSpace />
          <Picker
            cols={2}
            cascade={false}
            title="薪资要求(月薪,单位:千元)"
            data={columns3}
            value={salaryValue}
            onOk={value => this.onOk('salaryValue', value)}
            format={this.onFormat}
          >
            <List.Item arrow="horizontal">薪资要求</List.Item>
          </Picker>
        </List>
      );
    }

    return (
      <div className="userinfo-page">
        <NavBar mode="dark">{title}</NavBar>
        <WhiteSpace />
        <WingBlank>
          <WhiteSpace />
          {list}
          <div className="btn-wrapper">
            <button className="custom-btn btn-primary" onClick={this.onSave}>
              保存
            </button>
          </div>
        </WingBlank>
      </div>
    );
  }
}
