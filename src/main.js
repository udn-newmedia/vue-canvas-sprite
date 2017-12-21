// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})

document.addEventListener('DOMContentLoaded', function () {
  console.log('loaded')
  setTimeout(function () {
    document.dispatchEvent(new Event('vue-post-render'))
  }, 1)
})