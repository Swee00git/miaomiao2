import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.axios = axios;

// Vue.filter('setWH',(url,arg)=>{    //图片寛高设置
//     return url.replace(/w\.h/,arg);
// });

import Scroller from '@/components/better-scroll'
Vue.component('Scroller',Scroller);

import Loading from '@/components/Loading/Loading.vue'
Vue.component('Loading',Loading);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
