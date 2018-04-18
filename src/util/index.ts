export const getRedirectPath = data => {
  let redirectPath: string;
  if (data.type === 'boss') {
    if (!data.intention || !data.company || !data.city) {
      redirectPath = '/user/info';
    } else {
      redirectPath = '/expert/list';
    }
  } else if (data.type === 'expert') {
    if (!data.intention || !data.city) {
      redirectPath = '/user/info';
    } else {
      redirectPath = '/boss/list';
    }
  }
  return redirectPath;
};
