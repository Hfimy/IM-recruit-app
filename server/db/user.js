module.exports = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true }, //身份类型
    intention: { type: String }, //求职意向，招聘意向
    city: { type: String }, //城市
    leftSalary: { type: Number },
    rightSalary: { type: Number },
    company: { type: String }, //公司名称
    seniority: { type: String }, //工作年限
    avatar: { type: String } // 用户头像
  },
  chat: {
    chatId: { type: String, require: true },
    from: { type: String, require: true },
    to: { type: String, require: true },
    read: { type: Boolean, default: false },
    content: { type: String, require: true, default: '' },
    create_time: { type: Date, default: new Date().getTime() }
  }
};
