import Layout from '../components/Layout/Layout'

const asyncRoutesChildren = [
  {
    path: '/',
    name: 'Home',
    meta: {
      roles: ['admin', 'editor', 'test'],
      title: '主页',
      icon: 'home',
      keepAlive: true
    },
    component: () => import('@/views/home/Home.vue')
  },
]

const asyncRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: '/',
    component: () => import('@/views/Index'),
    children: asyncRoutesChildren
  }
]

export default asyncRoutes

export { asyncRoutesChildren }
