export const getRedirectPath = data => {
  let redirectPath: string;
  if (data.type === 'boss') {
    if (
      !data.intention ||
      !data.company ||
      !data.city ||
      !data.leftSalary ||
      !data.rightSalary
    ) {
      redirectPath = '/userinfo';
    } else {
      redirectPath = '/expert';
    }
  } else if (data.type === 'expert') {
    if (
      !data.intention ||
      !data.city ||
      !data.leftSalary ||
      !data.rightSalary
    ) {
      redirectPath = '/userinfo';
    } else {
      redirectPath = '/boss';
    }
  }
  return redirectPath;
};

export const getStringLength = (str: string) => {
  let length = 0;
  for (let item of str) {
    if (item.codePointAt(0) > 127) {
      length += 2;
    } else {
      length += 1;
    }
  }
  return length;
};

export const getChatId = (from: string, to: string) => {
  return [from, to].sort().join('_');
};

export const getLastItem = (list: Array<any>) => {
  return list[list.length - 1];
};
