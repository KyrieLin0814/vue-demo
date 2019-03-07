// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import store from '@/vuex/store'
import VueTouch from 'vue-touch'
import VueI18n from 'vue-i18n'
import Tools from '@/tools'
import Cube from 'cube-ui'
import {post,get} from './axios/'
import langEn from '@/lang/en'
import langCn from '@/lang/cn'
import '@/assets/css/common.css'

Vue.use(Cube)


Vue.config.productionTip = false
Vue.prototype.$tools = Tools
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.use(VueTouch, {
	name: 'v-touch'
})


//语言切换
Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: store.state.langType,
	messages: {
		'en': langEn,
		'cn': langCn,
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	i18n,
	components: {
		App
	},
	template: '<App/>'
})