import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(store)
app.use(ElementPlus, {
    zhCn,
})
app.mount('#app')
