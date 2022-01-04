import axios from 'axios';
import { isFunction } from '@/utils/command';

//存储每个请求的标识
let pendingMap = new Map();

//获取请求的url以及取消方法
export const getPendingUrl = (config:any) => [config.method, config.url].join('&');

export class AxiosCanceler{
  addPending(config){
    //避免重复先删除
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =  config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(url)) {
        pendingMap.set(url, cancel);
      }
    });
  }

  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }
  
  removePending(config){
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }
  reset() {
    pendingMap = new Map();
  }
}