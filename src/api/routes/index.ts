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
export const getAsyncRoutes = ()=>{
  return test
}