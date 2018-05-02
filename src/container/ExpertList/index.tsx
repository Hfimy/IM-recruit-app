import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducer';
import { action } from 'reducer/userList';

import {
  List,
  Picker,
  Icon,
  Toast,
  Card,
  WingBlank,
  WhiteSpace
} from 'antd-mobile';

import PullToRefresh from 'rmc-pull-to-refresh';
// bug修复
PullToRefresh.prototype.componentWillUnmount = function() {
  this.destroy(this.props.getScrollContainer() || this.containerRef);
  if (this._timer) {
    clearTimeout(this._timer);
  }
  if (this._initTimer) {
    clearTimeout(this._initTimer);
  }
};
PullToRefresh.prototype.componentDidMount = function() {
  this._initTimer = setTimeout(() => {
    this.init(this.props.getScrollContainer() || this.containerRef);
    this.triggerPullToRefresh();
    delete this._initTimer;
  });
};
// 不变的值放在外面或者抽离至配置文件中
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
const columns3 = [
  { label: '1年以内', value: '1年以内' },
  { label: '1-3年', value: '1-3年' },
  { label: '3-5年', value: '3-5年' },
  { label: '5-10年', value: '5-10年' },
  { label: '10年以上', value: '10年以上' }
];

interface Props {
  jobValue: Array<string>;
  cityValue: Array<string>;
  seniorityValue: Array<string>;
  userList: Array<object>;
  onSelectJob: (value: Array<string>) => void;
  onSelectCity: (value: Array<string>) => void;
  onSelectSeniority: (value: Array<string>) => void;
  onLoadUserListInfo: (
    params: any,
    fail: (msg: string, duration?: number) => void,
    cb?: () => void
  ) => void;
  history: {
    push: (obj: object) => void;
  };
}

interface State {
  refreshing: boolean;
  limit: number;
}
@(connect(
  ({ userList }: RootState) => ({
    jobValue: userList.selectedJob,
    cityValue: userList.selectedCity,
    seniorityValue: userList.selectedSeniority,
    userList: userList.list
  }),
  {
    onSelectJob: action.selectJob,
    onSelectCity: action.selectCity,
    onSelectSeniority: action.selectSeniority,
    onLoadUserListInfo: action.loadUserListInfo
  }
) as any)
export default class ExpertList extends React.Component<Props, State> {
  state = {
    refreshing: false,
    limit: 6
  };
  componentDidMount() {
    const { jobValue, cityValue, seniorityValue } = this.props;
    this.props.onLoadUserListInfo(
      {
        type: 'expert',
        intention: jobValue,
        city: cityValue,
        seniority: seniorityValue,
        limit: this.state.limit
      },
      Toast.fail
    );
  }
  componentDidUpdate(prevProps: Props, prevState: State) {
    const { jobValue, cityValue, seniorityValue } = this.props;
    if (
      this.props.jobValue !== prevProps.jobValue ||
      this.props.cityValue !== prevProps.cityValue ||
      this.props.seniorityValue !== prevProps.seniorityValue
    ) {
      this.props.onLoadUserListInfo(
        {
          type: 'expert',
          intention: jobValue,
          city: cityValue,
          seniority: seniorityValue,
          limit: this.state.limit
        },
        Toast.fail
      );
    }
  }
  resetScrollTop = () => {
    if (document.getElementsByClassName('userlist-wrapper')) {
      document.getElementsByClassName('userlist-wrapper')[0].scrollTop = 0;
    }
  };
  onRefresh = () => {
    this.setState({ refreshing: true });
    const { jobValue, cityValue, seniorityValue } = this.props;
    this.props.onLoadUserListInfo(
      {
        type: 'expert',
        intention: jobValue,
        city: cityValue,
        seniority: seniorityValue,
        limit: this.state.limit,
        skip: this.props.userList.length
      },
      Toast.fail,
      () => {
        this.setState({ refreshing: false });
      }
    );
  };
  handleClick = (user: string, item: object) => {
    this.props.history.push({ pathname: `/user/${user}`, state: item });
  };
  render() {
    const { jobValue, cityValue, seniorityValue, userList } = this.props;
    const { refreshing, limit } = this.state;
    return (
      <div className="expertlist-page">
        <List className="top-picker">
          <Picker
            cols={1}
            title="求职意向"
            data={columns1}
            value={jobValue}
            onOk={value => {
              this.props.onSelectJob(value);
              this.resetScrollTop();
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
            title="期望城市"
            data={columns2}
            value={cityValue}
            onOk={value => {
              this.props.onSelectCity(value);
              this.resetScrollTop();
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
            cols={1}
            title="工作年限"
            data={columns3}
            value={seniorityValue}
            onOk={value => {
              this.props.onSelectSeniority(value);
              this.resetScrollTop();
            }}
          >
            <List.Item arrow="horizontal">
              {seniorityValue.length ? (
                seniorityValue[0]
              ) : (
                <span className="content-title">
                  年限<Icon type="down" size="xxs" color="#888" />
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
            finish: (
              <Icon
                type="down"
                size="xxs"
                className={userList.length >= limit ? '' : 'hidden'}
              />
            )
          }}
          className="userlist-wrapper"
        >
          <div className="list-wrapper">
            {userList.map((item: any, index) => (
              <div key={item.user}>
                <Card onClick={() => this.handleClick(item.user, item)}>
                  <Card.Header
                    title={item.intention}
                    extra={
                      item.seniority ? <span>{item.seniority}</span> : null
                    }
                  />
                  <Card.Body>
                    <div className="card-content">
                      <span className="img-wrapper" />
                      <span>{item.user}</span>
                      <span>{item.city}</span>
                      <span>{`${item.leftSalary}k-${item.rightSalary}k`}</span>
                    </div>
                  </Card.Body>
                </Card>
                <WhiteSpace />
              </div>
            ))}
          </div>
        </PullToRefresh>
      </div>
    );
  }
}
