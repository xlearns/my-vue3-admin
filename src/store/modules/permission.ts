import { defineStore } from "pinia";
import { store } from "@/store";
import { cloneDeep } from "lodash-es";
import {basicRoutes} from '@/router/modules/staticRoutes'


export const usePermissionStore = defineStore({
  id: "admin-permission",
  state:()=>({
      basicRoutes,
      wholeMenus: [],
      menusTree: [],
      buttonAuth: [] as any,
      cachePageList: [] as any
  }),
  actions:{
     // 获取异步路由菜单
     asyncActionRoutes(routes:any) {
      
      if (this.wholeMenus.length > 0) return;

      this.wholeMenus  = this.basicRoutes.concat(routes)

      

      this.menusTree = cloneDeep(this.basicRoutes.concat(routes))

      const getButtonAuth = (arrRoutes:any)=>{

        if (!arrRoutes || !arrRoutes.length) return;

        arrRoutes.forEach((v:any)=>{

          if (v.meta && v.meta.authority) {

            this.buttonAuth.push(...v.meta.authority);

          }
          if (v.children) {

            getButtonAuth(v.children);

          }
        })
      }
      
  
      getButtonAuth(this.wholeMenus);

     },
     async changeSetting(routes:any) {

      await this.asyncActionRoutes(routes);

     },
     cacheOperate({mode,name}:any){

       switch(mode){

        case "add":
          
          this.cachePageList.push(name);

          this.cachePageList = [...new Set(this.cachePageList)];

          break;

        case "delete":

          const delIndex = this.cachePageList.findIndex((v:any) => v === name);

          delIndex !== -1 && this.cachePageList.splice(delIndex, 1);

          break;
       }

     },
      // 清空缓存页面
     clearAllCachePage(){

      this.cachePageList = [];

     } 
  }
})

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
