export const getRedirectPath = data => {
  let redirectPath: string;
  if (data.type === 'boss') {
    if (!data.intention || !data.company || !data.city) {
      redirectPath = '/userinfo';
    } else {
      redirectPath = '/expert';
    }
  } else if (data.type === 'expert') {
    if (!data.intention || !data.city) {
      redirectPath = '/userinfo';
    } else {
      redirectPath = '/boss';
    }
  }
  return redirectPath;
};
