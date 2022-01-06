import axios from 'axios';
import qs from 'qs';
import { AxiosCanceler } from './axiosCancel';
import { cloneDeep } from 'lodash-es';
export * from './axiosTransform';
import { isFunction } from '@/utils/command';
import {ContentTypeEnum,RequestEnum} from './contant'


export class VAxios {
  private axiosInstance: any;
  private readonly options: any;
  constructor(options:any) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }
  //创建axios
  private createAxios(config: any): void {
    this.axiosInstance = axios.create(config);
  }

  //配置axios
  configAxios(config:any){
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  //获取Axios
  getAxios(): any {
    return this.axiosInstance;
  }
  //获取生命周期  
  private getTransform(){
    const { transform } = this.options;
    return transform;
  }
  //设置拦截器
  private setupInterceptors() {
    const transform :any = this.getTransform();
    if (!transform) {
      return;
    }
    //获取4个生命周期钩子
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    //取消axios
    const axiosCanceler = new AxiosCanceler();
    
    //请求拦截
    //执行requestInterceptors钩子
    //把请求的对象添加到map中
    this.axiosInstance.interceptors.request.use((config: any) => {
      const { ignoreCancelToken } = config.requestOptions;
      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken;

      !ignoreCancel && axiosCanceler.addPending(config);
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }
      return config;
    }, undefined);

    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);
      //响应拦截
      //请求的对象取消axios并从map中移除
      //执行responseInterceptors钩子
    this.axiosInstance.interceptors.response.use((res:any) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    //异常
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
  }
  //设置请求头
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  //设置form-data
  supportFormData(config: any) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  get(config:any,options:any){
    return this.request({ ...config, method: 'GET' }, options);
  }
  post(config:any,options:any){
    return this.request({ ...config, method: 'POST' }, options);
  }
  put(config:any,options:any){
    return this.request({ ...config, method: 'PUT' }, options);
  }
  delete(config:any,options:any){
    return this.request({ ...config, method: 'DELETE' }, options);
  }
  //core
  request(config:any,options:any){
    let conf = cloneDeep(config);
    const transform = this.getTransform();

    const { requestOptions } = this.options;

    const opt = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {};

    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }

    conf.requestOptions = opt;

    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res:any) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('request error!'));
            }
            return;
          }
          resolve(res as any);
        })
        .catch((e:any) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e);
        });
    });
  }
}