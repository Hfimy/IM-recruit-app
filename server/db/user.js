module.exports = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true }, //身份类型
    intention: { type: String }, //求职意向，招聘意向
    avatar: { type: String }, //用户头像
    city: { type: String }, //城市
    payment: { type: Array }, //薪酬待遇
    company: { type: String } //公司名称
  }
};
