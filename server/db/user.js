module.exports = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    avatar: { type: String },
    intention: { type: String }, //求职意向，招聘意向
    desc: { type: String },
    company: { type: String },
    payment: { type: String }
  }
};
