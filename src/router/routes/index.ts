//静态路由
export const LoginRoute:any = {
  path:"/login",
  name:"login",
  component: () => import('@/views/login/login.vue'),
  meta: {
    title: '登录',
  },
}

export const HomeRoute:any = {
  path:"/",
  name:"home",
  component: () => import('@/views/home/home.vue'),
  meta: {
    title: '首页',
  },
}

export const basicRoutes = [
  LoginRoute,
  HomeRoute
]