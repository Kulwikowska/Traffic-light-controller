import Vue from 'vue';
import App from './App.vue';
import Table from './components/Table.vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueRouter);
Vue.use(VueAxios);
Vue.use(axios);

const routes = [
    {
          name: 'Table',
          path: '/',
          component: Table
      }
  ];

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');