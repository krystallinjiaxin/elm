// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';//引人路由
import App from './App';
//import router from './router'; //路由
import goods from './components/goods/goods';//引入组件 goods
import seller from './components/seller/seller';//引入组件 seller
import ratings from './components/ratings/ratings';//引入组件 ratings

import './commom/stylus/index.styl';//引人全部styl

Vue.config.productionTip = false;

/* eslint-disable no-new */

Vue.use(VueRouter); //全局安装路由功能
Vue.use(VueResource);
// 2. 定义路由
// 每个路由应该映射一个组件。
const routes = [
  { path: '*' , redirect: '/goods' },//重定向 默认显示
  { path: '/goods' , component: goods },
  { path: '/seller' , component: seller },
  { path: '/ratings' , component: ratings }
];

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  linkActiveClass:'active',
  routes: routes
});
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能

new Vue({
 el: '#app',
 template: '<App/>',
 components: { App },
 router
});

//router.push('/goods'); //指定路由 不推荐使用 刷新会取消缓存的页面
