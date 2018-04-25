module.exports = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true }, //身份类型
    intention: { type: String }, //求职意向，招聘意向
    city: { type: String }, //城市
    leftSalary: { type: Number },
    rightSalary: { type: Number },
    company: { type: String },//公司名称
  }
};
