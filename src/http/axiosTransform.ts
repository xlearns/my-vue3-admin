
export function checkStatus(status,msg,errorMessageMode){
  let errMessage = '';
  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    case 401:
      errMessage = msg || '用户没有权限'
      break;
      case 403:
        errMessage = '用户得到授权，但是访问是被禁止的'
      break;
      case 404:
        errMessage = '网络请求错误,未找到该资源!'
      break;    
      default:
  }

  if (errMessage) {
    
  }
}