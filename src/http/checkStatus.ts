//axios 状态码

import {ajaxStatusContent as t} from '@/utils/contant'
export function checkStatus(status:any,msg:any,errorMessageMode:any){
  let errMessage = '';
  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    case 401:
      errMessage = msg || t('errMsg401')
      break;
      case 403:
        errMessage = t('errMsg403');
      break;
      case 404:
        errMessage =  t('errMsg404');
      break;    
      case 405:
      errMessage = t('errMsg405');
      break;
    case 408:
      errMessage = t('errMsg408');
      break;
    case 500:
      errMessage = t('errMsg500');
      break;
    case 501:
      errMessage = t('errMsg501');
      break;
    case 502:
      errMessage = t('errMsg502');
      break;
    case 503:
      errMessage = t('errMsg503');
      break;
    case 504:
      errMessage = t('errMsg504');
      break;
    case 505:
      errMessage = t('errMsg505');
      break;
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      
    } else if (errorMessageMode === 'message') {
     
    }
    console.log('errMessage',errMessage)
  }
}