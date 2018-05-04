import * as React from 'react';
import { NavBar, Icon, List, TextareaItem, Button } from 'antd-mobile';

interface Props {
  history: {
    goBack: () => void;
    push: (obj: object) => void;
  };
  match: {
    params: {
      id: number;
    };
  };
  location: {
    state: object;
  };
}
export default class UserDetail extends React.Component<Props> {
  goBack = () => {
    this.props.history.goBack();
  };
  handleClick = (item: object) => {
    this.props.history.push({ pathname: `/chat/${this.props.match.params.id}`, state: item })
  };
  render() {
    const item: any = this.props.location.state;
    // 考虑未来的可扩展性
    let list;
    if (item.type === 'boss') {
      list = (
        <List>
          <List.Item>
            <List.Item.Brief>
              <div className="top-content">
                <div className="title">
                  <h3>{item.intention}开发工程师</h3>
                  <span className="fr">{`${item.leftSalary}k-${
                    item.rightSalary
                    }k`}</span>
                </div>
                <div className="content">
                  <span>{item.company}</span>
                  <span>{item.city}</span>
                </div>
              </div>
            </List.Item.Brief>
          </List.Item>
          <List.Item>
            <div className="avatar-content">
              <div className="img-wrapper">
                {item.avatar ? <img src={item.avatar} alt="" /> : null}
              </div>
              <span className="img-right">{item.user}</span>
            </div>
          </List.Item>
          <List.Item>
            <div className="job-content">
              <span className="common-title">职位详情：</span>
              <span>
                职位描述：<br />
              </span>
              <TextareaItem
                editable={false}
                disabled={true}
                rows={5}
                value={
                  item.jobDescription
                    ? item.jobDescription
                    : '测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦'
                }
              />
            </div>
          </List.Item>
          <List.Item>
            <div className="skill-content">
              <span className="common-title">技能要求：</span>
              <div className="skill-tab">
                {item.skillValue && item.skillValue.length
                  ? item.skillValue.map(_item => (
                    <span key={_item}>{_item}</span>
                  ))
                  : [<span key={0}>测试一</span>, <span key={1}>测试二</span>]}
              </div>
            </div>
          </List.Item>
        </List>
      );
    } else if (item.type === 'expert') {
      list = (
        <List>
          <List.Item>
            <List.Item.Brief>
              <div className="top-content">
                <div className="title">
                  <h3>{item.intention}开发工程师</h3>
                  <span className="fr">{item.seniority}</span>
                </div>
              </div>
            </List.Item.Brief>
          </List.Item>
          <List.Item>
            <div className="avatar-content">
              <div className="img-wrapper">
                {item.avatar ? <img src={item.avatar} alt="" /> : null}
              </div>
              <span className="img-right">{item.user}</span>
            </div>
          </List.Item>
          <List.Item>
            <div className="job-content">
              <span className="common-title">个人简介：</span>
              <TextareaItem
                editable={false}
                disabled={true}
                rows={5}
                value={
                  item.jobDescription
                    ? item.jobDescription
                    : '测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦测试内容测试啦'
                }
              />
            </div>
          </List.Item>
          <List.Item>
            <div className="skill-content">
              <span className="common-title">工作意向：</span>
              <div className="skill-tab">
                <span>{item.city}</span>
                <span>{`${item.leftSalary}k - ${item.rightSalary}k`}</span>
              </div>
            </div>
          </List.Item>
        </List>
      );
    }
    return (
      <div className="userdetail-page">
        <NavBar
          mode="light"
          icon={<Icon type="left" onClick={this.goBack} />}
        />
        {list}
        <div className="chat-btn-wrapper">
          <Button type="primary" onClick={() => this.handleClick(item)}>
            立即沟通
          </Button>
        </div>
      </div>
    );
  }
}
