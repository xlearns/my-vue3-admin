
import { defHttp } from '@/http';

enum Api {
  One = '/verify/adminLogin',
}

export function userApi(params:any,mode='modal'){
  return defHttp.post(
    {
      url: Api.One,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

