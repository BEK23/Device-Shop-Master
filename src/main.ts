import './styles/index.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import { router } from '~/router'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(VueQueryPlugin)
for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

app.mount('#app')
