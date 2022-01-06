//axios生命周期hook

//abstract 不能new 子类必须实现父类方法
export abstract class AxiosTransform {
  //请求前的配置
  beforeRequestHook?:(config:any,options:any)=>{}
  //请求已成功处理
  transformRequestHook?:(res:any,options:any)=>{}
  //请求失败处理
  requestCatchHook?:(e: Error, options: any)=>{}
  //请求之前的拦截器
  requestInterceptors?:(config:any,options:any)=>{}
  //请求之后的拦截器
  responseInterceptors?:(res:any)=>{}
  //请求之前的拦截器错误处理
  requestInterceptorsCatch?:(error: Error)=>{}
  //请求之后的拦截器错误处理
  responseInterceptorsCatch?: (error: Error) => {};
}