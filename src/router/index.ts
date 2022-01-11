import NProgress from "@/utils/progress";
import { storageSession } from "@/utils/storages";
import { createRouter, createWebHistory } from 'vue-router'
import { usePermissionStoreHook } from "@/store/modules/permission";
import {basicRoutes} from './modules/staticRoutes'
const modules = import.meta.glob('../views/**/*.{vue,tsx}');

// 白名单
const WHITE_NAME_LIST = ['login'];

const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
// getRouteNames(basicRoutes);

const isDynamic = true

// 定义404页面
const pathMatch = {
  path: '/:path(.*)*',
  redirect: '/404',
};


export const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes,
});



//test
let test = [
  {
    path: "/test",
    name: "test",
    component:"test",
    meta: {title: '首页',authority:["v-admin"]},
  },
  {
    path: "/haha",
    name: "haha",
    component:"haha",
    meta: {title: '首页'},
  },
  {
    path: "/go",
    name: "go",
    component:"go",
    meta: {title: 'go'},
  }
] as any

let test1 = [
  {
    path: "/test",
    name: "test",
    component:"test",
    meta: {title: '首页',authority:["v-test"]},
  },
  {
    path: "/haha",
    name: "haha",
    component:"haha",
    meta: {title: '首页'},
  },
  {
    path: "/go",
    name: "go",
    component:"go",
    meta: {title: 'go'},
  }
] as any
// test end

const  getAsyncRoutes = function(){
  return Math.floor(Math.random()*10)%2?test:test1
}

var isF = false  
// init
export async function initBackControlRouters(fn:any) {
  let  result = await getAsyncRoutes() 
  usePermissionStoreHook().changeSetting(result);
  basicRoutes[0].children = backEndRouter(result);
  router.addRoute(basicRoutes[0]);
  // 添加404页面
  router.addRoute(pathMatch);
  isF = true
  fn&&fn()
}

export function backEndRouter(routes:any) {
  if (!routes) return;
  return routes.map((item: any) => {
    if (item.component)
        item.component = dynamicImport(item.component);
    item.children && backEndRouter(item.children);
    return item;
});
}


export function setFilterRouteEnd() {
  let filterRouteEnd: any = [];
  return filterRouteEnd;
}


export function setAddRoute() {
  setFilterRouteEnd().forEach((route: any) => {
      router.addRoute(route);
  });
}


export function dynamicImport(item:any){
  const keys = Object.keys(modules);
  const matchKeys = keys.filter((key) => {
		const k = key.replace('../views', '');
		return k.startsWith(`${item}`) || k.startsWith(`/${item}`);
	});
  if (matchKeys?.length === 1) {
		const matchKey = matchKeys[0];
		return modules[matchKey];
    // return () => import(/* @vite-ignore */modules[matchKey].name)
	}
  if (matchKeys?.length > 1) {
		console.warn('Do not create files that do not end with. Vue');
		return false;
	}
}




router.beforeEach((to, from, next) => {
  const name = storageSession.getItem("token");
  NProgress.start();
  if (name) {
    if(!isF){
      initBackControlRouters(next({ ...to, replace: true }))
    }else if(to.path == "/login"){
      next('/')
    }else{
      next()
    }
  }else{
    if (to.path !== "/login") {
      if (WHITE_NAME_LIST.indexOf(to.path) !== -1) {
        next();
      } else {
        //清空token
        storageSession.clear()
        next("/login");
      }
    } else {
      next();
    }
  }
});

// 路由加载后
router.afterEach(() => {
  NProgress.done();
});


 