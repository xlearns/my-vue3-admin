//静态路由

export const LoginRoute:any = {
  path:"/login",
  name:"login",
  component: () => import('@/views/login/login.vue'),
  meta: {
    title: '登录',
    isPublic:true
  },
}

export const HomeRoute:any = {
  path:"/",
  name:"home",
  component: () => import('@/layout/index.vue'),
  redirect:"/home",
  meta: {
    title: '首页',
  },
}

export const RootRoute:any = {
  path:"/home",
  name:"home1",
  component: () => import('@/views/home/home.vue'),
  meta: {
    title: '首页1',
  },
}

export const NotFound:any = {
  path:"/404",
  name:"notFound",
  component: () => import('@/views/error/404/error.vue'),
  meta: {
    title: '登录',
  },
}

export const NoPower:any = {
  path:"/401",
  name:"noPower",
  component: () => import('@/views/error/401/error.vue'),
  meta: {
    title: '没有权限',
  },
}

export const basicRoutes = [
  HomeRoute,
  RootRoute,
  LoginRoute,
  NotFound,
  NoPower,
]

