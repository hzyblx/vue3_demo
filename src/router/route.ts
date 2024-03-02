// 常量路由
export const constantRoute = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', hidden: true },
  },
  {
    name: 'layout',
    path: '/',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    meta: { title: '', hidden: false, icon: '' },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', hidden: false, icon: 'HomeFilled' },
      },
    ],
  },
  {
    name: 'Screen',
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Platform',
    },
  },
  {
    name: 'acl',
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    meta: { title: '权限管理', hidden: false, icon: 'Lock' },
    redirect: '/acl/user',
    children: [
      {
        name: 'User',
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: { title: '用户管理', hidden: false, icon: 'User' },
      },
      {
        name: 'Role',
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: { title: '角色管理', hidden: false, icon: 'UserFilled' },
      },
      {
        name: 'Permisson',
        path: '/acl/permisson',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: { title: '菜单管理', hidden: false, icon: 'Grid' },
      },
    ],
  },
  {
    name: 'Product',
    path: '/product',
    redirect: '/product/trademark',
    component: () => import('@/layout/index.vue'),
    meta: { title: '商品管理', hidden: false, icon: 'Goods' },
    children: [
      {
        name: 'Trademark',
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: { title: '品牌管理', hidden: false, icon: 'ShoppingCartFull' },
      },
      {
        name: 'Attr',
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: { title: '属性管理', hidden: false, icon: 'UserFilled' },
      },
      {
        name: 'Spu',
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: { title: 'SPU管理', hidden: false, icon: 'Scissor' },
      },
      {
        name: 'Sku',
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'Paperclip',
        },
      },
    ],
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: { title: '404', hidden: true },
  },
  {
    name: 'any',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: { title: 'any', hidden: true },
  },
]
