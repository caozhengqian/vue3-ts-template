import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'normalize.css/normalize.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "@/mock"

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//Heap dump has been created at C:\Users\Administrator\AppData\Local\JetBrains\WebStorm2024.1\tmp\hprof-temp\heapDump-webstorm-1721840936819.hprof. It will be analyzed next time you start WebStorm.
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
