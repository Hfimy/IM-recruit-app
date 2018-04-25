import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { RootState } from 'src/reducer';
import { action } from 'reducer/userList';

import {
  Picker,
  List,
  Toast,
  Card,
  WingBlank,
  WhiteSpace,
  Icon
} from 'antd-mobile';

import PullToRefresh from 'rmc-pull-to-refresh';

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
  jobValue: Array<string>;
  cityValue: Array<string>;
  salaryValue: Array<string>;
  userList: Array<object>;
  onSelectJob: (value: Array<string>) => void;
  onSelectCity: (value: Array<string>) => void;
  onSelectSalary: (value: Array<string>) => void;
  onLoadUserListInfo: (
    params: any,
    fail: (msg: string, duration?: number) => void,
  ) => void;
  onRefreshUserListInfo: (
    params: any,
    fail: (msg: string, duration?: number) => void,
    cb: () => void
  ) => void
}
let firstLoad = true;
let hasChangeType = false;
interface State {
  refreshing: boolean;
  limit: number;
}
@(connect(
  ({ user, userList }: RootState) => ({
    userType: user.type,
    jobValue: userList.selectedJob,
    cityValue: userList.selectedCity,
    salaryValue: userList.selectedSalary,
    userList: userList.list
  }),
  {
    onSelectJob: action.selectJob,
    onSelectCity: action.selectCity,
    onSelectSalary: action.selectSalary,
    onLoadUserListInfo: action.loadUserListInfo,
    onRefreshUserListInfo: action.refreshUserListInfo
  }
) as any)
export default class BossList extends React.Component<Props, State> {
  state = {
    refreshing: false,
    limit: 6
  };
  componentWillReceiveProps(nextProps: Props) {
    const { userType, jobValue, cityValue, salaryValue } = nextProps;
    if (userType === undefined) {
      return;
    }
    if (firstLoad) {
      this.props.onLoadUserListInfo(
        {
          type: userType === 'boss' ? 'expert' : 'boss',
          intention: jobValue,
          city: cityValue,
          leftSalary: salaryValue[0] && Number(salaryValue[0].split('k')[0]),
          rightSalary: salaryValue[1] && Number(salaryValue[1].split('k')[0]),
          limit: this.state.limit,
          skip: hasChangeType ? 0 : this.props.userList.length
        },
        Toast.fail
      );
      firstLoad = false;
      hasChangeType = false
      return;
    }
    if (
      nextProps.jobValue !== this.props.jobValue ||
      nextProps.cityValue !== this.props.cityValue ||
      nextProps.salaryValue !== this.props.salaryValue
    ) {
      this.props.onLoadUserListInfo(
        {
          type: userType === 'boss' ? 'expert' : 'boss',
          intention: jobValue,
          city: cityValue,
          leftSalary: salaryValue[0] && Number(salaryValue[0].split('k')[0]),
          rightSalary: salaryValue[1] && Number(salaryValue[1].split('k')[0]),
          limit: this.state.limit,
          skip: hasChangeType ? 0 : this.props.userList.length
        },
        Toast.fail
      );
      hasChangeType = false
    }
  }
  onFormat = labels => {
    return labels.join('-');
  };
  onRefresh = () => {
    this.setState({ refreshing: true });
    const { userType, jobValue, cityValue, salaryValue } = this.props;
    this.props.onRefreshUserListInfo(
      {
        type: userType === 'boss' ? 'expert' : 'boss',
        intention: jobValue,
        city: cityValue,
        leftSalary: salaryValue[0] && Number(salaryValue[0].split('k')[0]),
        rightSalary: salaryValue[1] && Number(salaryValue[1].split('k')[0]),
        limit: this.state.limit,
        skip: this.props.userList.length
      },
      Toast.fail,
      () => {
        this.setState({ refreshing: false })
      }
    );

  };
  resetScrollTop = () => {
    if (document.getElementsByClassName('userlist-wrapper')) {
      document.getElementsByClassName('userlist-wrapper')[0].scrollTop = 0;
    }
  }
  render() {
    const { userType, jobValue, cityValue, salaryValue, userList } = this.props;
    const { refreshing, limit } = this.state;
    return (
      <div className="bosslist-page">
        <List className="top-picker">
          <Picker
            cols={1}
            title="选择职位"
            data={columns1}
            value={jobValue}
            onOk={value => {
              hasChangeType = true;
              this.props.onSelectJob(value);
              this.resetScrollTop()
            }}
          >
            <List.Item arrow="horizontal">
              {jobValue.length ? (
                jobValue[0]
              ) : (
                  <span className="content-title">
                    职位<Icon type="down" size="xxs" color="#888" />
                  </span>
                )}
            </List.Item>
          </Picker>
          <Picker
            cols={1}
            title="选择城市"
            data={columns2}
            value={cityValue}
            onOk={value => {
              hasChangeType = true;
              this.props.onSelectCity(value);
              this.resetScrollTop()
            }}
          >
            <List.Item arrow="horizontal">
              <div>
                <span className="fl separate-line">|</span>
                {cityValue.length ? (
                  cityValue[0]
                ) : (
                    <span className="content-title">
                      城市<Icon type="down" size="xxs" color="#888" />
                    </span>
                  )}
                <span className="fr separate-line">|</span>
              </div>
            </List.Item>
          </Picker>
          <Picker
            cols={2}
            cascade={false}
            title="薪资要求(月薪,单位:千元)"
            data={columns3}
            value={salaryValue}
            onOk={value => {
              hasChangeType = true;
              this.props.onSelectSalary(value);
              this.resetScrollTop()
            }}
            format={this.onFormat}
          >
            <List.Item arrow="horizontal">
              {salaryValue.length ? (
                `${salaryValue[0]}-${salaryValue[1]}`
              ) : (
                  <span className="content-title">
                    薪资<Icon type="down" size="xxs" color="#888" />
                  </span>
                )}
            </List.Item>
          </Picker>
        </List>
        <PullToRefresh
          direction="up"
          distanceToRefresh={25}
          refreshing={refreshing}
          onRefresh={this.onRefresh}
          indicator={{
            activate: '松开立即加载',
            deactivate: '上拉可以加载',
            release: <Icon type="loading" />,
            finish: <Icon type="down" size="xxs" className={userList.length >= limit ? '' : 'hidden'} />,
          }}
          className="userlist-wrapper"
        >
          <div className="list-wrapper">
            {userList.map((item: any, index) => (
              <div key={index}>
                <Card>
                  <Card.Header
                    title={item.intention}
                    extra={<span>{`${item.leftSalary}k-${item.rightSalary}k`}</span>}
                  />
                  <Card.Body>
                    <div className="card-content">
                      <span className="img-wrapper" />
                      <span>{item.user}</span>
                      <span>{item.company}</span>
                      <span>{item.city}</span>
                    </div>
                  </Card.Body>
                </Card>
                <WhiteSpace />
              </div>
            ))}
          </div>
        </PullToRefresh>
      </div >
    );
  }
}
