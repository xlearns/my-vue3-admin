import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Session } from '@/utils/storage';
// 引入 router
import { createRouter, createWebHistory } from 'vue-router'
import {basicRoutes} from './routes/staticRoutes'
// 引入路由各页面配置
// import routes from './routes'
const modules = import.meta.glob('../views/**/*.{vue,tsx}');

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
    meta: {title: '首页'},
  },
  {
    path: "/haha",
    name: "haha",
    component:"haha",
    meta: {title: '首页'},
  }
] as any

function exec(){

}
// init
export async function initBackControlRouters(init:any) {
  let result 
  if(init){
    result = init
  }else{
     // const result = await getMenuListApi();
    result = test
    Session.set('route',result)
  }
 
  basicRoutes[0].children = backEndRouter(result);
 
  router.addRoute(basicRoutes[0]);
  // 添加404页面
  router.addRoute(pathMatch);
  console.log(init)

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


// let routes = []
// for (let i in modules) {
//   let item = modules[i];
//   const routePath = item.name.replace(/(.*\/)*([^.]+).*/ig,"$2");
//   routes.push({
//       path: '/'+routePath,
//       name: routePath,
//       title: routePath,
//       component: () => import(/* @vite-ignore */item.name), //.vue不能省略
//   })
//  }
//  return routes

// // 添加动态路由
// export function setAddRoute() {
//   dynamicImport().forEach((route: any) => {
//       router.addRoute(route);
//   });
// }

// // 比对后的路由表，进行重新赋值
// export function setFilterRouteEnd() {
//   let filterRouteEnd: any = [];
//   return filterRouteEnd;
// }

// // flat
// export function formatFlatteningRoutes(arr: any) {
//   if (arr.length <= 0) return false;
//   for (let i = 0; i < arr.length; i++) {
//       if (arr[i].children) {
//           arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1));
//       }
//   }
//   return arr;
// }



router.beforeEach((to, from, next) => {
  NProgress.configure({ showSpinner: false });
  if (to.meta.title) NProgress.start();
  const token = Session.get('token');
  if (to.path === '/login' && !token) {
      next();
      NProgress.done();
  } else {
      if (!token) {
          // 如果没有token,重定向到登录页面
          next(`/login?redirect=${to.path}`);
          Session.clear();
          // resetRoute();
          NProgress.done();
      } else if (token && to.path === '/login') {
          next('/home');
          NProgress.done();
      } else {
        let route = Session.get('route')
        if(route&&route.length>0){
            initBackControlRouters(route)
        }
        next()
      }
  }
});

// 路由加载后
router.afterEach(() => {
  NProgress.done();
});


 